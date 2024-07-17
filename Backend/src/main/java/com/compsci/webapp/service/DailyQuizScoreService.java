package com.compsci.webapp.service;

import com.compsci.webapp.util.FlaskClient;


import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.compsci.webapp.entity.DailyQuizID;
import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.repository.DailyQuizScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.compsci.webapp.util.AQICalculator;




import java.time.LocalDate;
import java.util.List;

@Service

public class DailyQuizScoreService {
    // api key should be placed in yml file
    @Value("${myapp.api.openweather.key}")
    private String openWeatherApiKey;

    private static final String OPENWEATHER_URL = "http://api.openweathermap.org/data/2.5/weather";
    private static final String DATA_MODEL_URL = "http://127.0.0.1:5001/getAQIValueForALocation";

    private final DailyQuizScoreRepository dailyQuizScoreRepository;
    private static final Logger logger = LoggerFactory.getLogger(DailyQuizScoreService.class);

    @Autowired
    public DailyQuizScoreService(DailyQuizScoreRepository dailyQuizScoreRepository) {
        this.dailyQuizScoreRepository = dailyQuizScoreRepository;
    }

    public List<DailyQuizScore> getAllDailyQuizScores() {
        return dailyQuizScoreRepository.findAll();
    }

    public List<DailyQuizScore> getDailyQuizScoreById(Long id) {
        return dailyQuizScoreRepository.findById(id);
                // .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));
    }

    public DailyQuizScore createDailyQuizScore(DailyQuizScore dailyQuizScore) {
        // fetching AQI data for indoor and outdoor locations
        double indoorAQI = fetchAQI(dailyQuizScore.getIndoorLocation());
        double outdoorAQI = fetchAQI(dailyQuizScore.getOutdoorLocation());
        logger.info("Indoor AQI: {}, Outdoor AQI: {}", indoorAQI, outdoorAQI);

        // converting AQI to PM2.5
        double indoorPM25 = AQICalculator.aqiToPm25((int) indoorAQI);
        double outdoorPM25 = AQICalculator.aqiToPm25((int) outdoorAQI);
        logger.info("Indoor PM2.5: {}, Outdoor PM2.5: {}", indoorPM25, outdoorPM25);

        // risk score based on PM2.5 and hours
        double riskScore = calculateRiskScore(indoorPM25, outdoorPM25, dailyQuizScore.getIndoorHours(), dailyQuizScore.getOutdoorHours());
        logger.info("Calculated Risk Score: {}", riskScore);

        // calculated risk score
        dailyQuizScore.setRiskScore(riskScore);

        // saves score to database
        return dailyQuizScoreRepository.save(dailyQuizScore);
    }

  public DailyQuizScore updateDailyQuizScore(Long id, LocalDate quizDate, DailyQuizScore quizScoreDetails) {
    DailyQuizID dailyQuizID = new DailyQuizID(id, quizDate);
    DailyQuizScore quizScore = dailyQuizScoreRepository.findById(dailyQuizID)
            .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id + " and quizDate: " + quizDate));
            // .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));

        quizScore.setUserId(quizScoreDetails.getUserId());
        quizScore.setQuizDate(quizScoreDetails.getQuizDate());
        quizScore.setQuizScore(quizScoreDetails.getQuizScore());

        return dailyQuizScoreRepository.save(quizScore);
    }

    public void deleteDailyQuizScore(Long id, LocalDate quizDate) {
        DailyQuizID dailyQuizID = new DailyQuizID();
        dailyQuizID.setId(id);
        dailyQuizID.setQuizDate(quizDate);

        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(dailyQuizID)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id + " and quizDate: " + quizDate));

        dailyQuizScoreRepository.delete(quizScore);
    }

    private double fetchAQI(String location) {
        double aqi = 0.0; // default value
        try {
            // splits location string into latitude and longitude
            String[] coords = location.split(",");
            double locLat = Double.parseDouble(coords[0]);
            double locLon = Double.parseDouble(coords[1]);
            long timeStamp = System.currentTimeMillis() / 1000L;

            // fetching weather details from OpenWeather 
            JSONObject weatherDetails = fetchWeatherDetails(locLat, locLon);
            logger.info("Weather details: {}", weatherDetails.toString());

            //  HTTP call to the data model to get the AQI value
            aqi = fetchAqiFromDataModel(locLat, locLon, timeStamp, weatherDetails);
            logger.info("AQI fetched: {}", aqi);

        } catch (Exception e) {
            logger.error("Error fetching AQI: ", e);
        }

        return aqi;
    }

    private JSONObject fetchWeatherDetails(double locLat, double locLon) throws Exception {
        String url = OPENWEATHER_URL + "?lat=" + locLat + "&lon=" + locLon + "&appid=" + openWeatherApiKey;

        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(url);
            CloseableHttpResponse response = client.execute(httpGet);

            String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
            JSONObject jsonResponse = new JSONObject(responseString);

            // log  response
            logger.info("OpenWeather API response: {}", jsonResponse.toString());

            return jsonResponse;
        }
    }

    private double fetchAqiFromDataModel(double locLat, double locLon, long timeStamp, JSONObject weatherDetails) throws Exception {


        JSONObject jsonInput = new JSONObject();
        jsonInput.put("loc_lat", locLat);
        jsonInput.put("loc_lon", locLon);
        jsonInput.put("time_stamp", timeStamp);
        jsonInput.put("humidity", weatherDetails.getJSONObject("main").getInt("humidity"));
        jsonInput.put("temp", weatherDetails.getJSONObject("main").getDouble("temp"));
        jsonInput.put("pressure", weatherDetails.getJSONObject("main").getDouble("pressure"));
        jsonInput.put("wind_speed", weatherDetails.getJSONObject("wind").getDouble("speed"));
        jsonInput.put("wind_deg", weatherDetails.getJSONObject("wind").getInt("deg"));
        jsonInput.put("wind_gust", weatherDetails.getJSONObject("wind").optDouble("gust", 0.0));
        jsonInput.put("weather_id", weatherDetails.getJSONArray("weather").getJSONObject(0).getInt("id"));

        return FlaskClient.predictWithLocation(jsonInput).getDouble("predicted_aqi");

    }

    private double calculateRiskScore(double indoorPM, double outdoorPM, int indoorHours, int outdoorHours) {
        double maskFactor = 1.0;
        double indoorFactor = 3.0;

        double rawPM = (outdoorPM * outdoorHours / maskFactor) + ((indoorPM / indoorFactor) * indoorHours);
        return rawPM / 24.0;
    }
}

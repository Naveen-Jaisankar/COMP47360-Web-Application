package com.compsci.webapp.service;

import com.compsci.webapp.util.FlaskClient;


import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.compsci.webapp.entity.DailyQuizID;
import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.entity.UserEntity;
import com.compsci.webapp.repository.DailyQuizScoreRepository;
import com.compsci.webapp.repository.UserRepository;
import com.compsci.webapp.request.DailyQuizScoreRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.compsci.webapp.util.AQICalculator;
import com.compsci.webapp.util.Constants;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class DailyQuizScoreService {
    // api key should be placed in yml file
    @Value("${myapp.api.openweather.key}")
    private String openWeatherApiKey;

    private static final String OPENWEATHER_URL = "http://api.openweathermap.org/data/2.5/weather";
    
    private final DailyQuizScoreRepository dailyQuizScoreRepository;
    private static final Logger logger = LoggerFactory.getLogger(DailyQuizScoreService.class);

    @Autowired
    public DailyQuizScoreService(DailyQuizScoreRepository dailyQuizScoreRepository) {
        this.dailyQuizScoreRepository = dailyQuizScoreRepository;
    }
    
    @Autowired
    private UserRepository userRepository;

    public List<DailyQuizScore> getDailyQuizScoreById(Long id) {
    	List<DailyQuizScore> dailyQuizScore = new ArrayList<>();
    	try {
    		dailyQuizScore = dailyQuizScoreRepository.findByUserId_UserId(id);
    	}catch(Exception e) {
    		System.out.println("Failed to fetch dailyscore for id : " +  id + " " );
    	}
    	return dailyQuizScore;
    }

    public String createDailyQuizScore(DailyQuizScoreRequest dailyQuizScoreRequest) {
    	DailyQuizScore dailyQuizScoreEntity = new DailyQuizScore();
    	try {
    		//Fetching AQI data for indoor and outdoor locations
            double indoorAQI = fetchAQIForALocation(dailyQuizScoreRequest.getIndoorLocation(), 0);
            double outdoorAQI = fetchAQIForALocation(dailyQuizScoreRequest.getOutdoorLocation(), 0);
            logger.info("Indoor AQI: {}, Outdoor AQI: {}", indoorAQI, outdoorAQI);

            // converting AQI to PM2.5
            double indoorPM25 = AQICalculator.aqiToPm25((int) indoorAQI);
            double outdoorPM25 = AQICalculator.aqiToPm25((int) outdoorAQI);
            logger.info("Indoor PM2.5: {}, Outdoor PM2.5: {}", indoorPM25, outdoorPM25);

            // risk score based on PM2.5 and hours
            double riskScore = calculateRiskScore(indoorPM25, outdoorPM25, dailyQuizScoreRequest.getIndoorHours(), dailyQuizScoreRequest.getOutdoorHours());
            logger.info("Calculated Risk Score: {}", riskScore);

            // calculated risk score
            UserEntity user = userRepository.getUserById(dailyQuizScoreRequest.getUserId());
            
            
            dailyQuizScoreEntity.setUserId(user);
            dailyQuizScoreEntity.setQuizDate(dailyQuizScoreRequest.getQuizDate());
            dailyQuizScoreEntity.setQuizScore(riskScore);
            dailyQuizScoreEntity.setIndoorLocation(dailyQuizScoreRequest.getIndoorLocation());
            dailyQuizScoreEntity.setOutdoorLocation(dailyQuizScoreRequest.getOutdoorLocation());
            dailyQuizScoreEntity.setIndoorHours(dailyQuizScoreRequest.getIndoorHours());
            dailyQuizScoreEntity.setOutdoorHours(dailyQuizScoreRequest.getOutdoorHours());
            
            
    	}catch(Exception e) {
    		System.out.println("Failed to create a new entry in dailyQuizScore");
    	}
     	dailyQuizScoreRepository.save(dailyQuizScoreEntity);
     	return Constants.SUBMITTED_SUCCESSFULLY.getMessage();
        
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
        dailyQuizID.setUserId(id);
        dailyQuizID.setQuizDate(quizDate);

        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(dailyQuizID)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id + " and quizDate: " + quizDate));

        dailyQuizScoreRepository.delete(quizScore);
    }

    private double fetchAQIForALocation(String location, long timestamp) {
        double aqi = 0.0; // default value
        try {
            // splits location string into latitude and longitude
            String[] coords = location.split(",");
            double locLat = Double.parseDouble(coords[0]);
            double locLon = Double.parseDouble(coords[1]);
            //long timeStamp = System.currentTimeMillis() / 1000L;

            logger.info("Fetching AQI for location: {}, {} with timestamp: {}", locLat, locLon, timestamp);

            // fetching weather details from OpenWeather 
            JSONObject weatherDetails = fetchWeatherDetails(locLat, locLon,timestamp);
            logger.info("Weather details: {}", weatherDetails.toString());
            logger.info("Weather details for timestamp {}: {}", timestamp, weatherDetails.toString());



            //  HTTP call to the data model to get the AQI value
            aqi = fetchAqiFromDataModel(locLat, locLon, timestamp, weatherDetails);
            logger.info("AQI fetched: {}", aqi);
            logger.info("AQI fetched for timestamp {}: {}", timestamp, aqi);


        } catch (Exception e) {
            logger.error("Error fetching AQI: ", e);
        }

        return aqi;
    }

    private JSONObject fetchWeatherDetails(double locLat, double locLon, long timestamp) throws Exception {
        String url = OPENWEATHER_URL + "?lat=" + locLat + "&lon=" + locLon + "&dt=" + timestamp + "&appid=" + openWeatherApiKey;
        JSONObject jsonResponse = null;
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(url);
            CloseableHttpResponse response = client.execute(httpGet);

            String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
            jsonResponse = new JSONObject(responseString);
            
        }catch(Exception e) {
        	logger.error("Error while fetching weather details");
        }
        return jsonResponse;
    }


    private double fetchAqiFromDataModel(double locLat, double locLon, long timeStamp, JSONObject weatherDetails) throws Exception {

    	double predictedAQI = 0;
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

	    try { 
	    	predictedAQI = FlaskClient.predictWithLocation(jsonInput).getDouble("predicted_aqi");
	    }catch(Exception e) {
	    	logger.error("Error while fetching data from data model");
	    }
	    
	    return predictedAQI;
    }

    public List<Double> getAqiForPast7Days(String location) {
        List<Double> aqiList = new ArrayList<>();
        // fetch current date
        LocalDate currentDate = LocalDate.now();
    
        for (int i = 0; i < 7; i++) {
            // fetch previous 7 days
            LocalDate date = currentDate.minusDays(i);
    
            // local data converted to unix
            long timestamp = date.atStartOfDay(ZoneId.systemDefault()).toEpochSecond();
             
            logger.info("Fetching AQI for date: {} with timestamp: {}", date, timestamp);

            
            double aqi = fetchAQIForALocation(location, timestamp);
            aqiList.add(aqi);
        }
    
        return aqiList;
    }
    

    public double getAqiForToday() {
        LocalDate currentDate = LocalDate.now();

        String location = "40.776676, -73.971321";

        long timestamp = currentDate.atStartOfDay(ZoneId.systemDefault()).toEpochSecond();

        double aqi = fetchAQIForALocation(location, timestamp);

        return aqi;
    }
    

    private double calculateRiskScore(double indoorPM, double outdoorPM, int indoorHours, int outdoorHours) {
        double maskFactor = 1.0;
        double indoorFactor = 3.0;

        double rawPM = (outdoorPM * outdoorHours / maskFactor) + ((indoorPM / indoorFactor) * indoorHours);
        return rawPM / 24.0;
    }
}

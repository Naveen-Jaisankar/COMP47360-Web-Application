package com.compsci.webapp.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.repository.DailyQuizScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.compsci.webapp.util.AQICalculator;


import java.util.List;

@Service
public class DailyQuizScoreService {

    private final DailyQuizScoreRepository dailyQuizScoreRepository;
    private final RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(DailyQuizScoreService.class);

    @Autowired
    public DailyQuizScoreService(DailyQuizScoreRepository dailyQuizScoreRepository, RestTemplate restTemplate) {
        this.dailyQuizScoreRepository = dailyQuizScoreRepository;
        this.restTemplate = restTemplate;
    }

    public List<DailyQuizScore> getAllDailyQuizScores() {
        return dailyQuizScoreRepository.findAll();
    }

    public DailyQuizScore getDailyQuizScoreById(Long id) {
        return dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));
    }

    public DailyQuizScore evaluateAndStoreDailyQuizScore(DailyQuizScore dailyQuizScore) {
        // fetching AQI data for indoor and outdoor locations
        double indoorAQI = fetchAQI(dailyQuizScore.getIndoorLocation());
        double outdoorAQI = fetchAQI(dailyQuizScore.getOutdoorLocation());
        logger.info("Indoor AQI: {}, Outdoor AQI: {}", indoorAQI, outdoorAQI);

        // converting AQI to PM2.5
        double indoorPM25 = AQICalculator.aqiToPm25((int) indoorAQI);
        double outdoorPM25 = AQICalculator.aqiToPm25((int) outdoorAQI);
        logger.info("Indoor PM2.5: {}, Outdoor PM2.5: {}", indoorPM25, outdoorPM25);


        //  risk score based on PM2.5 and hours
        double riskScore = calculateRiskScore(indoorPM25, outdoorPM25, dailyQuizScore.getIndoorHours(), dailyQuizScore.getOutdoorHours());
        logger.info("Calculated Risk Score: {}", riskScore);

        //  calculated risk score
        dailyQuizScore.setRiskScore(riskScore);

        // saves score to database
        return dailyQuizScoreRepository.save(dailyQuizScore);
    }

    public DailyQuizScore updateDailyQuizScore(Long id, DailyQuizScore quizScoreDetails) {
        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));

        quizScore.setUserId(quizScoreDetails.getUserId());
        quizScore.setQuizScore(quizScoreDetails.getQuizScore());

        return dailyQuizScoreRepository.save(quizScore);
    }

    public void deleteDailyQuizScore(Long id) {
        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));

        dailyQuizScoreRepository.delete(quizScore);
    }

    // method that will fetch AQI from Flask API based on location
    private double fetchAQI(String location) {
        // implementation using RestTemplate - Flask API endpoint
        String url = "http://127.0.0.1:5001/predict_with_location=" + location;
        Integer aqi = restTemplate.getForObject(url, Integer.class);
        return aqi != null ? aqi : 0.0; // Default value or handle null as needed
    }

    
    private double calculateRiskScore(double indoorPM, double outdoorPM, int indoorHours, int outdoorHours) {
        double maskFactor = 1.0;
        double indoorFactor = 3.0;

        double rawPM = (outdoorPM * outdoorHours / maskFactor) + ((indoorPM / indoorFactor) * indoorHours);
        return rawPM / 24.0;
    }

}

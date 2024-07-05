package com.compsci.webapp.service;

import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.repository.DailyQuizScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DailyQuizScoreService {

    private final DailyQuizScoreRepository dailyQuizScoreRepository;

    @Autowired
    public DailyQuizScoreService(DailyQuizScoreRepository dailyQuizScoreRepository) {
        this.dailyQuizScoreRepository = dailyQuizScoreRepository;
    }

    public List<DailyQuizScore> getAllDailyQuizScores() {
        return dailyQuizScoreRepository.findAll();
    }

    public DailyQuizScore getDailyQuizScoreById(Long id) {
        return dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));
    }

    public DailyQuizScore createDailyQuizScore(DailyQuizScore dailyQuizScore) {
        return dailyQuizScoreRepository.save(dailyQuizScore); // place logic calc the risk score added here 
    }

    public DailyQuizScore updateDailyQuizScore(Long id, DailyQuizScore quizScoreDetails) {
        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));

        quizScore.setUserId(quizScoreDetails.getUserId());
        quizScore.setQuizDate(quizScoreDetails.getQuizDate());
        quizScore.setQuizScore(quizScoreDetails.getQuizScore());

        return dailyQuizScoreRepository.save(quizScore);
    }

    public void deleteDailyQuizScore(Long id) {
        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));

        dailyQuizScoreRepository.delete(quizScore);
    }
}

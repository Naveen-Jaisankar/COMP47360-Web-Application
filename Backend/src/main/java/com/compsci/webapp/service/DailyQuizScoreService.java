package com.compsci.webapp.service;

import com.compsci.webapp.model.DailyQuizScore;
//import com.compsci.webapp.repository.DailyQuizScoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class DailyQuizScoreService {

    private final DailyQuizScoreRepository dailyQuizScoreRepository;


    @Autowired
    public DailyQuizScoreService(DailyQuizScoreRepository dailyQuizScoreRepository) {
        this.dailyQuizScoreRepository = dailyQuizScoreRepository;
    }

    public DailyQuizScore saveDailyQuizScore(DailyQuizScore score) {
        return dailyQuizScoreRepository.save(score);
    }
}

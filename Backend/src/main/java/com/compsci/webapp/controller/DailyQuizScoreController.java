package com.compsci.webapp.controller;

import com.compsci.webapp.model.DailyQuizScore;
import com.compsci.webapp.service.DailyQuizScoreService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestBody; 
import graphql.kickstart.tools.GraphQLMutationResolver; 

import java.time.LocalDate;

@Controller
public class DailyQuizScoreController implements GraphQLMutationResolver {

    private final DailyQuizScoreService dailyQuizScoreService;

    @Autowired
    public DailyQuizScoreController(DailyQuizScoreService dailyQuizScoreService) {
        this.dailyQuizScoreService = dailyQuizScoreService;
    }

    public DailyQuizScore saveDailyQuizScore(Long userId, String quizDate, Integer score) {
        DailyQuizScore dailyQuizScore = new DailyQuizScore();
        dailyQuizScore.setUserId(userId);
        dailyQuizScore.setQuizDate(LocalDate.parse(quizDate));
        dailyQuizScore.setQuizScore(score);
        return dailyQuizScoreService.saveDailyQuizScore(dailyQuizScore);
    }
}


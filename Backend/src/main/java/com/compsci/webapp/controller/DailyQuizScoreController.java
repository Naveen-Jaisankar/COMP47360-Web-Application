package com.compsci.webapp.controller;

import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.service.DailyQuizScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dailyquizscores")
public class DailyQuizScoreController {

    private final DailyQuizScoreService dailyQuizScoreService;

    @Autowired
    public DailyQuizScoreController(DailyQuizScoreService dailyQuizScoreService) {
        this.dailyQuizScoreService = dailyQuizScoreService;
    }

    @GetMapping("getQuizScore/{id}")
    public List<DailyQuizScore> getDailyQuizScoreById(@PathVariable Long id) {
        return dailyQuizScoreService.getDailyQuizScoreById(id);
    }

    @PostMapping
    public DailyQuizScore createDailyQuizScore(@RequestBody DailyQuizScore dailyQuizScore) {
        return dailyQuizScoreService.createDailyQuizScore(dailyQuizScore); 
    }

    @PutMapping("updateQuiz/{id}/{quizDate}")
    public DailyQuizScore updateDailyQuizScore(@PathVariable Long id, @PathVariable LocalDate quizDate, @RequestBody DailyQuizScore quizScoreDetails) {
        return dailyQuizScoreService.updateDailyQuizScore(id, quizDate, quizScoreDetails);
    }

    @DeleteMapping("deleteQuiz/{id}/{quizDate}")
    public void deleteDailyQuizScore(@PathVariable Long id, @PathVariable LocalDate quizDate) {
        dailyQuizScoreService.deleteDailyQuizScore(id, quizDate);
    }
}

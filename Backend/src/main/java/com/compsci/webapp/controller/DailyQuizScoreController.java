package com.compsci.webapp.controller;

import com.compsci.webapp.model.DailyQuizScore;
import com.compsci.webapp.service.DailyQuizScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dailyquizscores")
public class DailyQuizScoreController {

    private final DailyQuizScoreService dailyQuizScoreService;

    @Autowired
    public DailyQuizScoreController(DailyQuizScoreService dailyQuizScoreService) {
        this.dailyQuizScoreService = dailyQuizScoreService;
    }

    @GetMapping
    public List<DailyQuizScore> getAllDailyQuizScores() {
        return dailyQuizScoreService.getAllDailyQuizScores();
    }

    @GetMapping("/{id}")
    public DailyQuizScore getDailyQuizScoreById(@PathVariable Long id) {
        return dailyQuizScoreService.getDailyQuizScoreById(id);
    }

    @PostMapping
    public DailyQuizScore createDailyQuizScore(@RequestBody DailyQuizScore dailyQuizScore) {
        return dailyQuizScoreService.createDailyQuizScore(dailyQuizScore);
    }

    @PutMapping("/{id}")
    public DailyQuizScore updateDailyQuizScore(@PathVariable Long id, @RequestBody DailyQuizScore quizScoreDetails) {
        return dailyQuizScoreService.updateDailyQuizScore(id, quizScoreDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteDailyQuizScore(@PathVariable Long id) {
        dailyQuizScoreService.deleteDailyQuizScore(id);
    }
}

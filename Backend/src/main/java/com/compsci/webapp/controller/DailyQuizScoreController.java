package com.compsci.webapp.controller;

import com.compsci.webapp.entity.DailyQuizScore;
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

    @GetMapping("/getAllDailyQuizScores")
    public List<DailyQuizScore> getAllDailyQuizScores() {
        return dailyQuizScoreService.getAllDailyQuizScores();
    }

    @GetMapping("/getDailyQuizScoreById")
    public DailyQuizScore getDailyQuizScoreById(@PathVariable Long id) {
        return dailyQuizScoreService.getDailyQuizScoreById(id);
    }

    @PostMapping("/CreateDailyQuizScore")
    public DailyQuizScore DailyQuizScore(@RequestBody DailyQuizScore dailyQuizScore) {
        return dailyQuizScoreService.createDailyQuizScore(dailyQuizScore); // once user hits submit button - 4 
    }

    @PutMapping("/updateDailyQuizScore")
    public DailyQuizScore updateDailyQuizScore(@PathVariable Long id, @RequestBody DailyQuizScore quizScoreDetails) {
        return dailyQuizScoreService.updateDailyQuizScore(id, quizScoreDetails);
    }

    }
}

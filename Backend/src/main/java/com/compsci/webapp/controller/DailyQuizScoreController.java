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

    @GetMapping
    public List<DailyQuizScore> getAllDailyQuizScores() {
        return dailyQuizScoreService.getAllDailyQuizScores();
    }

    @GetMapping("/{id}")
    public List<DailyQuizScore> getDailyQuizScoreById(@PathVariable Long id) {
        return dailyQuizScoreService.getDailyQuizScoreById(id);
    }

    @PostMapping
<<<<<<< Updated upstream
    public DailyQuizScore createDailyQuizScore(@RequestBody DailyQuizScore dailyQuizScore) {
        return dailyQuizScoreService.createDailyQuizScore(dailyQuizScore); 
=======
    public DailyQuizScore DailyQuizScore(@RequestBody DailyQuizScore dailyQuizScore) {
        System.out.println(dailyQuizScore);
        return dailyQuizScoreService.createDailyQuizScore(dailyQuizScore); // once user hits submit button - 4 
>>>>>>> Stashed changes
    }

    @PutMapping("/{id}/{quizDate}")
    public DailyQuizScore updateDailyQuizScore(@PathVariable Long id, @PathVariable LocalDate quizDate, @RequestBody DailyQuizScore quizScoreDetails) {
        return dailyQuizScoreService.updateDailyQuizScore(id, quizDate, quizScoreDetails);
    }

    @DeleteMapping("/{id}/{quizDate}")
    public void deleteDailyQuizScore(@PathVariable Long id, @PathVariable LocalDate quizDate) {
        dailyQuizScoreService.deleteDailyQuizScore(id, quizDate);
    }
}

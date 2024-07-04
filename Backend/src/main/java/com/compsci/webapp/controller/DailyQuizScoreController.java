package com.compsci.webapp.controller;


import com.compsci.webapp.model.DailyQuizScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import com.compsci.webapp.repository.DailyQuizScoreRepository;



import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dailyquizscores")
public class DailyQuizScoreController {

    private final DailyQuizScoreRepository dailyQuizScoreRepository;

    @Autowired
    public DailyQuizScoreController(DailyQuizScoreRepository dailyQuizScoreRepository) {
        this.dailyQuizScoreRepository = dailyQuizScoreRepository;
    }

    @GetMapping
    public List<DailyQuizScore> getAllDailyQuizScores() {
        return dailyQuizScoreRepository.findAll();
    }

    @GetMapping("/{id}")
    public DailyQuizScore getDailyQuizScoreById(@PathVariable Long id) {
        return dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));
    }

    @PostMapping
    public DailyQuizScore createDailyQuizScore(@RequestBody DailyQuizScore dailyQuizScore) {
        return dailyQuizScoreRepository.save(dailyQuizScore);
    }

    @PutMapping("/{id}")
    public DailyQuizScore updateDailyQuizScore(@PathVariable Long id, @RequestBody DailyQuizScore quizScoreDetails) {
        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));

        quizScore.setUserId(quizScoreDetails.getUserId());
        quizScore.setQuizDate(quizScoreDetails.getQuizDate());
        quizScore.setQuizScore(quizScoreDetails.getQuizScore());

        return dailyQuizScoreRepository.save(quizScore);
    }

    @DeleteMapping("/{id}")
    public void deleteDailyQuizScore(@PathVariable Long id) {
        DailyQuizScore quizScore = dailyQuizScoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DailyQuizScore not found with id: " + id));

        dailyQuizScoreRepository.delete(quizScore);
    }
}

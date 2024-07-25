package com.compsci.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.compsci.webapp.entity.StGeorgeQuiz;
import com.compsci.webapp.service.StGeorgeQuizService;

import java.sql.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/stgeorgequiz")
public class StGeorgeQuizController {

    @Autowired
    private StGeorgeQuizService stGeorgeQuizService;

    @PostMapping("/{userId}/{quizDate}")
    public ResponseEntity<StGeorgeQuiz> saveScore(
            @PathVariable Long userId,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date quizDate,
            @RequestBody Double score) {
        StGeorgeQuiz stGeorgeQuiz = stGeorgeQuizService.saveScore(userId, quizDate, score);
        return ResponseEntity.ok(stGeorgeQuiz);
    }

    @GetMapping("/{userId}/{quizDate}")
    public ResponseEntity<StGeorgeQuiz> getScore(
            @PathVariable Long userId,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date quizDate) {
        Optional<StGeorgeQuiz> stGeorgeQuiz = stGeorgeQuizService.getScore(userId, quizDate);
        return stGeorgeQuiz.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

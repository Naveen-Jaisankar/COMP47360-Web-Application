package com.compsci.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

   
    @PostMapping("/saveScore")
    public ResponseEntity<StGeorgeQuiz> saveScore(@RequestParam Long userId,
                                                   @RequestParam Double score) {
        StGeorgeQuiz stGeorgeQuiz = stGeorgeQuizService.saveScore(userId, quizDate, score);
        return ResponseEntity.ok(stGeorgeQuiz);
    }

  
    @GetMapping("/getScore")
    public ResponseEntity<StGeorgeQuiz> getScore(@RequestParam Long userId,
                                                  @RequestParam Date quizDate) {
        Optional<StGeorgeQuiz> stGeorgeQuiz = stGeorgeQuizService.getScore(userId, quizDate);
        return stGeorgeQuiz.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

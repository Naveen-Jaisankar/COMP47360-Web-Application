package com.compsci.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.compsci.webapp.entity.StGeorgeQuiz;
import com.compsci.webapp.request.StGeorgeQuizRequest;
import com.compsci.webapp.service.StGeorgeQuizService;
import com.compsci.webapp.util.Constants;

import jakarta.validation.Valid;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/stgeorgequiz")
public class StGeorgeQuizController {

    @Autowired
    private StGeorgeQuizService stGeorgeQuizService;



    
    @PostMapping("/savescore")
    public String saveScore(@Valid @RequestBody StGeorgeQuizRequest stGeorgeQuizRequest) {
        StGeorgeQuiz stGeorgeQuiz = stGeorgeQuizService.saveScore(stGeorgeQuizRequest.getUserId(), stGeorgeQuizRequest.getQuizDate(), stGeorgeQuizRequest.getScore());
    	return Constants.SUBMITTED_SUCCESSFULLY.getMessage();
    }
    
    @GetMapping("/getScore/{userId}/{quizDate}")
    public StGeorgeQuizRequest getScore(@PathVariable Long userId, @PathVariable String quizDate) {
        LocalDate date = LocalDate.parse(quizDate);
        StGeorgeQuizRequest quizRequest = stGeorgeQuizService.getScore(userId, date);
        return quizRequest;  
    
}
}
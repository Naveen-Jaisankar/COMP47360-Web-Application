package com.compsci.webapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compsci.webapp.entity.StGeorgeQuiz;
import com.compsci.webapp.repository.StGeorgeQuizRepository;

import java.sql.Date;
import java.util.Optional;

@Service
public class StGeorgeQuizService {

    @Autowired
    private StGeorgeQuizRepository stGeorgeQuizRepository;

    public StGeorgeQuiz saveScore(Long userId, Date quizDate, Double score) {
        StGeorgeQuiz stGeorgeQuiz = new StGeorgeQuiz(userId, quizDate, score);
        return stGeorgeQuizRepository.save(stGeorgeQuiz);
    }

    public Optional<StGeorgeQuiz> getScore(Long userId, Date quizDate) {
        return stGeorgeQuizRepository.findByUserIdAndQuizDate(userId, quizDate);
    }
}

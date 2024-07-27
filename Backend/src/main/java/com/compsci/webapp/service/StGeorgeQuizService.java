package com.compsci.webapp.service;

import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compsci.webapp.entity.StGeorgeQuiz;
import com.compsci.webapp.entity.UserEntity;
import com.compsci.webapp.repository.StGeorgeQuizRepository;
import com.compsci.webapp.repository.UserRepository;
import com.compsci.webapp.request.StGeorgeQuizRequest;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class StGeorgeQuizService {

    @Autowired
    private StGeorgeQuizRepository stGeorgeQuizRepository;
    
    @Autowired
    private UserRepository userRepository;

    public StGeorgeQuiz saveScore(Long userId, LocalDate quizDate, Double score) {
        StGeorgeQuiz stGeorgeQuiz = new StGeorgeQuiz();
        UserEntity user = userRepository.getUserById(userId);
        stGeorgeQuiz.setUserId(user);
        stGeorgeQuiz.setQuizDate(quizDate);
        stGeorgeQuiz.setScore(score);
        return stGeorgeQuizRepository.save(stGeorgeQuiz);
    }

    public StGeorgeQuizRequest getScore(Long userId, LocalDate quizDate) {
        StGeorgeQuiz stGeorgeQuiz =  stGeorgeQuizRepository.findByUserId_UserIdAndQuizDate(userId, quizDate);
        if (stGeorgeQuiz != null) {
            StGeorgeQuizRequest request = new StGeorgeQuizRequest();
            request.setUserId(stGeorgeQuiz.getUserId().getUserId());
            request.setQuizDate(stGeorgeQuiz.getQuizDate());
            request.setScore(stGeorgeQuiz.getScore());
            return request;
        }
        return null;  //  where no quiz is found
    }
        
    }

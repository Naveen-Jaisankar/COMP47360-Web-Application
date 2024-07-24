package com.compsci.webapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.compsci.webapp.entity.StGeorgeQuiz;

import java.sql.Date;
import java.util.Optional;


public interface StGeorgeQuizRepository extends JpaRepository<StGeorgeQuiz, Long> {
    Optional<StGeorgeQuiz> findByUserIdAndQuizDate(Long userId, Date quizDate);
}

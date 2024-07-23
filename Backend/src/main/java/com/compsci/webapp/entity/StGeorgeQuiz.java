package com.compsci.webapp.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "StGeorgeQuiz")
public class StGeorgeQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "quiz_date", nullable = false)
    private java.sql.Date quizDate;

    @Column(name = "score")
    private Double score;

    // this constructor will initiliase a new instance with the specified userId, quizDate, and score.
    // represents a reccord in score 

    public StGeorgeQuiz(Long userId, java.sql.Date quizDate, Double score) {
        this.userId = userId;
        this.quizDate = quizDate;
        this.score = score;
    }

    
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public java.sql.Date getQuizDate() {
        return quizDate;
    }

    public void setQuizDate(java.sql.Date quizDate) {
        this.quizDate = quizDate;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}

package com.compsci.webapp.entity;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;



@Entity
@Table(name = "dailyquizscore")
public class DailyQuizScore {

    private Double riskScore; // Assuming risk score is of type Double
    private String indoorLocation; // Assuming indoor location is of type String
    private String outdoorLocation; // Assuming outdoor location is of type String
    private Integer indoorHours; // Assuming indoor hours is of type Integer
    private Integer outdoorHours; // Assuming outdoor hours is of type Integer

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "quiz_date")
    private LocalDate quizDate;

    @Column(name = "quiz_score")
    private Integer quizScore;

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

    public LocalDate getQuizDate() {
        return quizDate;
    }

    public void setQuizDate(LocalDate quizDate) {
        this.quizDate = quizDate;
    }

    public Integer getQuizScore() {
        return quizScore;
    }

    public void setQuizScore(Integer quizScore) {
            this.quizScore = quizScore; }
    
        public Double getRiskScore() {
            return riskScore;
        }
    
        public void setRiskScore(Double riskScore) {
            this.riskScore = riskScore;
        }
    
        public String getIndoorLocation() {
            return indoorLocation;
        }
    
        public void setIndoorLocation(String indoorLocation) {
            this.indoorLocation = indoorLocation;
        }
    
        public String getOutdoorLocation() {
            return outdoorLocation;
        }
    
        public void setOutdoorLocation(String outdoorLocation) {
            this.outdoorLocation = outdoorLocation;
        }
    
        public Integer getIndoorHours() {
            return indoorHours;
        }
    
        public void setIndoorHours(Integer indoorHours) {
            this.indoorHours = indoorHours;
        }
    
        public Integer getOutdoorHours() {
            return outdoorHours;
        }
    
        public void setOutdoorHours(Integer outdoorHours) {
            this.outdoorHours = outdoorHours;
        }
    }

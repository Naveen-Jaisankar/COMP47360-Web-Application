package com.compsci.webapp.model;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inductionquizscore")
public class InductionQuizScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "exposure_date")
    private LocalDate exposureDate;

    @Column(name = "exposure_score")
    private Integer exposureScore;

    // Constructors, getters, setters, and other methods
}
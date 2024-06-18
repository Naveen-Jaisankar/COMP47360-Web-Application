package com.compsci.webapp.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
//import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.util.Date;






@Entity
@Table(name = "ExposureScores",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "date"})})
public class ExposureScores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Passwords user;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "exposure_score", nullable = false)
    private Integer exposureScore;

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Passwords getUser() {
        return user;
    }

    public void setUser(Passwords user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getExposureScore() {
        return exposureScore;
    }

    public void setExposureScore(Integer exposureScore) {
        this.exposureScore = exposureScore;
    }
}


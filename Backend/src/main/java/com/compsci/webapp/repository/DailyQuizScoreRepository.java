package com.compsci.webapp.repository;

import com.compsci.webapp.entity.DailyQuizID;
import com.compsci.webapp.entity.DailyQuizScore;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface DailyQuizScoreRepository extends JpaRepository<DailyQuizScore, DailyQuizID> {
    List <DailyQuizScore> findById(Long id);
    Optional<DailyQuizScore> findByUserIdAndQuizDate(Long userId, LocalDate quizDate);
}

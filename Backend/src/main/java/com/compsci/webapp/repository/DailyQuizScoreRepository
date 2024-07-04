package com.compsci.webapp.repository;

import com.compsci.webapp.model.DailyQuizScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailyQuizScoreRepository extends JpaRepository<DailyQuizScore, Long> {
    Optional<DailyQuizScore> findByUserIdAndQuizDate(Long userId, LocalDate quizDate);
}

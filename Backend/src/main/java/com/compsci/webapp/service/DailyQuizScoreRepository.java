package com.compsci.webapp.service;

import com.compsci.webapp.model.DailyQuizScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyQuizScoreRepository extends JpaRepository<DailyQuizScore, Long> {
  //  DailyQuizScore findByUserIdAndQuizDate(Long userId, LocalDate quizDate);
}

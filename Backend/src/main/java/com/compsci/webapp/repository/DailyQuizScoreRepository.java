package com.compsci.webapp.repository;

import com.compsci.webapp.entity.DailyQuizID;
import com.compsci.webapp.entity.DailyQuizScore;
import com.compsci.webapp.entity.UserEntity;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface DailyQuizScoreRepository extends JpaRepository<DailyQuizScore, DailyQuizID> {
    
    List<DailyQuizScore> findByUserId(UserEntity userEntity);

    List<DailyQuizScore> findByUserId_UserId(Long userId);

}

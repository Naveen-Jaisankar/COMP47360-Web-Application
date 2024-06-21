package com.compsci.webapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.compsci.webapp.model.DailyQuiz;

public interface DailyQuizRepository extends CrudRepository<DailyQuiz, Long> {
    // no methods required
}

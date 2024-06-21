package com.compsci.webapp.repository;


import org.springframework.data.repository.CrudRepository;
import com.compsci.webapp.model.ExposureScores;

public interface ExposureScoresRepository extends CrudRepository<ExposureScores, Long> {
    // no methods needed
}

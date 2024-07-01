package com.compsci.webapp.graphsql.resolvers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;

@Component
public class MutationResolver implements GraphQLMutationResolver {

    @Autowired
    private ExposureScoreRepository exposureScoreRepository;

    @Autowired
    private StGeorgeQuizScoreRepository stGeorgeQuizScoreRepository;

    @Autowired
    private DailyQuizScoreRepository dailyQuizScoreRepository;

    /**
     * Updates or inserts exposure score for a user on a specific date.
     * @param userId The ID of the user
     * @param exposureDate The date for which exposure score is updated/inserted
     * @param exposureScore The exposure score to update/insert
     * @return The updated/inserted ExposureScore object
     */
    public ExposureScore updateExposureScore(Long userId, String exposureDate, Integer exposureScore) {
        LocalDate date = LocalDate.parse(exposureDate);
        ExposureScore score = exposureScoreRepository.findByUserIdAndExposureDate(userId, date);
        
        if (score == null) {
            score = new ExposureScore();
            score.setUserId(userId);
            score.setExposureDate(date);
        }
        
        score.setExposureScore(exposureScore);
        return exposureScoreRepository.save(score);
    }

    /**
     * Updates or inserts St George Quiz score for a user on a specific date.
     * @param userId The ID of the user
     * @param quizDate The date for which St George Quiz score is updated/inserted
     * @param quizScore The St George Quiz score to update/insert
     * @return The updated/inserted StGeorgeQuizScore object
     */
    public StGeorgeQuizScore updateStGeorgeQuizScore(Long userId, String quizDate, Integer quizScore) {
        LocalDate date = LocalDate.parse(quizDate);
        StGeorgeQuizScore score = stGeorgeQuizScoreRepository.findByUserIdAndQuizDate(userId, date);
        
        if (score == null) {
            score = new StGeorgeQuizScore();
            score.setUserId(userId);
            score.setQuizDate(date);
        }
        
        score.setQuizScore(quizScore);
        return stGeorgeQuizScoreRepository.save(score);
    }

    /**
     * Updates or inserts Daily Quiz score for a user on a specific date.
     * @param userId The ID of the user
     * @param quizDate The date for which Daily Quiz score is updated/inserted
     * @param quizScore The Daily Quiz score to update/insert
     * @return The updated/inserted DailyQuizScore object
     */
    public DailyQuizScore updateDailyQuizScore(Long userId, String quizDate, Integer quizScore) {
        LocalDate date = LocalDate.parse(quizDate);
        DailyQuizScore score = dailyQuizScoreRepository.findByUserIdAndQuizDate(userId, date);
        
        if (score == null) {
            score = new DailyQuizScore();
            score.setUserId(userId);
            score.setQuizDate(date);
        }
        
        score.setQuizScore(quizScore);
        return dailyQuizScoreRepository.save(score);
    }
}

package com.compsci.webapp.entity;

import java.io.Serializable;
import java.time.LocalDate;


import lombok.Data;

@Data
public class DailyQuizID implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
    private LocalDate quizDate;

    public DailyQuizID() {}

    public DailyQuizID(Long id, LocalDate quizDate) {
        this.id = id;
        this.quizDate = quizDate;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getQuizDate() {
		return quizDate;
	}

	public void setQuizDate(LocalDate quizDate) {
		this.quizDate = quizDate;
	}

     

}

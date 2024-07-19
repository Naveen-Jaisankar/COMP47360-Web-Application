import React from 'react';

function QuizQuestion({ question, currentQuestion, onChange, onNext, selectedAnswers }) {
    const { id, text, options } = question;

    const handleOptionChange = (e) => {
        const selectedOption = options.find(option => option.value === e.target.value);
        onChange(id, e.target.value, selectedOption.score);
    };

    return (
        <div className={`question ${currentQuestion === id ? 'active' : ''}`}>
            <p>{text}</p>
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        type={option.type}  // Use type from options
                        name={id}
                        value={option.value}
                        data-score={option.score}
                        onChange={handleOptionChange}
                        checked={selectedAnswers.includes(option.value)} // Ensure only the selected option is checked
                    />
                    {option.value}
                </label>
            ))}
            <br />
            <button type="button" onClick={onNext} disabled={currentQuestion !== id}>
                Next
            </button>
        </div>
    );
}

export default QuizQuestion;
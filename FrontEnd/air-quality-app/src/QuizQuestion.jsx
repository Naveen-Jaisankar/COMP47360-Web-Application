import React, { useState } from 'react';
import './static/QuizQuestion.css'; // Import the CSS file for styling

function QuizQuestion({ question, currentQuestion, onChange, onNext, selectedAnswers }) {
    const { id, text, options } = question;
    const [error, setError] = useState('');

    const handleOptionChange = (e) => {
        const selectedOption = options.find(option => option.value === e.target.value);
        onChange(id, e.target.value, selectedOption.score);
        setError(''); // Clear the error message on option change
    };

    const handleNext = () => {
        if (selectedAnswers.length === 0) {
            setError('Please select at least one option before proceeding.');
        } else {
            setError('');
            onNext();
        }
    };

    return (
        <div className={`question ${currentQuestion === id ? 'active' : ''}`}>
            <p>{text}</p>
            <div className="options">
                {options.map((option, index) => (
                    <div key={index} className="option">
                        <label>
                            <input
                                type={option.type}
                                name={id}
                                value={option.value}
                                data-score={option.score}
                                onChange={handleOptionChange}
                                checked={selectedAnswers.includes(option.value)}
                            />
                            {option.value}
                        </label>
                    </div>
                ))}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="next-button-container">
                <button type="button" onClick={handleNext} disabled={currentQuestion !== id}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default QuizQuestion;
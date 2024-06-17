import React, { useState } from 'react';

const questions = [
    {
        id: 'question0',
        text: 'Please select one box to show how you describe your current health:',
        options: [
            { value: 'Very good', score: 0.0 },
            { value: 'Good', score: 0.0 },
            { value: 'Fair', score: 0.0 },
            { value: 'Poor', score: 0.0 },
            { value: 'Very poor', score: 0.0 },
        ],
    },
    {
        id: 'question1',
        text: 'Part 1, Question 1: Over the past 3 months, I have coughed:',
        options: [
            { value: 'Most days of a week', score: 80.6 },
            { value: 'Several days of a week', score: 63.2 },
            { value: 'A few days a month', score: 29.3 },
            { value: 'Only with chest infections', score: 28.1 },
            { value: 'Not at all', score: 0.0 },
        ],
    },
    {
        id: 'question2',
        text: 'Part 1, Question 2: Over the past 3 months, I have brought up phlegm (sputum):',
        options: [
            { value: 'Most days of a week', score: 76.8 },
            { value: 'Several days of a week', score: 60.0 },
            { value: 'A few days a month', score: 34.0 },
            { value: 'Only with chest infections', score: 30.2 },
            { value: 'Not at all', score: 0.0 },
        ],
    },
    {
        id: 'question3',
        text: 'Part 1, Question 3: Over the past 3 months, I have had shortness of breath:',
        options: [
            { value: 'Most days of a week', score: 87.2 },
            { value: 'Several days of a week', score: 71.4 },
            { value: 'A few days a month', score: 43.7 },
            { value: 'Only with chest infections', score: 35.7 },
            { value: 'Not at all', score: 0.0 },
        ],
    },
    {
        id: 'question4',
        text: 'Part 1, Question 4: Over the past 3 months, I have had attacks of wheezing:',
        options: [
            { value: 'Most days of a week', score: 86.2 },
            { value: 'Several days of a week', score: 71.0 },
            { value: 'A few days a month', score: 45.6 },
            { value: 'Only with chest infections', score: 36.4 },
            { value: 'Not at all', score: 0.0 },
        ],
    },
    {
        id: 'question5',
        text: 'Part 1, Question 5: During the past 3 months how many severe or very unpleasant attacks of chest trouble have you had?',
        options: [
            { value: 'More than 3 attacks', score: 86.7 },
            { value: '3 attacks', score: 73.5 },
            { value: '2 attacks', score: 60.3 },
            { value: '1 attack', score: 44.2 },
            { value: 'Not attacks', score: 0.0 },
        ],
    },
    {
        id: 'question6',
        text: 'Part 1, Question 6: How long did the worst attack of chest trouble last?',
        options: [
            { value: 'A week or more', score: 89.7 },
            { value: '3 or more days', score: 73.5 },
            { value: '1 or 2 days', score: 58.8 },
            { value: 'Less than a day', score: 41.9 },
        ],
    },
    {
        id: 'question7',
        text: 'Part 1, Question 7: Over the past 3 months, in an average week, how many good days (with little chest trouble) have you had?',
        options: [
            { value: 'No good days', score: 93.3 },
            { value: '1 or 2 good days', score: 76.6 },
            { value: '3 or 4 good days', score: 61.5 },
            { value: 'Nearly every day is good', score: 15.4 },
            { value: 'Every day is good', score: 0.0 },
        ],
    },
    {
        id: 'question8',
        text: 'Part 1, Question 8: If you have a wheeze, is it worse in the morning?',
        options: [
            { value: 'No', score: 0.0 },
            { value: 'Yes', score: 62.0 },
            { value: 'I don\'t have a wheeze', score: 0.0 },
        ],
    },
    {
        id: 'question9',
        text: 'Part 2, Question 1: How would you describe your chest condition?',
        options: [
            { value: 'The most important problem I have', score: 83.2 },
            { value: 'Causes me quite a lot of problems', score: 82.5 },
            { value: 'Causes me a few problems', score: 34.6 },
            { value: 'Causes no problem', score: 0.0 },
        ],
    },
    {
        id: 'question10',
        text: 'Part 2, Question 2: If you have ever had paid employment:',
        options: [
            { value: 'My chest trouble made me stop work altogether', score: 88.9 },
            { value: 'My chest trouble interferes with my work or made me change my work', score: 77.6 },
            { value: 'My chest trouble does not affect my work', score: 0.0 },
            { value: 'I have never had paid employment', score: 0.0 },
        ],
    },
    {
        id: 'question11',
        text: 'Part 2, Question 3: Select all the activities that usually make you feel breathless THESE DAYS:',
        options: [
            { value: 'Sitting or lying still', score: 90.6 },
            { value: 'Getting washed or dressed', score: 82.8 },
            { value: 'Walking around the home', score: 80.2 },
            { value: 'Walking outside on non-sloped level ground', score: 81.4 },
            { value: 'Walking up a flight of stairs', score: 76.1 },
            { value: 'Walking up hills', score: 75.1 },
            { value: 'Playing sports or games', score: 72.1 },
            { value: 'None of these activities make me feel breathless', score: 0.0 },
        ],
    },
    {
        id: 'question12',
        text: 'Part 2, Question 4: Select all the statements that apply in relation to your cough and breathlessness THESE DAYS:',
        options: [
            { value: 'My cough hurts', score: 81.1 },
            { value: 'My cough makes me tired', score: 79.1 },
            { value: 'I am breathless when I talk', score: 84.5 },
            { value: 'I am breathless when I bend over', score: 76.8 },
            { value: 'My cough or breathing disturbs my sleep', score: 87.9 },
            { value: 'I get exhausted easily', score: 84.0 },
            { value: 'None of these statements apply to me', score: 0.0 },
        ],
    },
    {
        id: 'question13',
        text: 'Part 2, Question 5: Select all the statements that apply in relation to other effects your chest trouble may have on you THESE DAYS:',
        options: [
            { value: 'My cough or breathing is embarrassing in public', score: 74.1 },
            { value: 'My chest trouble is a nuisance to my family, friends, or neighbours', score: 79.1 },
            { value: 'I get afraid or panic when I cannot get my breath', score: 87.7 },
            { value: 'I feel that I am not in control of my chest problem', score: 90.1 },
            { value: 'I do not expect my chest to get any better', score: 82.3 },
            { value: 'I have become frail or an invalid because of my chest', score: 89.9 },
            { value: 'Exercise is not safe for me', score: 75.7 },
            { value: 'Everything seems too much of an effort', score: 84.5 },
            { value: 'None of these statements apply to me', score: 0.0 },
        ],
    },
    {
        id: 'question14.1',
        text: 'Part 2, Question 6.1: Are you taking any respiratory system-related medication?',
        options: [
            { value: 'Yes', score: 0.0 },
            { value: 'No', score: 0.0 },
        ],
    },
    {
        id: 'question14.2',
        text: 'Part 2, Question 6.2: Select all the statements that apply in relation to any respiratory system-related medication you are taking:',
        options: [
            { value: 'My medication does not help me very much', score: 88.2 },
            { value: 'I get embarrassed using my medication in public', score: 53.9 },
            { value: 'I have unpleasant side effects from my medication', score: 81.1 },
            { value: 'My medication interferes with my life a lot', score: 70.3 },
            { value: 'None of these statements apply to me', score: 0.0 },
        ],
    },
    {
        id: 'question15',
        text: 'Part 2, Question 7: Select all the statements that apply in relation to how your activities might be affected by your breathing:',
        options: [
            { value: 'I take a long time to get washed or dressed', score: 74.2 },
            { value: 'I cannot take a bath or shower, or I take a long time', score: 81.0 },
            { value: 'I walk slower than other people, or I stop for rests', score: 71.7 },
            { value: 'Jobs such as housework take a long time, or I have to stop for rests', score: 70.6 },
            { value: 'If I walk up one flight of stairs, I have to go slowly or stop', score: 71.6 },
            { value: 'If I hurry or walk fast, I have to stop or slow down', score: 72.3 },
            { value: 'My breathing makes it difficult to do things such as walk up hills, carrying things up stairs, light gardening such as weeding, dance, play bowls or play golf', score: 74.5 },
            { value: 'My breathing makes it difficult to do things such as carry heavy loads, dig the garden or shovel snow, jog or walk at 5 miles per hour, play tennis or swim', score: 71.4 },
            { value: 'My breathing makes it difficult to do things such as very heavy manual work, run, cycle, swim fast or play competitive sports', score: 63.5 },
            { value: 'None of these statements apply to me', score: 0.0 },
        ],
    },
    {
        id: 'question16',
        text: 'Part 2, Question 8: Select all the statements that apply in relation to how your chest USUALLY affects your daily life:',
        options: [
            { value: 'I cannot play sports or games', score: 64.8 },
            { value: 'I cannot go out for entertainment or recreation', score: 79.8 },
            { value: 'I cannot go out of the house to do the shopping', score: 81.0 },
            { value: 'I cannot do housework', score: 79.1 },
            { value: 'I cannot move far from my bed or chair', score: 94.0 },
            { value: 'None of these statements apply to me', score: 0.0 },
        ],
    },
    {
        id: 'question17',
        text: 'Part 3, Question 1: Please select the statement that most accurately describes how your chest affects you:',
        options: [
            { value: 'It does not stop me doing anything I would like to do', score: 0.0 },
            { value: 'It stops me doing one or two things I would like to do', score: 42.0 },
            { value: 'It stops me doing most of the things I would like to do', score: 84.2 },
            { value: 'It stops me doing everything I would like to do', score: 96.7 },
        ],
    },
];

function Question({ question, currentQuestion, onChange, onNext }) {
    const { id, text, options } = question;

    const handleOptionChange = (e, score) => {
        onChange(id, e.target.value, score);
    };

    let maxScore = 0;

    return (
        <div className={`question ${currentQuestion === id ? 'active' : ''}`}>
            <p>{text}</p>
            {options.map((option, index) => {
                const score = parseFloat(option.score);
                if (!isNaN(score) && option.type === 'radio') {
                    maxScore = Math.max(maxScore, score);
                }
                return (
                    <label key={index}>
                        <input
                            type={option.type}
                            name={id}
                            value={option.value}
                            data-score={option.score}
                            onChange={(e) => handleOptionChange(e, option.score)}
                        />
                        {option.value}
                    </label>
                );
            })}
            <br />
            <button type="button" onClick={onNext}>
                Next
            </button>
        </div>
    );
}

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Use index instead of string for currentQuestion
    const [answers, setAnswers] = useState({});
    const [showQuiz, setShowQuiz] = useState(false);

    const handleAnswerChange = (questionId, answer, score) => {
        setAnswers({
            ...answers,
            [questionId]: { answer, score },
        });
    };

    const handleNextQuestion = () => {
        const currentQuestionObj = questions[currentQuestion];
        const answer = answers[currentQuestionObj.id];
        let nextIndex = currentQuestion + 1;

        if (currentQuestionObj.id === 'question5' && answer.answer === 'No attacks') {
            nextIndex = questions.findIndex(q => q.id === 'question7');
        }

        if (currentQuestionObj.id === 'question14.1' && answer.answer === 'No') {
            nextIndex = questions.findIndex(q => q.id === 'question15');
        }

        if (nextIndex < questions.length) {
            setCurrentQuestion(nextIndex);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        const totalWeightedComponent = calculateTotalWeightedComponent();
        const symptomsComponent = calculateSymptomsComponent();
        const activityComponent = calculateActivityComponent();
        const impactsComponent = calculateImpactsComponent();

        console.log('Total Weighted Score:', totalWeightedComponent);
        console.log('Symptoms Component:', symptomsComponent);
        console.log('Activity Component:', activityComponent);
        console.log('Impacts Component:', impactsComponent);

        setShowQuiz(false);
    };

    const calculateTotalWeightedComponent = () => {
        let totalPossibleScores = 0;
        let totalSelectedScores = 0;

        questions.forEach((question) => {
            const answer = answers[question.id];
            if (answer) {
                totalPossibleScores += parseFloat(answer.score);
                totalSelectedScores += parseFloat(answer.score);
            }
        });

        return (totalSelectedScores * 100) / totalPossibleScores;
    };

    const calculateSymptomsComponent = () => {
        let totalPossibleScores = 0;
        let totalSelectedScores = 0;

        questions.slice(0, 8).forEach((question) => {
            const answer = answers[question.id];
            if (answer) {
                totalPossibleScores += parseFloat(answer.score);
                totalSelectedScores += parseFloat(answer.score);
            }
        });

        return (totalSelectedScores * 100) / totalPossibleScores;
    };

    const calculateActivityComponent = () => {
        let totalPossibleScores = 0;
        let totalSelectedScores = 0;

        [11, 15].forEach((questionId) => {
            const answer = answers[`question${questionId}`];
            if (answer) {
                totalPossibleScores += parseFloat(answer.score);
                totalSelectedScores += parseFloat(answer.score);
            }
        });

        return (totalSelectedScores * 100) / totalPossibleScores;
    };

    const calculateImpactsComponent = () => {
        let totalPossibleScores = 0;
        let totalSelectedScores = 0;

        [9, 10, 12, 13, '14.2', 16, 17].forEach((questionId) => {
            const answer = answers[`question${questionId}`];
            if (answer) {
                totalPossibleScores += parseFloat(answer.score);
                totalSelectedScores += parseFloat(answer.score);
            }
        });

        return (totalSelectedScores * 100) / totalPossibleScores;
    };

    return (
        <>
            <button onClick={() => setShowQuiz(true)}>Start Quiz</button>
            {showQuiz && (
                <>
                    <div id="quiz-overlay" />
                    <div id="quiz-popup">
                        <h2>Quiz</h2>
                        <form id="quiz-form">
                            {questions.map((question, index) => (
                                <Question
                                    key={index}
                                    question={question}
                                    currentQuestion={currentQuestion}
                                    onChange={handleAnswerChange}
                                    onNext={handleNextQuestion}
                                />
                            ))}
                        </form>
                    </div>
                </>
            )}
        </>
    );
}

export default function Form() {
    return (
        <div>
            <h1>Here is the Form Page!</h1>
            <Quiz />
        </div>
    );
}
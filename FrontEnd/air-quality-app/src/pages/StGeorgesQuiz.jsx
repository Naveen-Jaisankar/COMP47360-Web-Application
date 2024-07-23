import React, { useState } from 'react';
import Modal from 'react-modal';
import QuizQuestion from '../QuizQuestion';
import axios from 'axios';

const questions = [
    {
        id: 'question0',
        text: 'Please select one box to show how you describe your current health:',
        options: [
            { value: 'Very good', score: 0.0, type: 'radio' },
            { value: 'Good', score: 0.0, type: 'radio' },
            { value: 'Fair', score: 0.0, type: 'radio' },
            { value: 'Poor', score: 0.0, type: 'radio' },
            { value: 'Very poor', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question1',
        text: 'Part 1, Question 1: Over the past 3 months, I have coughed:',
        options: [
            { value: 'Most days of a week', score: 80.6, type: 'radio' },
            { value: 'Several days of a week', score: 63.2, type: 'radio' },
            { value: 'A few days a month', score: 29.3, type: 'radio' },
            { value: 'Only with chest infections', score: 28.1, type: 'radio' },
            { value: 'Not at all', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question2',
        text: 'Part 1, Question 2: Over the past 3 months, I have brought up phlegm (sputum):',
        options: [
            { value: 'Most days of a week', score: 76.8, type: 'radio' },
            { value: 'Several days of a week', score: 60.0, type: 'radio' },
            { value: 'A few days a month', score: 34.0, type: 'radio' },
            { value: 'Only with chest infections', score: 30.2, type: 'radio' },
            { value: 'Not at all', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question3',
        text: 'Part 1, Question 3: Over the past 3 months, I have had shortness of breath:',
        options: [
            { value: 'Most days of a week', score: 87.2, type: 'radio' },
            { value: 'Several days of a week', score: 71.4, type: 'radio' },
            { value: 'A few days a month', score: 43.7, type: 'radio' },
            { value: 'Only with chest infections', score: 35.7, type: 'radio' },
            { value: 'Not at all', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question4',
        text: 'Part 1, Question 4: Over the past 3 months, I have had attacks of wheezing:',
        options: [
            { value: 'Most days of a week', score: 86.2, type: 'radio' },
            { value: 'Several days of a week', score: 71.0, type: 'radio' },
            { value: 'A few days a month', score: 45.6, type: 'radio' },
            { value: 'Only with chest infections', score: 36.4, type: 'radio' },
            { value: 'Not at all', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question5',
        text: 'Part 1, Question 5: During the past 3 months how many severe or very unpleasant attacks of chest trouble have you had?',
        options: [
            { value: 'More than 3 attacks', score: 86.7, type: 'radio' },
            { value: '3 attacks', score: 73.5, type: 'radio' },
            { value: '2 attacks', score: 60.3, type: 'radio' },
            { value: '1 attack', score: 44.2, type: 'radio' },
            { value: 'No attacks', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question6',
        text: 'Part 1, Question 6: How long did the worst attack of chest trouble last?',
        options: [
            { value: 'A week or more', score: 89.7, type: 'radio' },
            { value: '3 or more days', score: 73.5, type: 'radio' },
            { value: '1 or 2 days', score: 58.8, type: 'radio' },
            { value: 'Less than a day', score: 41.9, type: 'radio' },
        ],
    },
    {
        id: 'question7',
        text: 'Part 1, Question 7: Over the past 3 months, in an average week, how many good days (with little chest trouble) have you had?',
        options: [
            { value: 'No good days', score: 93.3, type: 'radio' },
            { value: '1 or 2 good days', score: 76.6, type: 'radio' },
            { value: '3 or 4 good days', score: 61.5, type: 'radio' },
            { value: 'Nearly every day is good', score: 15.4, type: 'radio' },
            { value: 'Every day is good', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question8',
        text: 'Part 1, Question 8: If you have a wheeze, is it worse in the morning?',
        options: [
            { value: 'No', score: 0.0, type: 'radio' },
            { value: 'Yes', score: 62.0, type: 'radio' },
            { value: 'I don\'t have a wheeze', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question9',
        text: 'Part 2, Question 1: How would you describe your chest condition?',
        options: [
            { value: 'The most important problem I have', score: 83.2, type: 'radio' },
            { value: 'Causes me quite a lot of problems', score: 82.5, type: 'radio' },
            { value: 'Causes me a few problems', score: 34.6, type: 'radio' },
            { value: 'Causes no problem', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question10',
        text: 'Part 2, Question 2: If you have ever had paid employment:',
        options: [
            { value: 'My chest trouble made me stop work altogether', score: 88.9, type: 'radio' },
            { value: 'My chest trouble interferes with my work or made me change my work', score: 77.6, type: 'radio' },
            { value: 'My chest trouble does not affect my work', score: 0.0, type: 'radio' },
            { value: 'I have never had paid employment', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question11',
        text: 'Part 2, Question 3: Select all the activities that usually make you feel breathless THESE DAYS:',
        options: [
            { value: 'Sitting or lying still', score: 90.6, type: 'checkbox' },
            { value: 'Getting washed or dressed', score: 82.8, type: 'checkbox' },
            { value: 'Walking around the home', score: 80.2, type: 'checkbox' },
            { value: 'Walking outside on non-sloped level ground', score: 81.4, type: 'checkbox' },
            { value: 'Walking up a flight of stairs', score: 76.1, type: 'checkbox' },
            { value: 'Walking up hills', score: 75.1, type: 'checkbox' },
            { value: 'Playing sports or games', score: 72.1, type: 'checkbox' },
            { value: 'None of these activities make me feel breathless', score: 0.0, type: 'checkbox' },
        ],
    },
    {
        id: 'question12',
        text: 'Part 2, Question 4: Select all the statements that apply in relation to your cough and breathlessness THESE DAYS:',
        options: [
            { value: 'My cough hurts', score: 81.1, type: 'checkbox' },
            { value: 'My cough makes me tired', score: 79.1, type: 'checkbox' },
            { value: 'I am breathless when I talk', score: 84.5, type: 'checkbox' },
            { value: 'I am breathless when I bend over', score: 76.8, type: 'checkbox' },
            { value: 'My cough or breathing disturbs my sleep', score: 87.9, type: 'checkbox' },
            { value: 'I get exhausted easily', score: 84.0, type: 'checkbox' },
            { value: 'None of these statements apply to me', score: 0.0, type: 'checkbox' },
        ],
    },
    {
        id: 'question13',
        text: 'Part 2, Question 5: Select all the statements that apply in relation to other effects your chest trouble may have on you THESE DAYS:',
        options: [
            { value: 'My cough or breathing is embarrassing in public', score: 74.1, type: 'checkbox' },
            { value: 'My chest trouble is a nuisance to my family, friends, or neighbours', score: 79.1, type: 'checkbox' },
            { value: 'I get afraid or panic when I cannot get my breath', score: 87.7, type: 'checkbox' },
            { value: 'I feel that I am not in control of my chest problem', score: 90.1, type: 'checkbox' },
            { value: 'I do not expect my chest to get any better', score: 82.3, type: 'checkbox' },
            { value: 'I have become frail or an invalid because of my chest', score: 89.9, type: 'checkbox' },
            { value: 'Exercise is not safe for me', score: 75.7, type: 'checkbox' },
            { value: 'Everything seems too much of an effort', score: 84.5, type: 'checkbox' },
            { value: 'None of these statements apply to me', score: 0.0, type: 'checkbox' },
        ],
    },
    {
        id: 'question14.1',
        text: 'Part 2, Question 6.1: Are you taking any respiratory system-related medication?',
        options: [
            { value: 'Yes', score: 0.0, type: 'radio' },
            { value: 'No', score: 0.0, type: 'radio' },
        ],
    },
    {
        id: 'question14.2',
        text: 'Part 2, Question 6.2: Select all the statements that apply in relation to any respiratory system-related medication you are taking:',
        options: [
            { value: 'My medication does not help me very much', score: 88.2, type: 'checkbox' },
            { value: 'I get embarrassed using my medication in public', score: 53.9, type: 'checkbox' },
            { value: 'I have unpleasant side effects from my medication', score: 81.1, type: 'checkbox' },
            { value: 'My medication interferes with my life a lot', score: 70.3, type: 'checkbox' },
            { value: 'None of these statements apply to me', score: 0.0, type: 'checkbox' },
        ],
    },
    {
        id: 'question15',
        text: 'Part 2, Question 7: Select all the statements that apply in relation to how your activities might be affected by your breathing:',
        options: [
            { value: 'I take a long time to get washed or dressed', score: 74.2, type: 'checkbox' },
            { value: 'I cannot take a bath or shower, or I take a long time', score: 81.0, type: 'checkbox' },
            { value: 'I walk slower than other people, or I stop for rests', score: 71.7, type: 'checkbox' },
            { value: 'Jobs such as housework take a long time, or I have to stop for rests', score: 70.6, type: 'checkbox' },
            { value: 'If I walk up one flight of stairs, I have to go slowly or stop', score: 71.6, type: 'checkbox' },
            { value: 'If I hurry or walk fast, I have to stop or slow down', score: 72.3, type: 'checkbox' },
            { value: 'My breathing makes it difficult to do things such as walk up hills, carrying things up stairs, light gardening such as weeding, dance, play bowls or play golf', score: 74.5, type: 'checkbox' },
            { value: 'My breathing makes it difficult to do things such as carry heavy loads, dig the garden or shovel snow, jog or walk at 5 miles per hour, play tennis or swim', score: 71.4, type: 'checkbox' },
            { value: 'My breathing makes it difficult to do things such as very heavy manual work, run, cycle, swim fast or play competitive sports', score: 63.5, type: 'checkbox' },
            { value: 'None of these statements apply to me', score: 0.0, type: 'checkbox' },
        ],
    },
    {
        id: 'question16',
        text: 'Part 2, Question 8: Select all the statements that apply in relation to how your chest USUALLY affects your daily life:',
        options: [
            { value: 'I cannot play sports or games', score: 64.8, type: 'checkbox' },
            { value: 'I cannot go out for entertainment or recreation', score: 79.8, type: 'checkbox' },
            { value: 'I cannot go out of the house to do the shopping', score: 81.0, type: 'checkbox' },
            { value: 'I cannot do housework', score: 79.1, type: 'checkbox' },
            { value: 'I cannot move far from my bed or chair', score: 94.0, type: 'checkbox' },
            { value: 'None of these statements apply to me', score: 0.0, type: 'checkbox' },
        ],
    },
    {
        id: 'question17',
        text: 'Part 3, Question 1: Please select the statement that most accurately describes how your chest affects you:',
        options: [
            { value: 'It does not stop me doing anything I would like to do', score: 0.0, type: 'radio' },
            { value: 'It stops me doing one or two things I would like to do', score: 42.0, type: 'radio' },
            { value: 'It stops me doing most of the things I would like to do', score: 84.2, type: 'radio' },
            { value: 'It stops me doing everything I would like to do', score: 96.7, type: 'radio' },
        ],
    },
];

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAnswerChange = (questionId, answer, score) => {
        setAnswers(prevAnswers => {
            const existingAnswers = prevAnswers[questionId] || { answers: [], scores: [] };
            const isSelected = existingAnswers.answers.includes(answer);
            const updatedAnswers = isSelected
                ? existingAnswers.answers.filter(a => a !== answer) // Deselect
                : [...existingAnswers.answers, answer]; // Select

            const updatedScores = updatedAnswers.map(a => {
                const option = questions.find(q => q.id === questionId)
                    .options.find(opt => opt.value === a);
                return option ? option.score : 0;
            });

            return {
                ...prevAnswers,
                [questionId]: { answers: updatedAnswers, scores: updatedScores }
            };
        });
    };

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const answer = answers[currentQuestion.id];
        let nextIndex = currentQuestionIndex + 1; // Default to the next question

        if (answer) {
            if (currentQuestion.id === 'question5' && answer.answers.includes('No attacks')) {
                nextIndex = questions.findIndex(q => q.id === 'question7');
            } else if (currentQuestion.id === 'question14.1' && answer.answers.includes('No')) {
                nextIndex = questions.findIndex(q => q.id === 'question15');
            }
        }

        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            handleSubmit(); // Submit if there are no more questions
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
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

        handleClick(totalWeightedComponent); // Call handleClick with totalWeightedComponent

        setIsModalOpen(false);
    };

    const handleClick = (totalWeightedComponent) => {
        axios.post('/api/stgeorgesscore', { score: totalWeightedComponent })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There was an error posting the score.', error);
            });
    };

    const calculateTotalWeightedComponent = () => {
        let totalPossibleScores = 0;
        let totalSelectedScores = 0;

        questions.forEach((question) => {
            const answer = answers[question.id];
            let questionPossibleScore = 0;

            if (question.options.every(option => option.type === 'checkbox')) {
                questionPossibleScore = question.options
                    .filter(option => !isNaN(option.score))
                    .map(option => parseFloat(option.score))
                    .reduce((a, b) => a + b, 0);
            } else if (question.options.every(option => option.type === 'radio')) {
                questionPossibleScore = Math.max(...question.options
                    .filter(option => !isNaN(option.score))
                    .map(option => parseFloat(option.score)));
            }

            totalPossibleScores += questionPossibleScore;

            if (answer && answer.scores) {
                const selectedScores = answer.scores.reduce((a, b) => a + b, 0);
                totalSelectedScores += parseFloat(selectedScores);
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
                const maxPossibleScore = Math.max(...question.options.map(option => option.score));
                totalPossibleScores += parseFloat(maxPossibleScore);

                const selectedScore = answer.scores.reduce((a, b) => a + b, 0);
                totalSelectedScores += parseFloat(selectedScore);
            }
        });

        return (totalSelectedScores * 100) / totalPossibleScores;
    };

    const calculateActivityComponent = () => {
        let totalPossibleScores = 0;
        let totalSelectedScores = 0;

        [11, 15].forEach((questionId) => {
            const question = questions.find(q => q.id === `question${questionId}`);
            const answer = answers[`question${questionId}`];

            if (question) {
                const possibleScore = question.options.reduce((total, option) => total + option.score, 0);
                totalPossibleScores += parseFloat(possibleScore);
            }

            if (answer) {
                const selectedScore = answer.scores.reduce((total, score) => total + score, 0);
                totalSelectedScores += parseFloat(selectedScore);
            }
        });

        return (totalSelectedScores * 100) / totalPossibleScores;
    };

    const calculateImpactsComponent = () => {
        let totalPossibleScores = 0;
        let totalSelectedScores = 0;

        [9, 10, 12, 13, '14.2', 16, 17].forEach((questionId) => {
            const question = questions.find(q => q.id === `question${questionId}`);
            const answer = answers[`question${questionId}`];

            if (question) {
                if ([9, 10, 17].includes(questionId)) {
                    const possibleScore = Math.max(...question.options.map(option => option.score));
                    totalPossibleScores += parseFloat(possibleScore);
                } else if ([12, 13, '14.2', 16].includes(questionId)) {
                    const possibleScore = question.options.reduce((total, option) => total + option.score, 0);
                    totalPossibleScores += parseFloat(possibleScore);
                }
            }

            if (answer) {
                const selectedScore = answer.scores.reduce((total, score) => total + score, 0);
                totalSelectedScores += parseFloat(selectedScore);
            }
        });

        if (totalPossibleScores === 0) {
            return 0;
        }
        return (totalSelectedScores * 100) / totalPossibleScores;
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>Start Quiz</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                ariaHideApp={false}
                contentLabel="Quiz Modal"
                style={{
                    content: {
                        top: "20vh"
                    }
                }}
            >
                <h2>Quiz</h2>
                <form id="quiz-form">
                    <QuizQuestion
                        question={questions[currentQuestionIndex]}
                        currentQuestion={questions[currentQuestionIndex].id}
                        onChange={handleAnswerChange}
                        onNext={handleNextQuestion}
                        onPrevious={handlePreviousQuestion}
                        selectedAnswers={answers[questions[currentQuestionIndex].id]?.answers || []}
                    />
                </form>
            </Modal>
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
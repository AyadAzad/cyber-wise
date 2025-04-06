import React, { useState } from 'react';

const SearchEngineChallenge = ({ completeChallenge }) => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            question: "کام لەم گەڕانانە سەلامەتترینە بۆ گەڕان لەسەر نەخۆشییەک؟",
            options: [
                { id: 1, text: "نەخۆشی + site:.gov", correct: true },
                { id: 2, text: "نەخۆشی + treatment + free", correct: false },
                { id: 3, text: "نەخۆشی + best cure", correct: false },
                { id: 4, text: "نەخۆشی + fastest solution", correct: false }
            ]
        },
        {
            id: 2,
            question: "کام لەم گەڕانانە باشترینە بۆ دۆزینەوەی زانیاری فەرمی لەسەر یاسایەک؟",
            options: [
                { id: 1, text: "یاسا + PDF", correct: false },
                { id: 2, text: "یاسا + filetype:pdf site:.gov", correct: true },
                { id: 3, text: "یاسا + download", correct: false },
                { id: 4, text: "یاسا + latest version", correct: false }
            ]
        },
        {
            id: 3,
            question: "کام لەم گەڕانانە باشترینە بۆ دۆزینەوەی کتێبێکی دروست؟",
            options: [
                { id: 1, text: "کتێب + free download", correct: false },
                { id: 2, text: "کتێب + buy", correct: false },
                { id: 3, text: "کتێب + site:.edu OR site:.org", correct: true },
                { id: 4, text: "کتێب + latest edition", correct: false }
            ]
        }
    ];

    const searchEngines = [
        { id: 1, name: "DuckDuckGo", privacy: "high", description: "گوازینەوەی نەناسراو و پاراستنی زانیاری" },
        { id: 2, name: "Startpage", privacy: "high", description: "ئەنجامەکانی گووگل بەبێ پاراستنی نهێنی" },
        { id: 3, name: "Google", privacy: "low", description: "گوازینەوەی ناسراو و کۆکردنەوەی زانیاری" },
        { id: 4, name: "Bing", privacy: "medium", description: "هەندێک پاراستنی نهێنی بەڵام کۆکردنەوەی زانیاری" },
        { id: 5, name: "Qwant", privacy: "high", description: "مووتۆری گەڕانی فەڕەنسی بە پاراستنی نهێنی" }
    ];

    const handleAnswer = (questionId, optionId) => {
        setAnswers({
            ...answers,
            [questionId]: optionId
        });

        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateScore();
            setShowResults(true);
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach(q => {
            const selectedOption = q.options.find(o => o.id === answers[q.id]);
            if (selectedOption && selectedOption.correct) {
                correctCount++;
            }
        });

        const calculatedScore = Math.floor((correctCount / questions.length) * 35);
        setScore(calculatedScore);
        completeChallenge(calculatedScore);
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٢: مووتۆری گەڕانی سەلامەت</h3>

            {!showResults ? (
                <>
                    <div className="step-indicator">
                        پرسیار {currentQuestion} لە {questions.length}
                    </div>

                    <div className="question-box">
                        <h4>پرسیار:</h4>
                        <p>{questions[currentQuestion - 1].question}</p>
                    </div>

                    <div className="options-grid">
                        {questions[currentQuestion - 1].options.map(option => (
                            <div
                                key={option.id}
                                className={`option-card ${answers[questions[currentQuestion - 1].id] === option.id ? 'selected' : ''}`}
                                onClick={() => handleAnswer(questions[currentQuestion - 1].id, option.id)}
                            >
                                <div className="option-text">{option.text}</div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className={`feedback ${score >= 25 ? 'correct' : 'incorrect'}`}>
                        {score >= 25 ? (
                            <>
                                <i className="fas fa-check-circle"></i>
                                <p>زۆر باش! تۆ فێری گەڕانی زیرەکانە بە سەلامەتی بویت.</p>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-times-circle"></i>
                                <p>هەندێک هەڵەت کردووە. لەبیرت بێت گەڕان لەسەر سایتی فەرمی باشترین ڕێگایە.</p>
                            </>
                        )}
                        <p>کۆی خاڵەکان: {score}</p>
                    </div>

                    <div className="search-engine-comparison">
                        <h4>پێڕستی مووتۆری گەڕانی سەلامەت:</h4>
                        <div className="engine-table">
                            {searchEngines.map(engine => (
                                <div key={engine.id} className={`engine-row ${engine.privacy}`}>
                                    <div className="engine-name">{engine.name}</div>
                                    <div className="engine-desc">{engine.description}</div>
                                    <div className="engine-privacy">
                                        {engine.privacy === "high" ? "پاراستنی زۆر" :
                                            engine.privacy === "medium" ? "پاراستنی مامناوەند" : "پاراستنی کەم"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchEngineChallenge;
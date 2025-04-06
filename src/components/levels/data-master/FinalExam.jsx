// FinalExam.js
import React, { useState } from 'react';

const FinalExam = ({ completeChallenge }) => {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            question: "کام لەم ڕێگایانە باشترینە بۆ پاراستنی زانیاری کەسی لە کاتی بەکارهێنانی وای-فای گشتی؟",
            options: [
                { id: 1, text: "بەکارهێنانی VPN" },
                { id: 2, text: "بەکارهێنانی HTTPS لە هەموو ماڵپەڕەکان" },
                { id: 3, text: "هیچ کردارێکی حیساب و تایبەت نەکەیت" },
                { id: 4, text: "هەموویان" }
            ],
            correct: 4,
            explanation: "لە کاتی بەکارهێنانی وای-فای گشتی، باشترین ڕێگا بریتییە لە بەکارهێنانی VPN و HTTPS و خۆپاراستن لە کردارە حیسابەکان."
        },
        {
            id: 2,
            question: "ئەگەر گومانت هەیە کە هەژمارەکەت لەلایەن کەسێکی ترەوە بەکارهێنراوە، چی دەکەیت؟",
            options: [
                { id: 1, text: "وشەی نهێنیەکە دەگۆڕم" },
                { id: 2, text: "پەیوەندی بە خزمەتگوزاریەکە دەکەم و ڕاپۆرت دەدەم" },
                { id: 3, text: "هەموو هەژمارەکانم دەگۆڕم کە هەمان وشەی نهێنییان هەیە" },
                { id: 4, text: "هەموویان" }
            ],
            correct: 4,
            explanation: "پێویستە هەموو ئەم کردارانە ئەنجام بدەیت بۆ پاراستنی هەژمارەکەت."
        },
        {
            id: 3,
            question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی زانیاری لە کۆمپانیایەک؟",
            options: [
                { id: 1, text: "پەروەردەکردنی کارمەندان لەسەر ئاسایشی زانیاری" },
                { id: 2, text: "بەکارهێنانی نەرمەکاڵای پاراستن" },
                { id: 3, text: "پالیسی بەهێزی پاراستنی زانیاری" },
                { id: 4, text: "هەموویان" }
            ],
            correct: 4,
            explanation: "پاراستنی زانیاری پێویستی بە هەموو ئەم ڕێگایانە هەیە بۆ کاریگەری."
        }
    ];

    const handleAnswer = (questionId, optionId) => {
        setAnswers({
            ...answers,
            [questionId]: optionId
        });
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) {
                correct++;
            }
        });
        const calculatedScore = Math.floor((correct / questions.length) * 50);
        setScore(calculatedScore);
        setSubmitted(true);
        completeChallenge(calculatedScore);
    };

    return (
        <div className="challenge-card">
            <h3>تاقیکردنەوەی کۆتایی</h3>
            <p className="instructions">وەڵامی هەموو پرسیارەکان بدەوە</p>

            {!submitted ? (
                <>
                    {questions.map(q => (
                        <div key={q.id} className="question-box">
                            <h4>{q.question}</h4>
                            <div className="options-list">
                                {q.options.map(opt => (
                                    <div
                                        key={opt.id}
                                        className={`option-item ${answers[q.id] === opt.id ? 'selected' : ''}`}
                                        onClick={() => handleAnswer(q.id, opt.id)}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${q.id}`}
                                            checked={answers[q.id] === opt.id}
                                            readOnly
                                        />
                                        <label>{opt.text}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        className="check-button"
                        onClick={calculateScore}
                        disabled={Object.keys(answers).length < questions.length}
                    >
                        کۆتایی هێنان
                    </button>
                </>
            ) : (
                <div className="feedback">
                    <h4>ئەنجامەکان:</h4>
                    <div className="score-display">
                        خاڵەکان: {score} لە ٥٠
                    </div>

                    {questions.map(q => (
                        <div key={q.id} className="question-result">
                            <p>{q.question}</p>
                            <p className={answers[q.id] === q.correct ? 'correct-answer' : 'wrong-answer'}>
                                وەڵامی تۆ: {q.options.find(o => o.id === answers[q.id])?.text}
                                {answers[q.id] !== q.correct && (
                                    <span> (وەڵامی ڕاست: {q.options.find(o => o.id === q.correct)?.text})</span>
                                )}
                            </p>
                            <p className="explanation">{q.explanation}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FinalExam;
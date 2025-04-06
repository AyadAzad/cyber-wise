// EncryptionChallenge.js
import React, { useState } from 'react';

const EncryptionChallenge = ({ completeChallenge }) => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            id: 1,
            question: "کام لەم ڕێگایانە پاراستنی زانیاری باشترە بۆ ناردنی زانیاری حیسابی بانکی؟",
            options: [
                { id: 1, text: "ئیمەیڵی ئاسایی", correct: false },
                { id: 2, text: "پەیامی تەلەفۆنی ئاسایی", correct: false },
                { id: 3, text: "پەڕەی وێب بە HTTPS", correct: true },
                { id: 4, text: "پەیامی کەناڵێکی کۆمەڵایەتی", correct: false }
            ],
            explanation: "HTTPS پاراستنی زانیاری دڵنیاکراوە دابین دەکات لە کاتی ناردن بەناو تۆڕی ئینتەرنێت."
        },
        {
            id: 2,
            question: "کام لەمە نوێنەرایەتی دەکات باشترین ڕێگای پاراستنی زانیاری لەسەر دیسکی ڕەق؟",
            options: [
                { id: 1, text: "FAT32", correct: false },
                { id: 2, text: "NTFS بەبێ پاراستن", correct: false },
                { id: 3, text: "BitLocker یان AES encryption", correct: true },
                { id: 4, text: "Zip فایل بە وشەی نهێنی", correct: false }
            ],
            explanation: "BitLocker و AES شێوازی پاراستنی تەواوی دیسک (Full Disk Encryption) دابین دەکەن."
        },
        {
            id: 3,
            question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی زانیاری لە مۆبایل؟",
            options: [
                { id: 1, text: "وشەی نهێنی ٤ ڕەقەمەری", correct: false },
                { id: 2, text: "نمایشەکانی قۆڵ (Pattern)", correct: false },
                { id: 3, text: "پەنجەنووس یان دەماغنووس", correct: true },
                { id: 4, text: "بێ پاراستن", correct: false }
            ],
            explanation: "پەنجەنووس و دەماغنووس پاراستنی زیاتر دابین دەکەن چونکە کۆپی کردنیان قورسە."
        }
    ];

    const handleAnswer = (isCorrect, explanation) => {
        if (isCorrect) {
            setScore(score + 10);
        }

        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
            setTimeout(() => completeChallenge(score + (isCorrect ? 10 : 0)), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٢: پاراستنی زانیاری</h3>
            <p className="instructions">وەڵامی پرسیارەکانی خوارەوە بدەوە</p>

            {!showResult ? (
                <>
                    <div className="question-progress">
                        پرسیار {currentQuestion} لە {questions.length}
                    </div>

                    <div className="question-box">
                        <h4>{questions[currentQuestion - 1].question}</h4>
                    </div>

                    <div className="options-list">
                        {questions[currentQuestion - 1].options.map(option => (
                            <div
                                key={option.id}
                                className="option-item"
                                onClick={() => handleAnswer(option.correct, questions[currentQuestion - 1].explanation)}
                            >
                                <input type="radio" name={`question-${currentQuestion}`} />
                                <label>{option.text}</label>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={`feedback ${score >= 20 ? 'correct' : 'incorrect'}`}>
                    {score >= 20 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! تۆ زانیاری باشت هەیە لەسەر پاراستنی زانیاری.</p>
                            <p>کۆی خاڵەکان: {score}</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>پێویستە زانیاری زیاتر بخوێنیتەوە لەسەر پاراستنی زانیاری.</p>
                            <p>کۆی خاڵەکان: {score}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default EncryptionChallenge;
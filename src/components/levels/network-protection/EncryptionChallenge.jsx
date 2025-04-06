import React, { useState } from 'react';

const EncryptionChallenge = ({ completeChallenge }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const steps = [
        {
            id: 1,
            question: "کام جۆری شێوەزارکردن بەهێزترە بۆ پاراستنی پەیوەندیەکانی تۆڕ؟",
            options: [
                { id: 1, text: "WEP", correct: false },
                { id: 2, text: "WPA", correct: false },
                { id: 3, text: "WPA2", correct: true },
                { id: 4, text: "WPA3", correct: true }
            ],
            type: "single"
        },
        {
            id: 2,
            question: "کام لەم ڕێسایانە پێویستە بەکاربهێنرێن بۆ پاراستنی باشی تۆڕی بێسیم؟",
            options: [
                { id: 1, text: "بەکارهێنانی وشەی نهێنی بەهێز", correct: true },
                { id: 2, text: "پەنابردن بە شێوەزارکردنی WPA3", correct: true },
                { id: 3, text: "وشەی نهێنی پێوانەیی وەک 'password123'", correct: false },
                { id: 4, text: "شاردنەوەی ناوی تۆڕ (SSID)", correct: true }
            ],
            type: "multiple"
        },
        {
            id: 3,
            question: "ئەگەر پەیوەندییەکی VPN دروست بکەیت، چی ڕوودەدات؟",
            options: [
                { id: 1, text: "هەموو پەیوەندیەکان شێوەزار دەکرێن", correct: true },
                { id: 2, text: "خێرایی ئینتەرنێت زیاد دەکات", correct: false },
                { id: 3, text: "IP ناونیشانەکەت دەشاردرێتەوە", correct: true },
                { id: 4, text: "هیچ پاراستنێکی زیادە ناکرێت", correct: false }
            ],
            type: "multiple"
        }
    ];

    const handleAnswer = (stepId, answerId) => {
        if (steps.find(s => s.id === stepId).type === "single") {
            setUserAnswers({ ...userAnswers, [stepId]: [answerId] });
        } else {
            const currentAnswers = userAnswers[stepId] || [];
            if (currentAnswers.includes(answerId)) {
                setUserAnswers({ ...userAnswers, [stepId]: currentAnswers.filter(id => id !== answerId) });
            } else {
                setUserAnswers({ ...userAnswers, [stepId]: [...currentAnswers, answerId] });
            }
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateScore();
            setShowResult(true);
        }
    };

    const calculateScore = () => {
        let correctAnswers = 0;

        steps.forEach(step => {
            const correctOptions = step.options.filter(opt => opt.correct).map(opt => opt.id);
            const userSelection = userAnswers[step.id] || [];

            if (step.type === "single") {
                if (correctOptions.includes(userSelection[0])) {
                    correctAnswers++;
                }
            } else {
                const allCorrect = userSelection.length === correctOptions.length &&
                    userSelection.every(id => correctOptions.includes(id));
                if (allCorrect) correctAnswers++;
            }
        });

        const score = Math.floor((correctAnswers / steps.length) * 40);
        setTimeout(() => completeChallenge(score), 2000);
        return score;
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٢: شێوەزارکردنی تۆڕ</h3>

            {!showResult ? (
                <>
                    <div className="step-indicator">
                        پێشگەیشتن {currentStep} لە {steps.length}
                    </div>

                    <div className="scenario-box">
                        <h4>پرسیار:</h4>
                        <p>{steps[currentStep - 1].question}</p>
                    </div>

                    <div className="response-options">
                        {steps[currentStep - 1].options.map(option => (
                            <div
                                key={option.id}
                                className={`response-card ${(userAnswers[currentStep] || []).includes(option.id) ? 'selected' : ''}`}
                                onClick={() => handleAnswer(currentStep, option.id)}
                            >
                                <input
                                    type={steps[currentStep - 1].type === "single" ? "radio" : "checkbox"}
                                    checked={(userAnswers[currentStep] || []).includes(option.id)}
                                    readOnly
                                />
                                <label>{option.text}</label>
                            </div>
                        ))}
                    </div>

                    <button className="check-button" onClick={nextStep}>
                        {currentStep < steps.length ? "دواتر" : "تەواوکردن"}
                    </button>
                </>
            ) : (
                <div className={`feedback ${calculateScore() >= 30 ? 'correct' : 'incorrect'}`}>
                    {calculateScore() >= 30 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! تۆ زانستێکی باشت هەیە لە شێوەزارکردنی تۆڕ.</p>
                            <p>کۆی خاڵەکان: {calculateScore()}</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>هەندێک هەڵەت کردووە. شێوەزارکردن کلیلێکی گرنگە بۆ پاراستنی تۆڕ.</p>
                            <p>کۆی خاڵەکان: {calculateScore()}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default EncryptionChallenge;
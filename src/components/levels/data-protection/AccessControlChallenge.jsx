import React, {useState} from "react";

const AccessControlChallenge = ({ completeChallenge }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userChoices, setUserChoices] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const scenarios = [
        {
            id: 1,
            question: "کەسێک لە بەشی HR داوای دەستگەیشتن بە زانیاری هەموو کارمەندەکان دەکات بۆ پڕۆژەیەکی ناوخۆیی. چی دەکەیت؟",
            options: [
                { id: 1, text: "هەموو زانیاریەکان دەدەمێ بەبێ هیچ پچڕانەوەیەک", risk: "high" },
                { id: 2, text: "تەنها زانیاری پێویست دەدەمێ کە پەیوەندی بە پڕۆژەکەوە هەیە", risk: "none" },
                { id: 3, text: "داوای ڕەزامەندی لە سەرپەرشتیار دەکەم پێش دابەشکردنی زانیاری", risk: "low" }
            ]
        },
        {
            id: 2,
            question: "بەڕێوەبەری بەشی فرۆشتن داوای دەستگەیشتن بە زانیاری کڕیارەکان دەکات. چی دەکەیت؟",
            options: [
                { id: 1, text: "تەنها زانیاری کڕیارەکانی بەشی خۆی دەدەمێ", risk: "none" },
                { id: 2, text: "هەموو زانیاریەکان دەدەمێ بەبێ هیچ سنوردارکردنێک", risk: "high" },
                { id: 3, text: "داوای ڕەزامەندی لە کڕیارەکان دەکەم پێش دابەشکردن", risk: "low" }
            ]
        },
        {
            id: 3,
            question: "کەسێک دەڵێت پەیوەندی بە پشتگیری تەکنیکی هەیە و داوای دەستگەیشتن بە سیستەمەکەت دەکات. چی دەکەیت؟",
            options: [
                { id: 1, text: "هیچ زانیاریەک نادەمێ پێش پشتڕاستکردنەوەی ناسنامەکەی", risk: "none" },
                { id: 2, text: "دەستگەیشتنی تەمەنی ١٠ خولەک دەدەمێ بۆ ئەوەی کێشەکە چارەسەر بکات", risk: "medium" },
                { id: 3, text: "زانیاری تەواو دەدەمێ چونکە پشتگیری تەکنیکییە", risk: "high" }
            ]
        }
    ];

    const handleOptionSelect = (option) => {
        setUserChoices([...userChoices, option]);

        if (currentStep < scenarios.length) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResult(true);
            const score = calculateScore();
            setTimeout(() => completeChallenge(score), 3000);
        }
    };

    const calculateScore = () => {
        const riskPoints = userChoices.reduce((points, choice) => {
            if (choice.risk === "high") return points + 0;
            if (choice.risk === "medium") return points + 10;
            if (choice.risk === "low") return points + 15;
            return points + 20; // none
        }, 0);

        return Math.min(30, riskPoints); // Max 30 points for this challenge
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٢: کۆنترۆلی دەستگەیشتن (Access Control)</h3>

            {!showResult ? (
                <>
                    <div className="step-indicator">
                        پێشگەیشتن {currentStep} لە {scenarios.length}
                    </div>

                    <div className="scenario-box">
                        <h4>دەقەکە:</h4>
                        <p>{scenarios[currentStep - 1].question}</p>
                    </div>

                    <div className="response-options">
                        {scenarios[currentStep - 1].options.map(option => (
                            <div
                                key={option.id}
                                className="response-card"
                                onClick={() => handleOptionSelect(option)}
                            >
                                <input type="radio" name={`scenario-${currentStep}`} />
                                <label>{option.text}</label>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={`feedback ${calculateScore() >= 20 ? 'correct' : 'partial'}`}>
                    {calculateScore() >= 20 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! تۆ بە سەرکەوتوویی ڕێگای دروستت بەکارهێنا بۆ کۆنترۆلی دەستگەیشتن.</p>
                            <p>کۆی خاڵەکان: {calculateScore()}</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle"></i>
                            <p>هەندێک هەڵەت کردووە. لەبیرت بێت کە دەستگەیشتن پێویستە بە پێی پێویستی کارمەندان بکرێت.</p>
                            <p>کۆی خاڵەکان: {calculateScore()}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AccessControlChallenge
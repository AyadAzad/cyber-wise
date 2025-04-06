// DataBreachChallenge.js
import React, { useState } from 'react';

const DataBreachChallenge = ({ completeChallenge }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const scenarios = [
        {
            id: 1,
            text: "کارمەندێک ئیمەیڵێکی فێڵکاری وەردەگرێت کە دەڵێت پێویستە زانیاری هەژماری بانکی نوێ بکاتەوە",
            breach: true,
            explanation: "ئەمە نمونەیەکی کلاسیکی فێڵکاری ئەلیکترۆنی (فیشینگ) کە دەبێتە هۆی شکاندنی زانیاری."
        },
        {
            id: 2,
            text: "کۆمپانیایەک پەڕەیەکی وێب دەکاتەوە بەبێ بەکارهێنانی پڕۆتۆکۆلی HTTPS",
            breach: true,
            explanation: "بەبێ HTTPS، زانیاری نێوان کڕیار و سێرڤەر پاراستراو نابێت و دەکرێت لەلایەن هێرشبەرەوە دەستکاری بکرێت."
        },
        {
            id: 3,
            text: "سیستەمێک هەڵدەستێت بە نوێکردنەوەی خۆکارانەی نەرمەکاڵاکەی",
            breach: false,
            explanation: "نوێکردنەوەی خۆکارانەی نەرمەکاڵا شتێکی باشە چونکە چاکسازی ئاسایشی تێدایە."
        },
        {
            id: 4,
            text: "کارمەندێک زانیاری کەسی خۆی لەسەر تۆڕی کۆمەڵایەتی بەربڵاو دەکات",
            breach: true,
            explanation: "ئەمە دەکرێت ببێتە هۆی کۆکردنەوەی زانیاری بۆ هێرشی کۆمەڵایەتی (social engineering)."
        },
        {
            id: 5,
            text: "کۆمپانیایەک پالیسی پاراستنی زانیاری جێبەجێ دەکات",
            breach: false,
            explanation: "پالیسی پاراستنی زانیاری شتێکی باشە و یارمەتی پاراستنی زانیاری کەسی دەدات."
        }
    ];

    const toggleSelection = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(opt => opt !== id));
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    const checkAnswers = () => {
        setAttempts(attempts + 1);
        const allCorrect = scenarios.every(scenario =>
            (scenario.breach && selectedOptions.includes(scenario.id)) ||
            (!scenario.breach && !selectedOptions.includes(scenario.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            const score = 50 - (attempts * 5); // Deduct 5 points for each attempt
            setTimeout(() => completeChallenge(Math.max(score, 20)), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ١: ناسینەوەی شکاندنی زانیاری</h3>
            <p className="instructions">کامیان لەم بارانە دەکرێت ببێتە هۆی شکاندنی زانیاری؟ (هەمووی دیاری بکە)</p>

            <div className="scenarios-list">
                {scenarios.map(scenario => (
                    <div
                        key={scenario.id}
                        className={`scenario-item ${selectedOptions.includes(scenario.id) ? 'selected' : ''}`}
                        onClick={() => toggleSelection(scenario.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(scenario.id)}
                            readOnly
                        />
                        <label>{scenario.text}</label>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkAnswers}>
                پشکنین
            </button>

            {showFeedback && (
                <div className={`feedback ${scenarios.every(scenario =>
                    (scenario.breach && selectedOptions.includes(scenario.id)) ||
                    (!scenario.breach && !selectedOptions.includes(scenario.id))) ? 'correct' : 'incorrect'}`}
                >
                    {scenarios.every(scenario =>
                        (scenario.breach && selectedOptions.includes(scenario.id)) ||
                        (!scenario.breach && !selectedOptions.includes(scenario.id))) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! تۆ بە سەرکەوتوویی هەڕەشەکانی شکاندنی زانیاریت ناسیەوە.</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>هەندێک هەڵەت کردووە. ئەم بارانە دەکرێت ببێتە هۆی شکاندنی زانیاری:</p>
                            <ul>
                                {scenarios.filter(s => s.breach && !selectedOptions.includes(s.id)).map(s => (
                                    <li key={s.id}>{s.explanation}</li>
                                ))}
                                {scenarios.filter(s => !s.breach && selectedOptions.includes(s.id)).map(s => (
                                    <li key={s.id}>{s.explanation}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataBreachChallenge;
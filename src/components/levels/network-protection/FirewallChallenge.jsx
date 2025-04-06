import React, { useState } from 'react';

const FirewallChallenge = ({ completeChallenge }) => {
    const [selectedRules, setSelectedRules] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const firewallRules = [
        { id: 1, text: "ڕێگەدان بە هەموو پەیوەندیەکانەوە", correct: false },
        { id: 2, text: "بلۆک کردنی پەیوەندیە نەناسراوەکان", correct: true },
        { id: 3, text: "بلۆک کردنی پۆرتی نەناسراوی TCP/UDP", correct: true },
        { id: 4, text: "ڕێگەدان بە پەیوەندی SSH لە دەرەوە", correct: false },
        { id: 5, text: "چاودێریکردنی پەیوەندیەکانی ناوخۆیی", correct: true },
        { id: 6, text: "ڕێگەدان بە هەموو پەیوەندیەکانی HTTP/HTTPS", correct: false }
    ];

    const toggleRule = (id) => {
        if (selectedRules.includes(id)) {
            setSelectedRules(selectedRules.filter(ruleId => ruleId !== id));
        } else {
            setSelectedRules([...selectedRules, id]);
        }
    };

    const checkConfiguration = () => {
        const allCorrect = firewallRules.every(rule =>
            (rule.correct && selectedRules.includes(rule.id)) ||
            (!rule.correct && !selectedRules.includes(rule.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            setTimeout(() => completeChallenge(30), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ١: ڕێکخستنی دیوارە ئاگرین</h3>
            <p className="instructions">کامیان لەم ڕێسایانە پارێزەرە و پێویستە دیاری بکرێن بۆ پاراستنی تۆڕەکەت؟ (هەمووی دیاری بکە)</p>

            <div className="rules-list">
                {firewallRules.map(rule => (
                    <div
                        key={rule.id}
                        className={`rule-item ${selectedRules.includes(rule.id) ? 'selected' : ''}`}
                        onClick={() => toggleRule(rule.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedRules.includes(rule.id)}
                            readOnly
                        />
                        <label>{rule.text}</label>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkConfiguration}>
                پشکنین
            </button>

            {showFeedback && (
                <div className={`feedback ${firewallRules.every(rule =>
                    (rule.correct && selectedRules.includes(rule.id)) ||
                    (!rule.correct && !selectedRules.includes(rule.id))) ? 'correct' : 'incorrect'}`}
                >
                    {firewallRules.every(rule =>
                        (rule.correct && selectedRules.includes(rule.id)) ||
                        (!rule.correct && !selectedRules.includes(rule.id))) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! دیوارە ئاگرینەکەت بە باشی ڕێکخراوە بۆ پاراستنی تۆڕەکەت.</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>هەندێک ڕێسای هەڵەت دیاریکردووە. دیوارە ئاگرین پێویستە تەنها پەیوەندیە پارێزراوەکان ڕێگەبدات.</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default FirewallChallenge;
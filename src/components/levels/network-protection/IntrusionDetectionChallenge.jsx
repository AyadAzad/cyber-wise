import React, { useState } from 'react';

const IntrusionDetectionChallenge = ({ completeChallenge }) => {
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentAlert, setCurrentAlert] = useState(0);

    const alerts = [
        {
            id: 1,
            description: "سیستەمەکەت ڕاپۆرتی دەدات کە هەوڵێک هەیە بۆ چوونەژوورەوەی نەناسراو لە ڕێگەی پۆرتی SSH",
            responses: [
                { id: 1, text: "پۆرتی SSH دابخەین و پەیوەندی بە بەڕێوەبەری تۆڕ بکەین", correct: true },
                { id: 2, text: "هیچ نەکەین چونکە لەوانەیە هەڵە بێت", correct: false },
                { id: 3, text: "وشەی نهێنی SSH بگۆڕین بۆ وشەیەکی سادەتر", correct: false }
            ]
        },
        {
            id: 2,
            description: "دەرگایەکی پاشەکەوت (backdoor) دۆزراوەتەوە لە یەکێک لە کۆمپیوتەرەکانی تۆڕ",
            responses: [
                { id: 1, text: "کۆمپیوتەرەکە جیا بکەینەوە لە تۆڕەکە و پشکنینی بکەین", correct: true },
                { id: 2, text: "هیچ نەکەین چونکە بێ زیانە", correct: false },
                { id: 3, text: "هەموو کۆمپیوتەرەکان ڕیستارت بکەین", correct: false }
            ]
        },
        {
            id: 3,
            description: "چەندین هەوڵی چوونەژوورەوەی شکستخواردوو هەیە لە کۆمپیوتەری سەرەوە",
            responses: [
                { id: 1, text: "IP ناونیشانە بلۆککراوەکان ڕێکبخەین لە دیوارە ئاگرین", correct: true },
                { id: 2, text: "هیچ نەکەین چونکە شکستیان هێناوە", correct: false },
                { id: 3, text: "کۆمپیوتەرەکە لەکاربخەین", correct: false }
            ]
        }
    ];

    const handleResponse = (responseId) => {
        setSelectedResponse(responseId);
        setShowFeedback(true);

        const isCorrect = alerts[currentAlert].responses.find(r => r.id === responseId)?.correct;
        if (isCorrect) {
            setTimeout(() => {
                if (currentAlert < alerts.length - 1) {
                    setCurrentAlert(currentAlert + 1);
                    setSelectedResponse(null);
                    setShowFeedback(false);
                } else {
                    completeChallenge(35);
                }
            }, 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٣: دۆزینەوەی هێرش</h3>
            <div className="alert-indicator">
                ڕاپۆرت {currentAlert + 1} لە {alerts.length}
            </div>

            <div className="scenario-box alert-box">
                <h4>ئاگاداری:</h4>
                <p>{alerts[currentAlert].description}</p>
            </div>

            <div className="response-options">
                {alerts[currentAlert].responses.map(response => (
                    <div
                        key={response.id}
                        className={`response-card ${selectedResponse === response.id ? 'selected' : ''}`}
                        onClick={() => !showFeedback && handleResponse(response.id)}
                    >
                        <input
                            type="radio"
                            checked={selectedResponse === response.id}
                            readOnly
                        />
                        <label>{response.text}</label>
                    </div>
                ))}
            </div>

            {showFeedback && (
                <div className={`feedback ${alerts[currentAlert].responses.find(r => r.id === selectedResponse)?.correct ? 'correct' : 'incorrect'}`}>
                    {alerts[currentAlert].responses.find(r => r.id === selectedResponse)?.correct ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>وەڵامێکی دروستە! ئەم کارە پاراستنی تۆڕەکەت زیاد دەکات.</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>وەڵامێکی هەڵەە! ئەم کارە مەترسیدارە بۆ تۆڕەکەت.</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default IntrusionDetectionChallenge;
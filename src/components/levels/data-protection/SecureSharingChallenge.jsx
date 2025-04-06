import React, { useState } from 'react';

const SecureSharingChallenge = ({ completeChallenge }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const sharingMethods = [
        {
            id: 1,
            method: "ناردنی ئیمەیڵ بە پەڕگەی چاکسازیکراو",
            secure: false,
            reason: "ئیمەیڵ ناڕێگەلێکراوە و دەکرێت بخرێتە ناو چاودێری"
        },
        {
            id: 2,
            method: "بەکارهێنانی خزمەتگوزاریەکی هاوبەشی پەڕگەی ئینتەرنێتی بە وشەی نهێنی",
            secure: true,
            reason: "پەڕگەکە تەنها بە کەسە ڕێگەپێدراوەکان دەبینرێت"
        },
        {
            id: 3,
            method: "ناردنی پەیام لە ڕێگەی ئەپێکی نامە ناڕێگەلێکراوەکان",
            secure: false,
            reason: "ئەپە ناڕێگەلێکراوەکان پاراستنی پێویستیان نییە"
        },
        {
            id: 4,
            method: "بەکارهێنانی پلاتفۆرمێکی هاوبەشی سەلامەت بە کۆدی تایبەت",
            secure: true,
            reason: "پلاتفۆرمە سەلامەتەکان پاراستنی پێویست دابین دەکەن"
        },
        {
            id: 5,
            method: "ناردنی پەڕگە لە ڕێگەی USB",
            secure: false,
            reason: "پەڕگەکە دەکرێت بگوازرێتەوە بۆ کۆمپیوتەری تر بەبێ چاودێری"
        },
        {
            id: 6,
            method: "بەکارهێنانی سیستەمی داخستنی پەڕگە بە کلیل",
            secure: true,
            reason: "تەنها کەسەکەی کلیلەکەی هەیە دەتوانێت پەڕگەکە بکاتەوە"
        }
    ];

    const toggleSelection = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    const checkAnswers = () => {
        const allCorrect = sharingMethods.every(method =>
            (method.secure && selectedOptions.includes(method.id)) ||
            (!method.secure && !selectedOptions.includes(method.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            setTimeout(() => completeChallenge(40), 2000);
        } else {
            const correctCount = sharingMethods.filter(method =>
                (method.secure && selectedOptions.includes(method.id)) ||
                (!method.secure && !selectedOptions.includes(method.id))
            ).length;
            const score = Math.floor((correctCount / sharingMethods.length) * 40);
            setTimeout(() => completeChallenge(score), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٤: هاوبەشی سەلامەت (Secure Sharing)</h3>
            <p className="instructions">
                کامیان لەم ڕێگایانە سەلامەتن بۆ هاوبەشی پەڕگەی حەساس؟ (هەمووی دیاری بکە)
            </p>

            <div className="methods-list">
                {sharingMethods.map(method => (
                    <div
                        key={method.id}
                        className={`method-card ${selectedOptions.includes(method.id) ? 'selected' : ''}`}
                        onClick={() => toggleSelection(method.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(method.id)}
                            readOnly
                        />
                        <div>
                            <label>{method.method}</label>
                            {selectedOptions.includes(method.id) && (
                                <span className="method-reason">{method.reason}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkAnswers}>
                پشکنین
            </button>

            {showFeedback && (
                <div className={`feedback ${
                    sharingMethods.every(method =>
                        (method.secure && selectedOptions.includes(method.id)) ||
                        (!method.secure && !selectedOptions.includes(method.id))
                    ) ? 'correct' : 'partial'
                }`}>
                    {sharingMethods.every(method =>
                        (method.secure && selectedOptions.includes(method.id)) ||
                        (!method.secure && !selectedOptions.includes(method.id))) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! تۆ بە سەرکەوتوویی ڕێگا سەلامەتەکانی هاوبەشی زانیاریت ناسیەوە.</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle"></i>
                            <p>هەندێک هەڵەت کردووە. لەبیرت بێت کە پێویستە زانیاری حەساس بە پاراستنی تەواو هاوبەش بکرێت.</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
export default SecureSharingChallenge
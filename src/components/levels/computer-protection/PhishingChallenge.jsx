import React, { useState } from 'react';

const PhishingChallenge = ({ completeChallenge }) => {
    const [currentEmail, setCurrentEmail] = useState(0);
    const [userChoices, setUserChoices] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const emails = [
        {
            id: 1,
            subject: "هەژمارەکەت بە مەترسییە!",
            from: "پشتگیرانی بانک <support@bank-kurd.com>",
            content: "هەژمارەکەت بە مەترسییە! تکایە کلیک لەسەر لینکەکە بکە بۆ پاراستنی هەژمارەکەت: http://bank-kurd-secure.com/login",
            isPhishing: true,
            clues: [
                "ناونیشانی ئیمەیڵەکە نایاساییە (bank-kurd.com لە جیاتی bankkurd.com)",
                "لینکەکە ناوەڕۆکی جیاوازی هەیە لەگەڵ ماڵپەڕی فەرمی",
                "فوریەتی دروستکراو بۆ ئەوەی فشار لەسەر تۆ بکات"
            ]
        },
        {
            id: 2,
            subject: "داواکاری گۆڕانی وشەی نهێنی",
            from: "تیمەکانی Microsoft <no-reply@microsoft.com>",
            content: "ئێمە تێبینی گۆڕانی وشەی نهێنی هەژمارەکەتمان کردووە. ئەگەر تۆ نەتبێتەوە، تکایە کلیک لەسەر لینکەکە بکە بۆ پاراستنی هەژمارەکەت: https://account.live.com/password/reset",
            isPhishing: false,
            clues: [
                "ناونیشانی ئیمەیڵەکە فەرمییە",
                "لینکەکە ڕاستەوخۆ دەبات بەرەو دۆمەینی فەرمی مایکرۆسۆفت",
                "هیچ فوریەتێکی دروستکراو نییە"
            ]
        },
        {
            id: 3,
            subject: "ئیمەیڵی نوێ بۆت هەیە لە LinkedIn",
            from: "LinkedIn Notifications <notifications@linkedin.com>",
            content: "سەلامەت بێت! تۆ ٣ ئیمەیڵی نوێت هەیە لە LinkedIn. کلیک لەسەر لینکەکە بکە بۆ بینینیان: http://linkd-in-profile-update.com/messages",
            isPhishing: true,
            clues: [
                "لینکەکە دۆمەینی هەڵە بەکارهێناوە (linkd-in لە جیاتی linkedin)",
                "ئیمەیڵەکە ڕێنمایی نادەات کە چۆن بچیتە سەر ماڵپەڕی فەرمی",
                "هیچ زانیاریەکی تایبەت نییە لە ناوەڕۆکیدا"
            ]
        }
    ];

    const handleUserChoice = (isPhishing) => {
        const newChoices = [...userChoices, {
            emailId: emails[currentEmail].id,
            userAnswer: isPhishing,
            correct: isPhishing === emails[currentEmail].isPhishing
        }];

        setUserChoices(newChoices);

        if (currentEmail < emails.length - 1) {
            setCurrentEmail(currentEmail + 1);
        } else {
            setShowResult(true);
            const score = calculateScore(newChoices);
            setTimeout(() => completeChallenge(score), 3000);
        }
    };

    const calculateScore = (choices) => {
        const correctCount = choices.filter(choice => choice.correct).length;
        return Math.floor((correctCount / emails.length) * 50); // Max 50 points
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٢: ناسینەوەی ئیمەیڵی فیشینگ</h3>
            <div className="step-indicator">
                ئیمەیڵ {currentEmail + 1} لە {emails.length}
            </div>

            {!showResult ? (
                <>
                    <div className="email-preview">
                        <div className="email-header">
                            <h4>سەردێڕ: {emails[currentEmail].subject}</h4>
                            <p>لە: {emails[currentEmail].from}</p>
                        </div>
                        <div className="email-content">
                            <p>{emails[currentEmail].content}</p>
                        </div>
                    </div>

                    <div className="phishing-question">
                        <p>ئایا ئەم ئیمەیڵە فیشینگە (هەڵەدزی)?</p>
                        <div className="phishing-options">
                            <button
                                className="btn-danger"
                                onClick={() => handleUserChoice(true)}
                            >
                                بەڵێ، فیشینگە
                            </button>
                            <button
                                className="btn-success"
                                onClick={() => handleUserChoice(false)}
                            >
                                نەخێر، فەرمییە
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="feedback-container">
                    <h4>ئەنجامەکان</h4>
                    <div className={`feedback ${calculateScore(userChoices) >= 30 ? 'correct' : 'incorrect'}`}>
                        {calculateScore(userChoices) >= 30 ? (
                            <>
                                <i className="fas fa-check-circle"></i>
                                <p>زۆر باش! تۆ بە سەرکەوتوویی ئیمەیڵی فیشینگت ناسیەوە.</p>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-times-circle"></i>
                                <p>هەندێک هەڵەت کردووە. پێویستە وریاتر بیت لە کاتی خوێندنەوەی ئیمەیڵەکان.</p>
                            </>
                        )}
                        <p>کۆی خاڵەکان: {calculateScore(userChoices)} لە ٥٠</p>
                    </div>

                    <div className="email-review">
                        {emails.map((email, index) => {
                            const userChoice = userChoices.find(c => c.emailId === email.id);
                            return (
                                <div key={email.id} className={`email-review-item ${userChoice?.correct ? 'correct' : 'incorrect'}`}>
                                    <h5>ئیمەیڵ #{index + 1}: {email.subject}</h5>
                                    <p>تۆ وەڵامت دابوو: {userChoice?.userAnswer ? 'فیشینگ' : 'فەرمی'}</p>
                                    <p>وەڵامی ڕاست: {email.isPhishing ? 'فیشینگ' : 'فەرمی'}</p>
                                    <div className="clues">
                                        <p>نیشانەکانی فیشینگ:</p>
                                        <ul>
                                            {email.clues.map((clue, i) => (
                                                <li key={i}>{clue}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhishingChallenge;
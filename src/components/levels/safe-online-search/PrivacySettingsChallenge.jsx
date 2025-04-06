import React, { useState } from 'react';

const PrivacySettingsChallenge = ({ completeChallenge }) => {
    const [browserSettings, setBrowserSettings] = useState({
        cookies: 'some',
        tracking: false,
        https: false,
        location: 'ask',
        passwordSaving: true
    });

    const [searchSettings, setSearchSettings] = useState({
        history: true,
        personalization: true,
        safeSearch: false,
        adTracking: true
    });

    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const handleBrowserChange = (setting, value) => {
        setBrowserSettings({
            ...browserSettings,
            [setting]: value
        });
    };

    const handleSearchChange = (setting, value) => {
        setSearchSettings({
            ...searchSettings,
            [setting]: value
        });
    };

    const checkSettings = () => {
        let browserScore = 0;
        let searchScore = 0;

        // Check browser settings
        if (browserSettings.cookies === 'block') browserScore += 10;
        if (browserSettings.tracking) browserScore += 10;
        if (browserSettings.https) browserScore += 10;
        if (browserSettings.location === 'block') browserScore += 10;
        if (!browserSettings.passwordSaving) browserScore += 10;

        // Check search settings
        if (!searchSettings.history) searchScore += 10;
        if (!searchSettings.personalization) searchScore += 10;
        if (searchSettings.safeSearch) searchScore += 10;
        if (!searchSettings.adTracking) searchScore += 10;

        const totalScore = browserScore + searchScore;
        setScore(totalScore);
        setShowFeedback(true);
        completeChallenge(totalScore);
    };

    const getRecommendation = () => {
        const recommendations = [];

        if (browserSettings.cookies !== 'block') {
            recommendations.push("• بلۆکی کوکییەکانی پەیوەندینەکراو");
        }

        if (!browserSettings.tracking) {
            recommendations.push("• چالاککردنی ڕێگری لە شوێنکەوتن");
        }

        if (!browserSettings.https) {
            recommendations.push("• چالاککردنی HTTPS بە شێوەیەکی خۆکار");
        }

        if (browserSettings.location !== 'block') {
            recommendations.push("• بلۆکی ئاستی شوێن");
        }

        if (browserSettings.passwordSaving) {
            recommendations.push("• نەهێشتنی وشەی نهێنی لە وێبگەڕەکەت");
        }

        if (searchSettings.history) {
            recommendations.push("• نەهێشتنی مێژووی گەڕان");
        }

        if (searchSettings.personalization) {
            recommendations.push("• نەهێشتنی کەسیکردنەوە");
        }

        if (!searchSettings.safeSearch) {
            recommendations.push("• چالاککردنی گەڕانی سەلامەت");
        }

        if (searchSettings.adTracking) {
            recommendations.push("• ڕێگری لە شوێنکەوتنی ڕیکلام");
        }

        return recommendations.length > 0 ? recommendations : ["• هەموو ڕێکخستنەکانت سەلامەتن!"];
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٣: ڕێکخستنەکانی پاراستنی نهێنی</h3>
            <p className="instructions">ڕێکخستنەکانی خۆت دابنێ بۆ پاراستنی نهێنی</p>

            <div className="settings-container">
                <div className="settings-section">
                    <h4>ڕێکخستنەکانی وێبگەڕ:</h4>

                    <div className="setting-item">
                        <label>مامەڵە لەگەڵ کوکی:</label>
                        <select
                            value={browserSettings.cookies}
                            onChange={(e) => handleBrowserChange('cookies', e.target.value)}
                        >
                            <option value="all">قبوڵکردنی هەموو کوکییەکان</option>
                            <option value="some">تەنها کوکییە پەیوەندینەکراوەکان</option>
                            <option value="block">ڕێگری لە هەموو کوکییەکان</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>ڕێگری لە شوێنکەوتن:</label>
                        <input
                            type="checkbox"
                            checked={browserSettings.tracking}
                            onChange={(e) => handleBrowserChange('tracking', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>HTTPS بە شێوەیەکی خۆکار:</label>
                        <input
                            type="checkbox"
                            checked={browserSettings.https}
                            onChange={(e) => handleBrowserChange('https', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>دەستگەیشتن بە شوێن:</label>
                        <select
                            value={browserSettings.location}
                            onChange={(e) => handleBrowserChange('location', e.target.value)}
                        >
                            <option value="allow">ڕێگەدان</option>
                            <option value="ask">پرسیارکردن</option>
                            <option value="block">ڕێگری</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>هەڵگرتنی وشەی نهێنی:</label>
                        <input
                            type="checkbox"
                            checked={browserSettings.passwordSaving}
                            onChange={(e) => handleBrowserChange('passwordSaving', e.target.checked)}
                        />
                    </div>
                </div>

                <div className="settings-section">
                    <h4>ڕێکخستنەکانی مووتۆری گەڕان:</h4>

                    <div className="setting-item">
                        <label>هەڵگرتنی مێژووی گەڕان:</label>
                        <input
                            type="checkbox"
                            checked={searchSettings.history}
                            onChange={(e) => handleSearchChange('history', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>کەسیکردنەوەی ئەنجامەکان:</label>
                        <input
                            type="checkbox"
                            checked={searchSettings.personalization}
                            onChange={(e) => handleSearchChange('personalization', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>گەڕانی سەلامەت:</label>
                        <input
                            type="checkbox"
                            checked={searchSettings.safeSearch}
                            onChange={(e) => handleSearchChange('safeSearch', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>شوێنکەوتنی ڕیکلام:</label>
                        <input
                            type="checkbox"
                            checked={searchSettings.adTracking}
                            onChange={(e) => handleSearchChange('adTracking', e.target.checked)}
                        />
                    </div>
                </div>
            </div>

            <button className="check-button" onClick={checkSettings}>
                پشکنینی ڕێکخستنەکان
            </button>

            {showFeedback && (
                <div className={`feedback ${score >= 70 ? 'correct' : 'incorrect'}`}>
                    {score >= 70 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! ڕێکخستنەکانی پاراستنی نهێنی تۆ زۆر سەلامەتن.</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>ڕێکخستنەکانت پێویستی بە باشترکردن هەیە. ئەم ڕەسەنانەی خوارەوە پێشنیار دەکرێن:</p>
                            <ul className="recommendations">
                                {getRecommendation().map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    <p>کۆی خاڵەکان: {score}</p>
                </div>
            )}
        </div>
    );
};

export default PrivacySettingsChallenge;
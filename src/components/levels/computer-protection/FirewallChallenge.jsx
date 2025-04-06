import React, { useState } from 'react';

const FirewallChallenge = ({ completeChallenge }) => {
    const [firewallStatus, setFirewallStatus] = useState({
        incoming: 'medium',
        outgoing: 'low',
        notifications: true,
        autoUpdate: false
    });
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const optimalSettings = {
        incoming: 'high',
        outgoing: 'medium',
        notifications: true,
        autoUpdate: true
    };

    const handleSettingChange = (setting, value) => {
        setFirewallStatus(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    const checkSettings = () => {
        let calculatedScore = 0;

        // Check each setting against optimal
        if (firewallStatus.incoming === optimalSettings.incoming) calculatedScore += 25;
        if (firewallStatus.outgoing === optimalSettings.outgoing) calculatedScore += 25;
        if (firewallStatus.notifications === optimalSettings.notifications) calculatedScore += 25;
        if (firewallStatus.autoUpdate === optimalSettings.autoUpdate) calculatedScore += 25;

        setScore(calculatedScore);
        setShowFeedback(true);

        setTimeout(() => completeChallenge(calculatedScore), 3000);
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٣: ڕێکخستنی دیوارە ئاگرین</h3>
            <p className="instructions">
                دیوارە ئاگرین یەکێکە لە گرنگترین ئامرازەکانی پاراستنی کۆمپیوتەر. ڕێکخستنەکانی خوارەوە بگۆڕە بۆ پاراستنی باشتر.
            </p>

            <div className="firewall-settings">
                <div className="setting-group">
                    <h4>پاراستنی ناوهات:</h4>
                    <div className="radio-options">
                        <label>
                            <input
                                type="radio"
                                name="incoming"
                                checked={firewallStatus.incoming === 'high'}
                                onChange={() => handleSettingChange('incoming', 'high')}
                            />
                            بەهێز (باشترین پاراستن)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="incoming"
                                checked={firewallStatus.incoming === 'medium'}
                                onChange={() => handleSettingChange('incoming', 'medium')}
                            />
                            مامناوەند (پاراستنی ناوەندی)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="incoming"
                                checked={firewallStatus.incoming === 'low'}
                                onChange={() => handleSettingChange('incoming', 'low')}
                            />
                            بەهێز نەبوو (زۆر مەترسیدار)
                        </label>
                    </div>
                </div>

                <div className="setting-group">
                    <h4>پاراستنی دەرهات:</h4>
                    <div className="radio-options">
                        <label>
                            <input
                                type="radio"
                                name="outgoing"
                                checked={firewallStatus.outgoing === 'high'}
                                onChange={() => handleSettingChange('outgoing', 'high')}
                            />
                            بەهێز (لەوانەیە هەندێک خاڵی ڕاستەقینە بلۆک بکات)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="outgoing"
                                checked={firewallStatus.outgoing === 'medium'}
                                onChange={() => handleSettingChange('outgoing', 'medium')}
                            />
                            مامناوەند (باشترین هەڵبژاردە)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="outgoing"
                                checked={firewallStatus.outgoing === 'low'}
                                onChange={() => handleSettingChange('outgoing', 'low')}
                            />
                            بەهێز نەبوو (مەترسیدار)
                        </label>
                    </div>
                </div>

                <div className="setting-group">
                    <h4>ئاگاداریەکان:</h4>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={firewallStatus.notifications}
                            onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                        />
                        <span className="slider"></span>
                        {firewallStatus.notifications ? 'چالاکە' : 'ناچالاکە'}
                    </label>
                    <p className="setting-description">ئاگاداریەکان یارمەتیت دەدات بزانیت کەی هێرشێک ڕوویداوە.</p>
                </div>

                <div className="setting-group">
                    <h4>نوێکردنەوەی خۆکار:</h4>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={firewallStatus.autoUpdate}
                            onChange={(e) => handleSettingChange('autoUpdate', e.target.checked)}
                        />
                        <span className="slider"></span>
                        {firewallStatus.autoUpdate ? 'چالاکە' : 'ناچالاکە'}
                    </label>
                    <p className="setting-description">نوێکردنەوەی خۆکار پاراستنەکەت بە ڕێژە دەکات.</p>
                </div>
            </div>

            <button className="check-button" onClick={checkSettings}>
                پشکنینی ڕێکخستنەکان
            </button>

            {showFeedback && (
                <div className={`feedback ${score >= 75 ? 'correct' : score >= 50 ? 'warning' : 'incorrect'}`}>
                    {score >= 75 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! ڕێکخستنەکانی دیوارە ئاگرینەکەت زۆر پارێزەرانەن.</p>
                        </>
                    ) : score >= 50 ? (
                        <>
                            <i className="fas fa-exclamation-triangle"></i>
                            <p>باشە، بەڵام دەتوانی باشتر بکەیت! هەندێک ڕێکخستن پاراستنی باشتر دەوێت.</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>ڕێکخستنەکانی دیوارە ئاگرینەکەت زۆر مەترسیدارن. پێویستە گۆڕانکاری تێدا بکەیت.</p>
                        </>
                    )}
                    <p>کۆی خاڵەکان: {score} لە ١٠٠</p>

                    {score < 100 && (
                        <div className="recommendations">
                            <h5>پێشنیارەکان:</h5>
                            <ul>
                                {firewallStatus.incoming !== optimalSettings.incoming && (
                                    <li>پاراستنی ناوهات بگۆڕە بۆ "بەهێز"</li>
                                )}
                                {firewallStatus.outgoing !== optimalSettings.outgoing && (
                                    <li>پاراستنی دەرهات بگۆڕە بۆ "مامناوەند"</li>
                                )}
                                {firewallStatus.notifications !== optimalSettings.notifications && (
                                    <li>ئاگاداریەکان چالاک بکە</li>
                                )}
                                {firewallStatus.autoUpdate !== optimalSettings.autoUpdate && (
                                    <li>نوێکردنەوەی خۆکار چالاک بکە</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FirewallChallenge;
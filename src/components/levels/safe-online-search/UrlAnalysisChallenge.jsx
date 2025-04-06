import React, { useState } from 'react';

const UrlAnalysisChallenge = ({ completeChallenge }) => {
    const [selectedUrls, setSelectedUrls] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const urlExamples = [
        { id: 1, url: "https://www.bankofkurdistan.com/login", safe: true },
        { id: 2, url: "http://free-gifts.krd/promo?id=12345", safe: false },
        { id: 3, url: "https://www.amazon.com/dp/B08N5KWB9H", safe: true },
        { id: 4, url: "https://secure-payment.net/process?user=123", safe: false },
        { id: 5, url: "https://www.wikipedia.org/wiki/Kurdistan", safe: true },
        { id: 6, url: "http://facebook.update.profile.verify.krd", safe: false }
    ];

    const urlFeatures = [
        { id: 1, feature: "پێشگرەی HTTPS لە جیاتی HTTP", correct: true },
        { id: 2, feature: "ناونیشانی دروست و ڕێک (نەک چەند خاڵی زۆر)", correct: true },
        { id: 3, feature: "پاشگرەی وڵات (وەک .com .org .net)", correct: true },
        { id: 4, feature: "لینکی کورتکراوە (وەک bit.ly)", correct: false },
        { id: 5, feature: "پارامیتەری زۆر لە ناونیشاندا", correct: false },
        { id: 6, feature: "ناوی ناسراو و فەرمی کۆمپانیا", correct: true }
    ];

    const toggleUrlSelection = (id) => {
        if (selectedUrls.includes(id)) {
            setSelectedUrls(selectedUrls.filter(urlId => urlId !== id));
        } else {
            setSelectedUrls([...selectedUrls, id]);
        }
    };

    const checkUrlAnswers = () => {
        const allCorrect = urlExamples.every(example =>
            (example.safe && selectedUrls.includes(example.id)) ||
            (!example.safe && !selectedUrls.includes(example.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            setTimeout(() => setCurrentStep(2), 2000);
        }
    };

    const checkFeatureAnswers = (selectedFeatures) => {
        const correctCount = urlFeatures.filter(feature =>
            feature.correct === selectedFeatures.includes(feature.id)
        ).length;

        const score = Math.floor((correctCount / urlFeatures.length) * 30);
        completeChallenge(score);
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ١: شیکردنەوەی ناونیشانی وێب</h3>

            {currentStep === 1 ? (
                <>
                    <p className="instructions">کامیان لەم ناونیشانانە سەلامەتن؟ (هەمووی دیاری بکە)</p>

                    <div className="url-grid">
                        {urlExamples.map(example => (
                            <div
                                key={example.id}
                                className={`url-card ${selectedUrls.includes(example.id) ? 'selected' : ''}`}
                                onClick={() => toggleUrlSelection(example.id)}
                            >
                                <div className="url-text">{example.url}</div>
                                <div className={`url-status ${example.safe ? 'safe' : 'unsafe'}`}>
                                    {selectedUrls.includes(example.id) ? (
                                        example.safe ? 'سەلامەت' : 'مەترسیدار'
                                    ) : '‌'}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="check-button"
                        onClick={checkUrlAnswers}
                        disabled={selectedUrls.length === 0}
                    >
                        پشکنین
                    </button>

                    {showFeedback && (
                        <div className={`feedback ${urlExamples.every(example =>
                            (example.safe && selectedUrls.includes(example.id)) ||
                            (!example.safe && !selectedUrls.includes(example.id)) ? 'correct' : 'incorrect')}`}
                        >
                            {urlExamples.every(example =>
                                (example.safe && selectedUrls.includes(example.id)) ||
                                (!example.safe && !selectedUrls.includes(example.id)) ? (
                                    <>
                                        <i className="fas fa-check-circle"></i>
                                        <p>زۆر باش! تۆ بە سەرکەوتوویی ناونیشانی سەلامەتت ناسیەوە.</p>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-times-circle"></i>
                                        <p>هەندێک هەڵەت کردووە. لەبیرت بێت ناونیشانی سەلامەت پێویستی بە HTTPS هەیە و ناوی ڕێک و فەرمی.</p>
                                    </>
                                ))}
                        </div>
                    )}
                </>
            ) : (
                <FeatureIdentification
                    features={urlFeatures}
                    onComplete={checkFeatureAnswers}
                />
            )}
        </div>
    );
};

const FeatureIdentification = ({ features, onComplete }) => {
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const toggleFeature = (id) => {
        if (selectedFeatures.includes(id)) {
            setSelectedFeatures(selectedFeatures.filter(fId => fId !== id));
        } else {
            setSelectedFeatures([...selectedFeatures, id]);
        }
    };

    return (
        <>
            <p className="instructions">کامیان لەم تایبەتمەندیانە نیشانەکانی ناونیشانی سەلامەتن؟</p>

            <div className="features-list">
                {features.map(feature => (
                    <div
                        key={feature.id}
                        className={`feature-item ${selectedFeatures.includes(feature.id) ? 'selected' : ''}`}
                        onClick={() => toggleFeature(feature.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature.id)}
                            readOnly
                        />
                        <label>{feature.feature}</label>
                    </div>
                ))}
            </div>

            <button
                className="check-button"
                onClick={() => onComplete(selectedFeatures)}
                disabled={selectedFeatures.length === 0}
            >
                تەواوکردن
            </button>
        </>
    );
};

export default UrlAnalysisChallenge;
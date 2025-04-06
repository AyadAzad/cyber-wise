import React, {useState} from "react";

const DataRetentionChallenge = ({ completeChallenge }) => {
    const [dragItems, setDragItems] = useState([
        { id: 1, text: "زانیاری کارمەندانی پێشوو", category: null, correct: "delete" },
        { id: 2, text: "تۆماری فرۆشتنەکانی ١٠ ساڵ لەمەوپێش", category: null, correct: "archive" },
        { id: 3, text: "ئیمەیڵی کڕیارەکان لە ٣ مانگ لەمەوپێش", category: null, correct: "keep" },
        { id: 4, text: "زانیاری نەخۆشی کارمەندانی پێشوو", category: null, correct: "delete" },
        { id: 5, text: "کۆپی پاسپۆرتی کڕیارەکان", category: null, correct: "delete" },
        { id: 6, text: "تۆماری پارەدانەکانی ٢ ساڵ لەمەوپێش", category: null, correct: "keep" }
    ]);
    const [showFeedback, setShowFeedback] = useState(false);

    const categories = [
        { id: "keep", text: "هێشتنەوە (پێویستە)", color: "green" },
        { id: "archive", text: "ئەرشیفکردن (بۆ مێژوو)", color: "blue" },
        { id: "delete", text: "سڕینەوە (پێویست نییە)", color: "red" }
    ];

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
    };

    const handleDrop = (e, category) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");

        setDragItems(prevItems =>
            prevItems.map(item =>
                item.id === parseInt(id) ? { ...item, category } : item
            )
        );
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const checkAnswers = () => {
        setShowFeedback(true);
        const correctCount = dragItems.filter(item => item.category === item.correct).length;
        const score = Math.floor((correctCount / dragItems.length) * 30);
        setTimeout(() => completeChallenge(score), 2000);
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٣: پاراستنی ماوەی زانیاری (Data Retention)</h3>
            <p className="instructions">
                زانیاریەکان بکە بۆ کۆگای ڕاستەقینەیان بەپێی سیاسەتی پاراستنی زانیاری کۆمپانیاکە
            </p>

            <div className="drag-container">
                <div className="drag-items">
                    {dragItems.map(item => (
                        <div
                            key={item.id}
                            className="drag-item"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>

                <div className="drop-zones">
                    {categories.map(cat => (
                        <div
                            key={cat.id}
                            className={`drop-zone ${cat.color}`}
                            onDrop={(e) => handleDrop(e, cat.id)}
                            onDragOver={handleDragOver}
                        >
                            <h4>{cat.text}</h4>
                            {dragItems
                                .filter(item => item.category === cat.id)
                                .map(item => (
                                    <div key={item.id} className="dropped-item">
                                        {item.text}
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>

            <button className="check-button" onClick={checkAnswers}>
                پشکنین
            </button>

            {showFeedback && (
                <div className={`feedback ${
                    dragItems.every(item => item.category === item.correct) ? 'correct' : 'partial'
                }`}>
                    {dragItems.every(item => item.category === item.correct) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! تۆ بە سەرکەوتوویی زانیاریەکانی جیاکردەوە بەپێی سیاسەتی پاراستنی زانیاری.</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle"></i>
                            <p>هەندێک هەڵەت کردووە. لەبیرت بێت کە پێویستە زانیاری تەنها بۆ ماوەی پێویست بپارێزرێت.</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataRetentionChallenge
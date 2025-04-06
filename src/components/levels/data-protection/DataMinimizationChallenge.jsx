import React, {useState} from "react";

const DataMinimizationChallenge = ({ completeChallenge }) => {
    const [selectedFields, setSelectedFields] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const formFields = [
        { id: 1, field: "ناو", required: true, reason: "پێویستە بۆ ناسینەوەی بەکارهێنەر" },
        { id: 2, field: "ناوی باوک", required: false, reason: "تەنها لە کاتی پێویست داوا بکرێت" },
        { id: 3, field: "ژمارەی تەلەفۆنی باوک", required: false, reason: "زانیاری زۆرە و پێویست نییە" },
        { id: 4, field: "ناونیشانی تەواو", required: false, reason: "تەنها لە کاتی ناردنی کاڵا داوا بکرێت" },
        { id: 5, field: "پۆستی ئەلیکترۆنی", required: true, reason: "پێویستە بۆ پەیوەندی کردن" },
        { id: 6, field: "بەرواری لەدایکبوون", required: false, reason: "تەنها لە کاتی پێویست داوا بکرێت" },
        { id: 7, field: "ژمارەی نەستە", required: false, reason: "زانیاری زۆرە و پێویست نییە" },
        { id: 8, field: "نەخۆشی خوێی", required: false, reason: "زانیاری حەساسە و پێویست نییە" }
    ];

    const toggleSelection = (id) => {
        if (selectedFields.includes(id)) {
            setSelectedFields(selectedFields.filter(fieldId => fieldId !== id));
        } else {
            setSelectedFields([...selectedFields, id]);
        }
    };

    const checkAnswers = () => {
        const correctFields = formFields.filter(field => field.required).map(field => field.id);
        const userSelectedRequired = correctFields.every(id => selectedFields.includes(id));
        const userSelectedOnlyRequired = selectedFields.every(id => correctFields.includes(id));

        const isPerfect = userSelectedRequired && userSelectedOnlyRequired && selectedFields.length === correctFields.length;
        const isGood = userSelectedRequired && !userSelectedOnlyRequired;

        setShowFeedback(true);

        if (isPerfect) {
            setTimeout(() => completeChallenge(30), 2000);
        } else if (isGood) {
            setTimeout(() => completeChallenge(20), 2000);
        } else {
            setTimeout(() => completeChallenge(10), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ١: کەمکردنەوەی زانیاری (Data Minimization)</h3>
            <p className="instructions">
                تۆ بەڕێوەبەری پڕۆژەیەکی نوێیت کە پێویستە فۆرمێکی تۆمارکردن دروست بکەیت. تەنها خانە پێویستەکان دیاری بکە:
            </p>

            <div className="fields-grid">
                {formFields.map(field => (
                    <div
                        key={field.id}
                        className={`field-card ${selectedFields.includes(field.id) ? 'selected' : ''} ${field.required ? 'required' : ''}`}
                        onClick={() => toggleSelection(field.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedFields.includes(field.id)}
                            readOnly
                        />
                        <div>
                            <label>{field.field}</label>
                            <span className="field-reason">{field.reason}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkAnswers}>
                پشکنین
            </button>

            {showFeedback && (
                <div className={`feedback ${
                    selectedFields.length === formFields.filter(field => field.required).length &&
                    selectedFields.every(id => formFields.find(f => f.id === id).required) ? 'correct' : 'partial'}`}
                >
                    {selectedFields.length === formFields.filter(field => field.required).length &&
                    selectedFields.every(id => formFields.find(f => f.id === id).required) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>زۆر باش! تەنها خانە پێویستەکانت دیاری کردووە. ئەمە ڕێگایەکی باشە بۆ کەمکردنەوەی مەترسی لەبارەی زانیاری کەسی.</p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle"></i>
                            <p>
                                {selectedFields.some(id => !formFields.find(f => f.id === id).required) ?
                                    "هەندێک لە خانەکان کە دیاریت کردوون پێویست نین. لەبیرت بێت کە کەمترین زانیاری کەسی کۆبکەیتەوە." :
                                    "هەندێک لە خانە پێویستەکانت دیاری نەکردووە. دڵنیابە لەوەی کە هەموو زانیاریە پێویستەکان کۆبکەیتەوە."}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataMinimizationChallenge
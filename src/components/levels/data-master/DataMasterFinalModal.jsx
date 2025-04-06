// DataMasterFinalModal.js
import React from 'react';

const DataMasterFinalModal = ({ score, onClose }) => {
    const getRank = () => {
        if (score >= 180) return "زانای زانیاری";
        if (score >= 150) return "پیشەگەری ئاسایشی سایبەری";
        if (score >= 120) return "پارێزەری زانیاری";
        return "فێرخوازی ئاسایشی سایبەری";
    };

    return (
        <div className="final-modal-overlay">
            <div className="final-modal">
                <div className="modal-header master">
                    <i className="fas fa-graduation-cap"></i>
                    <h3>پیرۆزە! ئاستی کۆتایی تەواو کرد</h3>
                </div>
                <div className="modal-body">
                    <p>تۆ ئێستا بە فەرمی ناسێنەرایەتیت وەک {getRank()} کرا!</p>

                    <div className="score-display master">
                        <i className="fas fa-shield-alt"></i>
                        <span>کۆی گشتی خاڵەکان: {score} لە ٢٠٠</span>
                    </div>

                    <div className="rank-badge">
                        <div className="badge-icon">
                            <i className="fas fa-lock"></i>
                        </div>
                        <div className="badge-text">
                            <h4>{getRank()}</h4>
                            <p>ئاستی ئاسایشی سایبەری: {Math.floor((score / 200) * 100)}%</p>
                        </div>
                    </div>

                    <ul className="master-skills">
                        <li><i className="fas fa-check"></i> ناسینەوەی شکاندنی زانیاری</li>
                        <li><i className="fas fa-check"></i> پاراستنی زانیاری بە شێوازی نوێنەرایەتی</li>
                        <li><i className="fas fa-check"></i> ئاسایشی API و کۆد نووسین</li>
                        <li><i className="fas fa-check"></i> زانستێکی گشتی لەسەر پاراستنی زانیاری</li>
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="btn-master" onClick={onClose}>
                        کۆتایی هێنان
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataMasterFinalModal;
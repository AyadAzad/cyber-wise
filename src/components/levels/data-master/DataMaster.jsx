import React, { useState, useEffect } from 'react';
import '../../../assets/styles/games/data-master.css';
import DataBreachChallenge from './DataBreachChallenge';
import EncryptionChallenge from './EncryptionChallenge';
import APISecurityChallenge from './APISecurityChallenge';
import FinalExam from './FinalExam';
import DataMasterFinalModal from './DataMasterFinalModal';
import Quiz from '../../Quiz';
import { useNavigate } from 'react-router-dom';

const DataMaster = () => {
    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [unlockedFinal, setUnlockedFinal] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const levelNumber = 10;
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setError('تۆکنی چوونەژوورەوە نییە');
            navigate('/');
            alert("you need login to access the routes routes")
        }
    }, [token, navigate]);

    // Save score to backend
    const saveScore = async (score) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    level: levelNumber,
                    score: score
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save score');
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving score:', error);
            throw error;
        }
    };

    // Mark level as completed
    const markLevelCompleted = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/progress/${levelNumber}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to mark level as completed');
            }
            return await response.json();
        } catch (error) {
            console.error('Error marking level as completed:', error);
            throw error;
        }
    };

    const completeChallenge = (score) => {
        const newTotalScore = totalScore + score;
        setTotalScore(newTotalScore);

        if (currentChallenge < 4) {
            setCurrentChallenge(current => current + 1);
            if (currentChallenge === 3) {
                setUnlockedFinal(true);
                setShowFinalModal(true)
            }
        }
    };

    const handleFinalExamComplete = async (score) => {
        const newTotalScore = totalScore + score;
        setTotalScore(newTotalScore);
        setShowFinalModal(false)
        setShowQuiz(true);
    };

    const handleQuizComplete = async () => {
        try {
            setError(null);

            // 1. Save score first
            await saveScore();

            // 2. Mark level as completed
            const result = await markLevelCompleted();
            console.log('Completion result:', result);

            // 3. Only navigate if successful
            navigate("/data-master");

        } catch (error) {
            setError(error.message);
            console.error('Completion error:', error);
        }
    };
    if (showQuiz) {
        return (
            <Quiz
                level={levelNumber}
                gameScore={totalScore}
                onComplete={handleQuizComplete}
            />
        );
    }

    return (
        <div className="data-master-container">
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => window.location.reload()}>هەوڵبدەرەوە</button>
                </div>
            )}
            <h2 className="level-title">ئاستی کۆتایی: زانای زانیاری</h2>
            <p className="level-description">
                لەم ئاستەدا تواناکانی پاراستنی زانیاری و سیستەمەکانت پێوانە دەکرێت. ئەم ئاستە تایبەتە بە پاراستنی زانیاری و ناسینەوەی هەڕەشەکانی ئاسایشی سایبەری.
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>١. ناسینەوەی شکاندنی زانیاری</div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>٢. پاراستنی زانیاری</div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>٣. ئاسایشی API</div>
                {unlockedFinal && (
                    <div className={`progress-step ${currentChallenge >= 4 ? 'active' : ''}`}>٤. تاقیکردنەوەی کۆتایی</div>
                )}
            </div>

            {currentChallenge === 1 && (
                <DataBreachChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <EncryptionChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <APISecurityChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 4 && !showQuiz && (
                <FinalExam
                    completeChallenge={handleFinalExamComplete}
                />
            )}

            {showFinalModal && (
                <DataMasterFinalModal
                    score={totalScore}
                    onClose={handleFinalExamComplete}
                />
            )}
        </div>
    );
};

export default DataMaster;
import React, {useEffect, useState} from 'react';
import '../../../assets/styles/games/network-protection.css';
import FirewallChallenge from './FirewallChallenge';
import EncryptionChallenge from './EncryptionChallenge';
import IntrusionDetectionChallenge from './IntrusionDetectionChallenge';
import FinalModal from '../phone-protection/FinalModal.jsx';
import Quiz from "../../Quiz.jsx";
import {useNavigate} from "react-router-dom";

const NetworkProtection = () => {
    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const levelNumber = 8;
    const [error, setError] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    // Verify token on component mount

    useEffect(() => {
        if (!token) {
            setError('تۆکنی چوونەژوورەوە نییە');
            navigate('/');
            alert("you need login to access the routes routes")
        }
    }, [token, navigate]);

    const saveScore = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    level: levelNumber,
                    score: totalScore
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `پاشەکەوتکردنی خاڵ سەرنەکەوت`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving score:', error);
            throw error;
        }
    };

    const markLevelCompleted = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/progress/8`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error:', errorData);
                throw new Error(errorData.error || `تەواوکردنی ئاست سەرنەکەوت`);
            }

            const data = await response.json();
            console.log('Level completion response:', data);
            return data;
        } catch (error) {
            console.error('Error marking level complete:', error);
            throw error;
        }
    };

    const completeChallenge = (score) => {
        setTotalScore(prev => prev + score);
        if (currentChallenge < 3) {
            setCurrentChallenge(prev => prev + 1);
        } else {
            setShowFinalModal(true);
        }
    };

    const handleFinalModalClose = () => {
        setShowFinalModal(false);
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
            navigate("/data-protection");

        } catch (error) {
            setError(error.message);
            console.error('Completion error:', error);
        }
    };

    if (showQuiz) {
        return (
            <Quiz
                level={3}
                gameScore={totalScore}
                onComplete={handleQuizComplete}
            />
        );
    }


    return (
        <div className="level7-container">
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => window.location.reload()}>هەوڵبدەرەوە</button>
                </div>
            )}
            <h2 className="level-title">ئاستی ٨: پاراستنی تۆڕ</h2>
            <p className="level-description">
                لەم ئاستەدا فێری پاراستنی تۆڕی کۆمپیوتەر و مۆبایل دەبیت لە هێرشەکانی ئینتەرنێت و ڕاژەکارە بێ مۆڵەتەکان.
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>١. دیوارە ئاگرین</div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>٢. شێوەزارکردن</div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>٣. دۆزینەوەی هێرش</div>
                <div className={`progress-step ${currentChallenge >= 4 ? 'active' : ''}`}>٤. پشکنینی تۆڕ</div>
            </div>

            {currentChallenge === 1 && (
                <FirewallChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <EncryptionChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <IntrusionDetectionChallenge completeChallenge={completeChallenge} />
            )}

           

            {showFinalModal && (
                <FinalModal
                    score={totalScore}
                    onClose={handleFinalModalClose}
                />
            )}
        </div>
    );
};

export default NetworkProtection;
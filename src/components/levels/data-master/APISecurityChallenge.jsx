// APISecurityChallenge.js
import React, { useState } from 'react';

const APISecurityChallenge = ({ completeChallenge }) => {
    const [code, setCode] = useState(`function getUserData(userId) {
    // API call to get user data
    return fetch('/api/users/' + userId)
        .then(response => response.json());
}`);
    const [fixedCode, setFixedCode] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const vulnerabilities = [
        { id: 1, name: "SQL Injection", fixed: false },
        { id: 2, name: "IDOR (Insecure Direct Object Reference)", fixed: false },
        { id: 3, name: "Missing Authentication", fixed: false },
        { id: 4, name: "Sensitive Data Exposure", fixed: false }
    ];

    const checkCode = () => {
        let newScore = 0;
        let fixed = `function getUserData(userId) {
    // Validate user input
    if (!userId || !/^\\d+$/.test(userId)) {
        throw new Error('Invalid user ID');
    }
    
    // Check if authenticated user has access to this data
    if (!isAuthorized(userId)) {
        throw new Error('Unauthorized');
    }
    
    // API call with parameterized query
    return fetch('/api/users/' + encodeURIComponent(userId), {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Request failed');
        return response.json();
    })
    .then(data => {
        // Remove sensitive data before returning
        const { password, ssn, ...safeData } = data;
        return safeData;
    });
}`;

        // Check if user fixed SQL injection
        if (code.includes("encodeURIComponent") || code.includes("parameter")) {
            vulnerabilities[0].fixed = true;
            newScore += 10;
        }

        // Check if user added authorization
        if (code.includes("Authorization") || code.includes("isAuthorized")) {
            vulnerabilities[1].fixed = true;
            vulnerabilities[2].fixed = true;
            newScore += 20;
        }

        // Check if user filtered sensitive data
        if (code.includes("safeData") || code.includes("remove sensitive")) {
            vulnerabilities[3].fixed = true;
            newScore += 10;
        }

        setFixedCode(fixed);
        setScore(newScore);
        setShowFeedback(true);

        setTimeout(() => completeChallenge(newScore), 3000);
    };

    return (
        <div className="challenge-card">
            <h3>چالاکی ٣: ئاسایشی API</h3>
            <p className="instructions">
                ئەم کۆدە APIیە چەند کێشەیەکی ئاسایشی هەیە. چاکەکانی پێوە بنووسە یان پێناسە بکە:
            </p>

            <div className="code-editor">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={15}
                    spellCheck="false"
                />
            </div>

            <button className="check-button" onClick={checkCode}>
                پشکنینی کۆد
            </button>

            {showFeedback && (
                <div className="feedback">
                    <h4>کێشەکانی ئاسایشی دۆزرانەوە:</h4>
                    <ul>
                        {vulnerabilities.map(vuln => (
                            <li key={vuln.id} className={vuln.fixed ? 'fixed' : 'unfixed'}>
                                {vuln.name} {vuln.fixed ? '✓' : '✗'}
                            </li>
                        ))}
                    </ul>

                    <p>کۆی خاڵەکان: {score} لە ٤٠</p>

                    {score < 30 && (
                        <div className="solution">
                            <h5>نمونەی چارەسەر:</h5>
                            <pre>{fixedCode}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default APISecurityChallenge;
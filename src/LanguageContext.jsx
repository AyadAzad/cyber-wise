import React, {createContext, useState, useContext, useEffect} from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Initialize language from localStorage or default to 'kurdish'
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('appLanguage');
        return savedLanguage || 'kurdish';
    });

    // Save language to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);


    const translations = {
        kurdish: {
            // About Component
            aboutTitle: "دەربارەی سایبێر وایز",
            aboutSubtitle: "زانیاری دەربارەی پرۆژەی سایبێر وایز و ئامانجەکانی",
            whyTitle: "بۆچی سایبێر وایز؟",
            whyContent: "سایبێر وایز یاریەکە کە لەسەر بنەمای فێربوون بە یاریکردن دروستکراوە. ئامانجی ئەم یاریە ئەوەیە کە هەموو کەسێک بتوانێت بە شێوەیەکی ئاسان و خۆش، فێری بنەماکانی سایبەر سکیوریتی ببێت.",
            goalTitle: "ئامانجی ئێمە",
            goalContent: "ئامانجی ئێمە پێشکەشکردنی ئامرازێکی سەردەمیانەیە بۆ فێربوونی پاراستنی سایبەری بە زمانی کوردی، بۆ ئەوەی هەموو گەنج و پێگەیشتووی کورد بتوانن زانیاری پێویست وەربگرن بۆ پاراستنی خۆیان لە مەترسیەکانی سایبەر.",
            teamTitle: "تیمی کار",
            teamContent: "سایبێر وایز لەلایەن ٢ خوێنکاری زانکۆی کۆمار دروستکراوە، ئامانجمان ئەوەیە کە بەرهەمێک پێشکەش بکەین کە هەم پەروەردەییە و هەمیش ڕاکێش و خۆشە بۆ بەکارهێنان.",
            contactBtn: "پەیوەندیمان پێوە بکە",

            // login
            email: "ئیمەیڵ",
            password: "وشەی نهێنی",
            emailPlaceholder: "ئیمەیڵەکەت بنووسە",
            passwordPlaceholder: "وشەی نهێنی",
            rememberMe: "بمهێڵەرەوە",
            or: "یان",
            forgotPassword: "وشەی نهێنیت لەبیرکردووە؟",
            newRegistration: "خۆتۆمارکردنی نوێ",
            pleaseEnterName: "تکایە ناو بنووسە",
            pleaseEnterEmail: "تکایە ئیمەیڵ بنووسە",
            invalidEmail: "ئیمەیڵەکە دروست نییە",
            pleaseEnterPassword: "تکایە وشەی نهێنی بنووسە",
            passwordMinLength: "وشەی نهێنی دەبێت کەمتر نەبێت لە ٨ پیت",
            passwordsDontMatch: "وشەی نهێنیەکان یەکسان نین",
            confirmPassword: "دڵنیاکردنەوەی وشەی نهێنی",
            name: "ناو",
            fullName: "ناوی تەواو",
            loading: "لە پڕۆسەی دادەمەزرێ...",
            alreadyHaveAccount: "ئایا پێشتر هەژمارت هەیە؟",
            loginFailed: "چوونەژوورە سەرکەوتوو نەبوو",
            signupFailed: "خۆتۆمارکردن سەرکەوتوو نەبوو",
            signupError: "هەڵەیەک ڕوویدا لەکاتی خۆتۆمارکردن",
            // Contact Component
            contactTitle: "پەیوەندیمان پێوە بکە",
            contactSubtitle: "بۆ هەر پرسیار و پێشنیارێک دەتوانیت پەیوەندیمان پێوە بکەیت",
            emailTitle: "ئیمەیڵ",
            phoneTitle: "ژمارەی تەلەفۆن",
            addressTitle: "ناونیشان",
            socialMediaTitle: "سۆشیال میدیا",
            formName: "ناو",
            formEmail: "ئیمەیڵ",
            formSubject: "بابەت",
            formMessage: "نامە",
            formSubmit: "ناردن",
            yourEmail: "ئیمەیڵەکەت",
            yourSubject: "بابەتی پەیوەندی",
            writeYourMessage: "نامەکەت بنووسە",

            // Footer Component
            footerText: "سایبێر وایز - یاری فێربوونی سایبەر سکیوریتی بە زمانی کوردی",
            homeLink: "سەرەتا",
            gamesLink: "یاریەکان",
            pointsLink: "خاڵی کویزەکان",
            aboutLink: "دەربارەی",
            contactLink: "پەیوەندی",
            copyright: "© ڕێژوان و محەمەد، زانکۆی کۆمار بۆ زانست و تەکنەلۆجیا",

            // GameChapters Component
            chaptersTitle: "بەشەکانی یاری",
            currentLevel: "ئاستی ئێستا ",
            chapter1: "بەشی یەکەم",
            chapter1Sub: "بنەماکانی سایبەر سکیوریتی",
            chapter2: "بەشی دووەم",
            chapter2Sub: "بەرگری کردن لە فێڵ و ساختەکاری",
            chapter3: "بەشی سێیەم",
            chapter3Sub: "پاراستنی ئامێرەکان",
            chapter4: "بەشی چوارەم",
            chapter4Sub: "پاراستنی بەکارهێنی ئینتەرنێت",
            chapter5: "بەشی پێنجەم",
            chapter5Sub: "مامۆستای سایبەر سکیوریتی",
            passwordMasterTitle: "مامۆستای پاسوۆرد",
            passwordDesc: "فێربە چۆن پاسوۆردی بەهێز دروست بکەیت و بیپارێزیت",
            socialMedia: "پاراستنی سۆشیال میدیا",
            socialMediaDesc: "فێربە چۆن هەژمارەکانی سۆشیال میدیات بپارێزیت",
            phishing: "بەرگری لە فیشینگ",
            phishingDesc: "فێربە چۆن ئیمەیڵە فیشینگەکان بناسیتەوە",
            fraud: "ڕێگری لە فرتوفێڵ",
            fraudDesc: "فێربە چۆن فرتوفێڵە ئۆنلاینەکان بناسیتەوە",
            mobile: "پاراستنی مۆبایل",
            mobileDesc: "فێربە چۆن ئامێری مۆبایلەکەت بپارێزیت",
            computer: "پاراستنی کۆمپیوتەر",
            computerDesc: "فێربە چۆن کۆمپیوتەرەکەت بپارێزیت",
            browsing: "گەڕانی سەلامەت",
            browsingDesc: "فێربە چۆن بە سەلامەتی لە ئینتەرنێت بگەڕێیت",
            network: "پاراستنی تۆڕ",
            networkDesc: "فێربە چۆن تۆڕی نێوماڵەکەت بپارێزیت",
            data: "پاراستنی داتا",
            dataDesc: "فێربە چۆن زانیاریە گرنگەکانت بپارێزیت",
            master: "مامۆستای پاراستن",
            masterDesc: "کۆتا ئاستی یاری کە تۆ دەبیتە پسپۆڕی سایبەر سکیوریتی",
            ranks: {
                beginner: "نوێکار",
                intermediate: "ناوەند",
                advanced: "پێشکەوتوو",
                expert: "پیشەساز"
            },

            // QuizPoints Component
            pointsTitle: "خاڵی کویزەکان",
            pointsSubtitle: "کویزەکان تاقی بکەرەوە و خاڵ بەدەست بهێنە",
            gamePoints: "خاڵی یاری",
            totalPoints: "کۆی خاڵەکان",
            rank: "پلەبەندی",
            beginner: "نوێکار",
            intermediate: "ناوەند",
            advanced: "پێشکەوتوو",
            expert: "پیشەساز",
            completed: "تەواوکراوەکان",
            level: "ئاست",
            startGame: "دەستپێکردنی یاری",

            // Navigation
            logout: "چوونەدەرەوە",
            login: "چوونەژوورەوە",
            register: "تۆمارکردن",
            profile: "پڕۆفایل",
            language: "زمان",
            kurdish: "کوردی",
            english: "ئینگلیزی",
            cyber: "سایبێر",
            wise: "وایز",
            heroSubTitle: "بە شێوەیەکی چالاک فێری پاراستنی خۆت ببە لە دونیای سایبەر! یاریەک کە فێرت دەکات چۆن بەرگری لە دەیتاکانت بکەیت و بە شێوەیەکی سەلامەت لە ئینتەرنێت بگەڕێیت.",

            // Password Master Game
            passwordMaster: {
                title: "یاری مامۆستای پاسۆرد",
                score: "هەژمار:",
                protect: "پاراستنی",
                enterPassword: "تێپەڕەوشە بنووسە...",
                strength: "بەهێزی:",
                encrypt: "پاراستن",
                securityStatus: "دۆخی پاراستن",
                missionAccomplished: "ئەرک تەواو بوو!",
                allSecure: "هەموو سیستەمەکان پاراستن کراون!",
                finalScore: "هەژماری کۆتایی:",
                newMission: "ئەرکی نوێ",
                weak: "لاواز",
                medium: "مامناوەند",
                strong: "بەهێز",
                hackerAttack: "هێرشبەرەکە {pc}ی پاراستنی کرد! {strength} تێپەڕەوشە ناتوانێت پاراستن بکات.",
                strongPasswordSet: "تێپەڕەوشەی بەهێز دانرا! هێرشبەر ناتوانێت هێرش بکاتە سەر.",
                startTest: "دەستپێکردنی تێست",
                level: "ئاست"
            }
        },
        english: {
            // About Component
            aboutTitle: "About Cyber Wise",
            aboutSubtitle: "Information about Cyber Wise project and its goals",
            whyTitle: "Why Cyber Wise?",
            whyContent: "Cyber Wise is a game based on learning through play. The goal of this game is to make learning cyber security fundamentals easy and enjoyable for everyone.",
            goalTitle: "Our Goal",
            goalContent: "Our goal is to provide a modern educational tool for learning cyber security in Kurdish, enabling all Kurdish youth and adults to acquire necessary knowledge for protecting themselves against cyber threats.",
            teamTitle: "Our Team",
            teamContent: "Cyber Wise was created by 2 students from Komar University, with the aim of delivering an educational product that is both informative and engaging to use.",
            contactBtn: "Contact Us",

            // Contact Component
            contactTitle: "Contact Us",
            contactSubtitle: "Feel free to reach out for any questions or suggestions",
            emailTitle: "Email",
            phoneTitle: "Phone",
            addressTitle: "Address",
            socialMediaTitle: "Social Media",
            formName: "Name",
            formEmail: "Email",
            formSubject: "Subject",
            formMessage: "Message",
            formSubmit: "Submit",
            fullName: "Your Full Name",
            yourEmail: "Your Email",
            yourSubject: "Your Subject",
            writeYourMessage: "Your Message...",

            // modal
            email: "Email",
            password: "Password",
            emailPlaceholder: "Enter your email",
            passwordPlaceholder: "Password",
            rememberMe: "Remember me",
            or: "OR",
            forgotPassword: "Forgot your password?",
            newRegistration: "New registration",
            pleaseEnterName: "Please enter your name",
            pleaseEnterEmail: "Please enter your email",
            invalidEmail: "Invalid email format",
            pleaseEnterPassword: "Please enter password",
            passwordMinLength: "Password must be at least 8 characters",
            passwordsDontMatch: "Passwords don't match",
            confirmPassword: "Confirm Password",
            name: "Name",
            loading: "Loading...",
            alreadyHaveAccount: "Already have an account?",
            loginFailed: "Login failed",
            signupFailed: "Signup failed",
            signupError: "An error occurred during registration",

            // Footer Component
            footerText: "Cyber Wise - Kurdish language cyber security learning game",
            homeLink: "Home",
            gamesLink: "Games",
            pointsLink: "Quiz Points",
            aboutLink: "About",
            contactLink: "Contact",
            copyright: "© Rezhwan & Muhamad, Komar University of Science and Technology",

            // GameChapters Component
            chaptersTitle: "Game Chapters",
            currentLevel: "Currently at level {level}",
            chapter1: "Chapter 1",
            chapter1Sub: "Cyber Security Fundamentals",
            chapter2: "Chapter 2",
            chapter2Sub: "Defense Against Scams and Fraud",
            chapter3: "Chapter 3",
            chapter3Sub: "Device Protection",
            chapter4: "Chapter 4",
            chapter4Sub: "Safe Internet Usage",
            chapter5: "Chapter 5",
            chapter5Sub: "Cyber Security Master",
            passwordMasterGame: "Password Master",
            passwordDesc: "Learn how to create and protect strong passwords",
            socialMedia: "Social Media Protection",
            socialMediaDesc: "Learn how to secure your social media accounts",
            phishing: "Phishing Defense",
            phishingDesc: "Learn how to identify phishing emails",
            fraud: "Fraud Prevention",
            fraudDesc: "Learn how to recognize online scams",
            mobile: "Mobile Protection",
            mobileDesc: "Learn how to secure your mobile device",
            computer: "Computer Protection",
            computerDesc: "Learn how to secure your computer",
            browsing: "Safe Browsing",
            browsingDesc: "Learn how to browse the internet safely",
            network: "Network Protection",
            networkDesc: "Learn how to secure your home network",
            data: "Data Protection",
            dataDesc: "Learn how to protect your important information",
            master: "Protection Master",
            masterDesc: "Final level where you become a cyber security expert",
            ranks: {
                beginner: "Beginner",
                intermediate: "Intermediate",
                advanced: "Advanced",
                expert: "Expert"
            },

            // QuizPoints Component
            pointsTitle: "Quiz Points",
            pointsSubtitle: "Take quizzes and earn points",
            gamePoints: "Game Points",
            totalPoints: "Total Points",
            rank: "Rank",
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
            expert: "Expert",
            completed: "Completed",
            level: "level",
            startGame: "Start Game",

            // Navigation
            logout: "Logout",
            login: "Login",
            register: "Register",
            profile: "Profile",
            language: "Language",
            kurdish: "Kurdish",
            english: "English",
            cyber: "Cyber",
            wise: "Wise",
            heroSubTitle: "Learn how to protect yourself in the cyber world. It's a game that teaches you how to protect your data and browse the internet safely.",

            // Password Master Game
            passwordMaster: {
                title: "Password Master Game",
                score: "Score:",
                protect: "Protect",
                enterPassword: "Enter password...",
                strength: "Strength:",
                encrypt: "Encrypt",
                securityStatus: "Security Status",
                missionAccomplished: "Mission Accomplished!",
                allSecure: "All systems are secure!",
                finalScore: "Final Score:",
                newMission: "New Mission",
                weak: "Weak",
                medium: "Medium",
                strong: "Strong",
                hackerAttack: "The hacker compromised {pc}! {strength} password cannot protect it.",
                strongPasswordSet: "Strong password set! Hacker cannot attack.",
                startTest: "Start Test",
                level: "Level"
            }
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
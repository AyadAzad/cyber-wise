import React, { useState, useEffect } from 'react';

const Quiz = ({ level, gameScore, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Kurdish translations
    const translations = {
        quizTitle: "تێستکردن",
        question: "پرسیار",
        of: "لە",
        submit: "ناردن",
        next: "دواتر",
        results: "ئەنجامەکان",
        correct: "وەڵامی ڕاست",
        wrong: "وەڵامی هەڵە",
        yourScore: "هەژماری تۆ",
        continue: "بەردەوامبوون"
    };

    // Quiz questions for each level (in Kurdish)
    const levelQuestions = {
        1: [
            {
                question: "پاسۆردێکی بەهێز پێویستی بە چیە؟",
                options: [
                    "تەنها ژمارە",
                    "تەنها پیتی بچووک",
                    "تەواویان",
                    "هیچ کام"
                ],
                correctAnswer: 2
            },
            {
                question: "کام لەم پاسۆردانە بەهێزە؟",
                options: [
                    "123456",
                    "password",
                    "S3cur3P@ss",
                    "hello123"
                ],
                correctAnswer: 2
            }
        ],
        2: [
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی تایبەتمەندی لە سۆشیال میدیا؟",
                options: [
                    "هاوبەشی کردنی هەموو زانیارییە کەسییەکان",
                    "ڕێگەدان بە هەموو کەسێک بۆ بینینی پۆستەکان",
                    "بەکارهێنانی پاراستنی دوو هەنگاوە و چێککردنەوەی ڕێگەدانەکان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            },
            {
                question: "کاتێک لینکێکی نەناسراو وەردەگریت لە سۆشیال میدیا، پێویستە چی بکەیت؟",
                options: [
                    "کرتە لەسەر بکە بۆ بینینی",
                    "بیخەرە سەر گەڕان و لێکۆڵینەوە لێی پێش کرتەکردن",
                    "هاوبەشی بکە لەگەڵ هاوڕێکانت",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم ڕەفتارانە مەترسیدارە لە سۆشیال میدیا؟",
                options: [
                    "وێنەی پاسپۆرت و بڕوانامە هاوبەشکردن",
                    "پۆستکردنی شوێنی نیشتەجێبوون",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            },
            {
                question: "پاراستنی دوو هەنگاوە (2FA) چییە؟",
                options: [
                    "تەنها پاسۆردێکی بەهێز",
                    "پاسۆرد و کۆدی تایبەت کە بۆ ماوەیەکی کەم دەمێنێتەوە",
                    "پاسۆرد و ناسنامەی بینراو",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            }
        ],
        3: [
            {
                question: "کام لەم ئیمێیلانە زۆرترین مەترسی فیشینگ هەیە؟",
                options: [
                    "ئیمێیلێکی بانکی کە دەڵێت حسابەکەت قەدەغەکراوە و دەبێت خێرا چاکی بکەیتەوە",
                    "ئیمێیلێکی فەرمی لە کۆمپانیایەکی ناسراو بە زمانی پێشکەشکردن",
                    "ئیمێیلێکی کەسی لە هاوڕێیەکی نزیک",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 0
            },
            {
                question: "کاتێک ئیمێیلێک دەگات کە دەڵێت خەڵاتێکت بردووەتەوە، پێویستە چی بکەیت؟",
                options: [
                    "کرتە لەسەر لینکەکە بکە بۆ وەرگرتنی خەڵاتەکە",
                    "ئیمێیلەکە بسڕەوە و پەیوەندی بە خزمەتگوزاری کاستەمەرەوە بکە",
                    "ئیمێیلەکە بڵاو بکەرەوە لەسەر تویتەر",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم نیشانانە ئیمێیلێکی فیشینگ دەناسێنێتەوە؟",
                options: [
                    "ناوی نەناسراو یان هەڵەی ڕێنووسی لە ناونیشانی ئیمێیل",
                    "فەرمانێکی خێرا یان هەڕەشەی قەدەغەکردن",
                    "لینکێکی درۆین یان پەڕەیەکی نەناسراو",
                    "هەموویان"
                ],
                correctAnswer: 3
            },
            {
                question: "ئەگەر لینکێکی ساختە کرتە لەسەر بکەیت، پێویستە یەکسەر چی بکەیت؟",
                options: [
                    "هیچی، هیچ کێشەیەک نییە",
                    "پاسۆردەکانت بگۆڕە و ڕاپۆرت بکە بە بەڕێوەبەری تەکنیکی",
                    "تەنها پاسۆردی ئیمێیلەکەت بگۆڕە",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە باشترین ڕێگایە بۆ ناسینەوەی لینکی ساختە؟",
                options: [
                    "بینینی ناونیشانی URL پێش کرتەکردن",
                    "بینینی ڕەنگ و دیزاینی پەڕەکە",
                    "پشت بەستن بە ناونیشانی ئیمێیلەکە",
                    "بینینی نیشانەی قەڵەوقە"
                ],
                correctAnswer: 0
            },
            {
                question: "کاتێک پەیامێک دەگات کە دەڵێت ژمارەی مۆبایلەکەت بگۆڕە بۆ وەرگرتنی خەڵات، پێویستە:",
                options: [
                    "ژمارەکەت بنێرە فەورا",
                    "پەیامەکە بسڕەوە و ڕاپۆرت بکە بە وەسڵی فەرمی",
                    "پەیامەکە بڵاو بکەرەوە بۆ هاوڕێکانت",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            }
        ],
        4: [
            {
                question: "کاتێک پەیوەندییەک دەگات کە دەڵێت لە بانکەکەتە و دەتەوێت زانیاری کەسی بخوازێت، پێویستە:",
                options: [
                    "زانیاریەکە بدەیتە پێیان چونکە لە بانکەکەتە",
                    "پەیوەندییەکە بسڕیتەوە و بە بانکەکەتەوە بگەڕێیت بە ژمارەی فەرمی",
                    "ژمارەکارتەکەت بدەیتە پێیان بۆ پشتڕاستکردنەوە",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم پەیوەندییانە زۆرترین مەترسی فێڵی سەمەرەی هەیە؟",
                options: [
                    "پەیوەندی لە کەسێک کە دەڵێت لە خزمەتگوزارییەکەتە و دەتەوێت زانیاری کەسی بخوازێت",
                    "پەیامێک کە دەڵێت براوەی خەڵات بوویتە و دەبێت پارەی ناردن بدەیت",
                    "پەیوەندییەک کە دەڵێت ژمارەی مۆبایلەکەت بگۆڕیت بۆ وەرگرتنی خەڵات",
                    "هەموویان"
                ],
                correctAnswer: 3
            },
            {
                question: "کاتێک پەیامێک دەگات کە دەڵێت ژمارەی مۆبایلەکەت بگۆڕە بۆ وەرگرتنی خەڵات، پێویستە:",
                options: [
                    "ژمارەکەت بنێرە فەورا",
                    "پەیامەکە بسڕەوە و ڕاپۆرت بکە بە وەسڵی فەرمی",
                    "پەیامەکە بڵاو بکەرەوە بۆ هاوڕێکانت",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە نیشانەی پەیوەندییەکی سەمەرەیە؟",
                options: [
                    "فەرمانێکی خێرا یان هەڕەشە",
                    "داوای زانیاری کەسی یان دارایی",
                    "داوای پارەی ناردن بۆ وەرگرتنی خەڵات",
                    "هەموویان"
                ],
                correctAnswer: 3
            },
            {
                question: "ئەگەر گومانت هەیە کە پەیوەندییەکی سەمەرەت کردووە، پێویستە چی بکەیت؟",
                options: [
                    "هیچی، بەردەوام بە لە ژیانت",
                    "پەیوەندی بە پۆلیس یان دەزگای تایبەت بکە",
                    "تەنها بە هاوڕێکانت بڵێ",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم ڕەفتارانە پاراستنی باشە لە بەرامبەر فێڵی سەمەرە؟",
                options: [
                    "نەدانی ژمارەی کارتی بانکی لە پەیوەندییەکی نەناسراو",
                    "پشتڕاستکردنەوەی پەیوەندییەکان لە ڕێگەی کەناڵی فەرمی",
                    "نەگەڕان بە دوای خەڵاتی ساختە",
                    "هەموویان"
                ],
                correctAnswer: 3
            }
        ],
        5: [
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی مۆبایل لە ڤایرۆس؟",
                options: [
                    "کردنەوەی هەموو لینکەکان",
                    "دامەزراندنی بەرنامەی پاراستن لە ڤایرۆس",
                    "پشتگوێخستنی نوێکردنەوەی سیستەم",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کاتێک ئەپێکی نەناسراوی دامەزرێنیت، پێویستە:",
                options: [
                    "هەموو مۆڵەتەکانی داوا بکەیت",
                    "تەنها مۆڵەتە پێویستەکان بدەیت",
                    "هیچ مۆڵەتێک نەدەیت",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە نیشانەی ئەپێکی ناسەلامەتە؟",
                options: [
                    "خواستنی مۆڵەتی زۆر بێ پێویست",
                    "خواستنی زانیاری کەسی بێ پێویست",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            },
            {
                question: "پاراستنی تۆڕی WiFi چییە؟",
                options: [
                    "پەیوەندی کردنی بە هەر تۆرێکەوە",
                    "بەکارهێنانی تۆری ئینکریپتکراو و VPN",
                    "کردنەوەی بلوتوس بەردەوام",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کاتێک مۆبایلەکەت لەدەست دەدەیت، پێویستە:",
                options: [
                    "هیچی نەکەیت",
                    "پەیوەندی بە خزمەتگوزاری تەلەفۆنەکەوە بکە بۆ قەدەغەکردنی",
                    "چاوەڕوانی ئەوە بکەیت کە کەسێک بیگەڕێنێتەوە",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە ڕێگایەکی باشە بۆ پاراستنی زانیاری لە مۆبایل؟",
                options: [
                    "هەڵگرتنی هەموو زانیاریەکان لەسەر مۆبایل",
                    "بەکارهێنانی پاراستنی دوو هەنگاوە",
                    "کردنەوەی هەموو پەیامە نەناسراوەکان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            }
        ],
        6: [
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی کۆمپیوتەر لە ڤایرۆس؟",
                options: [
                    "دامەزراندنی بەرنامەی پاراستن لە ڤایرۆس",
                    "کردنەوەی هەموو پەیامە ئەلیکترۆنییەکان",
                    "پشتگوێخستنی نوێکردنەوەی سیستەم",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 0
            },
            {
                question: "دیواری ئاگرین (Firewall) چی کاری دەکات؟",
                options: [
                    "پاراستنی کۆمپیوتەر لە هێرشەکانی دەرەوە",
                    "پاراستنی کۆمپیوتەر لە گەرمبوون",
                    "پاراستنی کۆمپیوتەر لە باران",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 0
            },
            {
                question: "کاتێک فایڵێکی نەناسراوی داگریت، پێویستە:",
                options: [
                    "یەکسەر بیخەرەوە",
                    "پشکنینی بکە بە بەرنامەی پاراستن لە ڤایرۆس",
                    "بیبەخشە بۆ هاوڕێکانت",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە نیشانەی کۆمپیوتەرێکی ڤایرۆسکراوە؟",
                options: [
                    "کارکردنی هێواش",
                    "بڵاوکردنەوەی فایڵ بە شێوەیەکی خۆکار",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            },
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی کۆمپیوتەر؟",
                options: [
                    "نوێکردنەوەی بەردەوامی سیستەم",
                    "بەکارهێنانی پاسۆردێکی بەهێز",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            },
            {
                question: "ئەگەر گومانت هەیە کۆمپیوتەرەکەت ڤایرۆسکراوە، پێویستە:",
                options: [
                    "هیچی نەکەیت",
                    "پشکنینی بکە بە بەرنامەی پاراستن لە ڤایرۆس",
                    "کۆمپیوتەرەکە بسوتێنە",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            }
        ],
        7: [
            {
                question: "کام لەمە باشترین ڕێگایە بۆ گەڕان بە سەلامەتی لە ئینتەرنێت؟",
                options: [
                    "کرتەکردن لەسەر هەر لینکێک",
                    "بینینی ناونیشانی URL پێش کرتەکردن",
                    "کردنەوەی هەموو پەیامە نەناسراوەکان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم مووتۆرە گەڕانانە سەلامەتترە؟",
                options: [
                    "مووتۆری گەڕانی نەناسراو",
                    "Google یان Bing",
                    "هەموویان یەکسانن",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە نیشانەی پەڕەیەکی ساختەیە؟",
                options: [
                    "ناونیشانی URL هەڵە",
                    "دیزاینی زۆر خراپ",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 0
            },
            {
                question: "کاتێک لە کافێت یان شوێنی گشتی ئینتەرنێت بەکاردەهێنیت، پێویستە:",
                options: [
                    "هیچی نەکەیت",
                    "لە تۆری VPN بکەیتەوە",
                    "هەموو زانیاریە کەسیەکانت بنوسیتەوە",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە ڕێگایەکی باشە بۆ پاراستنی نهێنی لەسەر ئینتەرنێت؟",
                options: [
                    "بەکارهێنانی هەموو تۆڕە کۆمەڵایەتییەکان",
                    "بەکارهێنانی پاسۆردێکی هەمان بۆ هەموو خزمەتگوزارییەکان",
                    "بەکارهێنانی پاراستنی دوو هەنگاوە",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            },
            {
                question: "کاتێک لەسەر ئینتەرنێت زانیاری کەسی دەنێریت، پێویستە:",
                options: [
                    "دڵنیابیتەوە کە پەڕەکە سەلامەتە",
                    "هەر زانیاریەک بدەیتەوە",
                    "هیچ زانیاریەک مەدە",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 0
            }
        ],
        8: [
            {
                question: "دیواری ئاگرین (Firewall) چییە؟",
                options: [
                    "سیستەمێکە کە پاراستن لە هێرشەکانی تۆڕ دەکات",
                    "ئامرازێکە بۆ پاراستنی کۆمپیوتەر لە گەرمبوون",
                    "بەرنامەیەکە بۆ خاوکردنەوەی فایڵەکان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 0
            },
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی تۆڕی WiFi ماڵەوە؟",
                options: [
                    "بەکارهێنانی پاسۆردێکی بەهێز و شێوەزاری WPA2",
                    "کردنەوەی تۆڕەکە بەبێ پاسۆرد",
                    "بەکارهێنانی هەمان پاسۆرد بۆ هەموو کەس",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 0
            },
            {
                question: "VPN چی کاری دەکات؟",
                options: [
                    "پەیوەندی ئینتەرنێتی سەلامەت و نهێنی دروست دەکات",
                    "خێرایی ئینتەرنێت زیاد دەکات",
                    "هیچ کام لەمە",
                    "هەموویان"
                ],
                correctAnswer: 0
            },
            {
                question: "کام لەمە نیشانەی هێرشێکی تۆڕە؟",
                options: [
                    "کۆمپیوتەر کاردەکات بە شێوەیەکی نائاسایی",
                    "بەکارهێنانی پەیوەندی ئینتەرنێت زۆر زیاد دەبێت",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            },
            {
                question: "کاتێک پەیوەندی بە تۆری WiFi گشتی دەکەیت، پێویستە:",
                options: [
                    "هیچی نەکەیت",
                    "لە VPN بکەیتەوە",
                    "کارە بانکییەکانت ئەنجام بدەیت",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی تۆڕ؟",
                options: [
                    "نوێکردنەوەی بەردەوامی ڕاوتر و ئامێرەکان",
                    "بەکارهێنانی پاسۆردێکی بەهێز",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            }
        ],
        9: [
            {
                question: "کەمکردنەوەی زانیاری (Data Minimization) چییە؟",
                options: [
                    "کۆکردنەوەی هەموو زانیاریەکان",
                    "تەنها کۆکردنەوەی زانیاری پێویست",
                    "هاوبەشکردنی هەموو زانیاریەکان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کۆنترۆلی دەستگەیشتن چییە؟",
                options: [
                    "دیاریکردنی ئەو کەسانەی کە دەتوانن بە زانیاریەکان دەست بگەن",
                    "کردنەوەی هەموو زانیاریەکان بۆ هەموو کەس",
                    "هیچ کام لەمە",
                    "هەموویان"
                ],
                correctAnswer: 0
            },
            {
                question: "پاراستنی ماوەی زانیاری چییە؟",
                options: [
                    "هەڵگرتنی زانیاری بۆ ماوەیەکی نادیار",
                    "سڕینەوەی زانیاری کاتێک پێویست نییە",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە ڕێگایەکی باشە بۆ هاوبەشی سەلامەتی زانیاری؟",
                options: [
                    "ناردنی زانیاری بە ئیمێلی سادە",
                    "بەکارهێنانی شێوەزارکردن و کانگای سەلامەت",
                    "هاوبەشکردنی لەسەر تۆڕی کۆمەڵایەتی",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 1
            },
            {
                question: "کاتێک زانیاریەکی حیسابدارانە هاوبەش دەکەیت، پێویستە:",
                options: [
                    "دڵنیابیتەوە کە تەنها کەسە پێویستەکان دەستکەوێت",
                    "بڵاوی بکەیتەوە بۆ هەموو کەس",
                    "هیچی نەکەیت",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 0
            },
            {
                question: "کام لەمە نیشانەی شکاندنی زانیارییە؟",
                options: [
                    "ئیمێلێکی نەناسراو دەگات کە داوای زانیاری دەکات",
                    "کەسێکی نەناسراو دەتوانێت بە زانیاریەکان دەست بگات",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                correctAnswer: 2
            }
        ],
    };
    const questions = levelQuestions[level] || [];
    const totalQuestions = questions.length;

    const handleAnswer = (selectedAnswer) => {
        const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
        const newScore = isCorrect ? score + 1 : score;
        const newAnswers = [...answers, isCorrect];

        setScore(newScore);
        setAnswers(newAnswers);

        // Check if this was the last question
        if (currentQuestionIndex >= totalQuestions - 1) {
            setShowResults(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    level,
                    score: score + gameScore,
                    correct_answers: score,
                    total_questions: totalQuestions,
                    mark_level_completed: true
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save quiz results');
            }

            const data = await response.json();
            console.log("Quiz saved successfully", data);
            onComplete();
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('هەڵە ڕوویدا لە ناردنی تێستەکە');
        }
    };

    // Debug effect to log state changes
    useEffect(() => {
        console.log('Current state:', {
            currentQuestionIndex,
            score,
            answers,
            showResults,
            totalQuestions
        });
    }, [currentQuestionIndex, score, answers, showResults]);

    if (questions.length === 0) {
        return (
            <div className="quiz-container" dir="rtl">
                <h2>هیچ پرسیارێک بۆ ئەم ئاستە دیاری نەکراوە</h2>
                <button onClick={onComplete} className="quiz-submit">
                    {translations.continue}
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container" dir="rtl">
            <h2>{translations.quizTitle} - ئاست {level}</h2>

            {!showResults ? (
                <div className="question-container">
                    <h3>{translations.question} {currentQuestionIndex + 1} {translations.of} {totalQuestions}</h3>
                    <p>{questions[currentQuestionIndex].question}</p>
                    <div className="options">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className="quiz-option"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="results-container">
                    <h3>{translations.results}</h3>
                    <p>{translations.yourScore}: {score} / {totalQuestions}</p>

                    <div className="answers-review">
                        {questions.map((q, index) => (
                            <div key={index} className={`answer ${answers[index] ? 'correct' : 'wrong'}`}>
                                <p>{q.question}</p>
                                <span>
                                    {answers[index] ? translations.correct : translations.wrong}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleSubmit} className="quiz-submit">
                        {translations.continue}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
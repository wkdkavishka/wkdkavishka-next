'use client';

import { useState, useEffect, useRef } from 'react';

type Question = {
    question: string;
    marking_polarity: boolean;
};

export default function Page() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [interpretation, setInterpretation] = useState('');
    const [sliderValue, setSliderValue] = useState(4);
    const [isLoading, setIsLoading] = useState(true);
    const resultRef = useRef<HTMLDivElement>(null);

    const questions: Question[] = [
        { question: 'My thoughts race through my mind.', marking_polarity: true },
        { question: 'I find it hard to mentally relax.', marking_polarity: true },
        { question: "My mind feels constantly 'busy'.", marking_polarity: true },
        {
            question: 'I have difficulty stopping my thoughts when I want to sleep.',
            marking_polarity: true,
        },
        { question: 'I feel an inner urge to keep myself occupied.', marking_polarity: true },
        { question: 'I feel restless even when sitting quietly.', marking_polarity: true },
        {
            question: 'My attention easily drifts away during conversations.',
            marking_polarity: true,
        },
        {
            question: 'I find it difficult to concentrate on what someone is saying.',
            marking_polarity: true,
        },
        { question: 'I often lose track of my thoughts mid-task.', marking_polarity: true },
        { question: 'I feel mentally disorganized.', marking_polarity: true },
        { question: 'I jump quickly from one thought to another.', marking_polarity: true },
        {
            question: 'I struggle to keep my attention steady on one thing.',
            marking_polarity: true,
        },
        {
            question: "I often think about unrelated things when I'm supposed to be focused.",
            marking_polarity: true,
        },
        {
            question: 'I tend to act on ideas before fully thinking them through.',
            marking_polarity: true,
        },
        { question: 'I get mentally impatient if things move too slowly.', marking_polarity: true },
        {
            question: 'I feel a strong need to be mentally stimulated all the time.',
            marking_polarity: true,
        },
        {
            question: 'I notice my thoughts interfere with getting things done.',
            marking_polarity: true,
        },
        { question: 'I have difficulty putting worries or ideas aside.', marking_polarity: true },
        { question: 'My thoughts often make me feel unsettled.', marking_polarity: true },
        { question: 'I feel mentally impulsive.', marking_polarity: true },
        { question: "My mind feels 'scattered' or hard to organize.", marking_polarity: true },
        // Reverse-scored items (higher = less restlessness)
        { question: 'I am organized.', marking_polarity: false },
        { question: 'I feel mentally calm.', marking_polarity: false },
        { question: 'I can focus well on tasks.', marking_polarity: false },
    ];

    const scaleLabels = [
        'Not at all true',
        'Mostly not true',
        'Slightly not true',
        'Neutral',
        'Slightly true',
        'Mostly true',
        'Very true',
    ];

    // Initialize answers array
    useEffect(() => {
        setAnswers(new Array(questions.length).fill(null));
        setIsLoading(false);
    }, []);

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = value;
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSliderValue(newAnswers[currentQuestion + 1] ?? 4);
        } else {
            calculateScore(newAnswers);
            setShowResult(true);
            // Scroll to results
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const calculateScore = (answers: number[]) => {
        let total = 0;

        questions.forEach((question, index) => {
            const response = answers[index];
            if (response !== null) {
                total += question.marking_polarity ? response : 8 - response; // Reverse score for certain questions
            }
        });

        setScore(total);

        // Set interpretation based on score
        if (total < 40) {
            setInterpretation(
                'Very low inner restlessness. This is unusually low and may indicate high levels of mental calmness.'
            );
        } else if (total < 70) {
            setInterpretation(
                'Low to moderate inner restlessness. Typical for neurotypical adults.'
            );
        } else if (total < 90) {
            setInterpretation(
                'Moderate inner restlessness. May indicate subclinical levels of restlessness or mild ADHD traits.'
            );
        } else if (total < 110) {
            setInterpretation('High inner restlessness. Typical for adults with ADHD.');
        } else {
            setInterpretation(
                'Very high inner restlessness. Commonly seen in individuals with significant ADHD symptoms.'
            );
        }
    };

    const handleNext = () => {
        handleAnswer(sliderValue);
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSliderValue(answers[currentQuestion - 1] ?? 4);
        }
    };

    const resetAssessment = () => {
        setCurrentQuestion(0);
        setAnswers(new Array(questions.length).fill(null));
        setShowResult(false);
        setScore(0);
        setSliderValue(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
    const percentage = score > 0 ? Math.round(((score - 24) / (168 - 24)) * 100) : 0;

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-600">Loading assessment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-20">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-gray-200 bg-white/40 shadow-xl backdrop-blur-lg">
                <header className="mb-8 border-b border-gray-200 pb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                        <span className="block text-blue-600">Internal Restlessness</span>
                        <span className="block text-blue-600">Scale (IRS) Assessment</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-md text-base text-gray-600">
                        Research Author: Dr. Lisa Weyandt and Colleagues
                    </p>
                </header>

                <div className="mb-6 border-l-4 border-red-400 bg-red-50 p-4">
                    <p className="text-sm text-red-700">
                        <strong>Note:</strong> I am not a doctor or mental health professional. I
                        just recreated the original questions and made a web application for it.
                    </p>
                </div>

                <div className="mb-6 border-l-4 border-yellow-400 bg-yellow-50 p-4">
                    <p className="text-sm text-yellow-700">
                        <strong>Disclaimer:</strong> Be aware these are not the original questions.
                        This assessment is for educational and research purposes only. It is not a
                        diagnostic tool. For clinical use, please consult with a qualified
                        professional.
                    </p>
                </div>

                {!showResult ? (
                    <div className="mx-4 mb-6 rounded-xl border-2 border-gray-100 bg-white/50 p-6 shadow-lg backdrop-blur-sm">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-600">
                                Question {currentQuestion + 1} of {questions.length}
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                                {Math.round(progress)}%
                            </span>
                        </div>

                        <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
                            <div
                                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <div className="mb-8">
                            <p className="mb-8 text-center text-lg font-medium text-gray-800">
                                {questions[currentQuestion].question}
                            </p>
                            {/* Slider */}cc
                            <div className="mb-8 px-2">
                                <input
                                    type="range"
                                    min="1"
                                    max="7"
                                    step="1"
                                    value={sliderValue}
                                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200"
                                    style={{
                                        background: `linear-gradient(to right, #4a6fa5 0%, #4a6fa5 ${((sliderValue - 1) / 6) * 100}%, #e9ecef ${((sliderValue - 1) / 6) * 100}%, #e9ecef 100%)`,
                                    }}
                                />
                                <div className="mt-4 flex justify-between text-xs text-gray-500">
                                    <span className="text-left">Not at all true</span>
                                    <span className="text-right">Very true</span>
                                </div>
                                <div className="mt-1 flex justify-between text-xs text-gray-400">
                                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                        <span
                                            key={num}
                                            className={`w-4 cursor-pointer text-center ${sliderValue === num ? 'font-bold text-blue-600' : ''}`}
                                            onClick={() => setSliderValue(num)}
                                        >
                                            {num}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-2 text-center text-sm font-medium text-blue-600">
                                    {scaleLabels[sliderValue - 1]}
                                </div>
                            </div>
                            <div className="flex justify-between pt-4">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                    className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                                        currentQuestion === 0
                                            ? 'cursor-not-allowed text-gray-400'
                                            : 'text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    {currentQuestion === questions.length - 1
                                        ? 'See Results'
                                        : 'Next'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="mx-4 my-4 overflow-hidden rounded-xl border-2 border-gray-100 bg-white/50 shadow-lg backdrop-blur-sm"
                        ref={resultRef}
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-md">
                            <h2 className="text-2xl font-bold">Assessment Complete</h2>
                            <p className="opacity-90">Your IRS assessment results</p>
                        </div>

                        <div className="bg-gradient-to-br from-white/40 to-white/20 p-6">
                            <div className="mb-8 text-center">
                                <div className="mb-2 text-sm font-medium text-gray-500">
                                    Your Score
                                </div>
                                <div className="mb-1 text-5xl font-bold text-blue-600">{score}</div>
                                <div className="mb-6 text-sm text-gray-500">
                                    out of 168 (maximum possible score)
                                </div>

                                <div className="mx-auto h-4 w-full max-w-md overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-4 rounded-full bg-blue-600 transition-all duration-1000 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="mb-3 text-lg font-medium text-gray-900">
                                    Score Interpretation
                                </h3>
                                <div className="rounded-xl border-2 border-gray-100 bg-white/70 p-4 backdrop-blur-sm">
                                    <p className="text-gray-800">{interpretation}</p>

                                    <div className="mt-4 text-sm text-gray-600">
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="flex justify-between">
                                                <span>24-69:</span>
                                                <span className="font-medium">
                                                    Typical range for neurotypical adults
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>70-89:</span>
                                                <span className="font-medium">
                                                    Borderline range, may indicate subclinical
                                                    symptoms
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>90-110:</span>
                                                <span className="font-medium">
                                                    Typical range for adults with ADHD
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>110-168:</span>
                                                <span className="font-medium">
                                                    High range, often seen in significant ADHD
                                                    symptoms
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="mb-3 text-lg font-medium text-gray-900">
                                    Your Responses
                                </h3>
                                <div className="scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent max-h-96 space-y-4 overflow-y-auto pr-2">
                                    {questions.map((question, index) => (
                                        <div
                                            key={index}
                                            className="mx-2 rounded-xl border-2 border-gray-100 bg-white/60 p-4 shadow-sm backdrop-blur-sm"
                                        >
                                            <div className="flex items-start">
                                                <span className="mr-3 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="mb-2 text-sm font-medium text-gray-800">
                                                        {question.question}
                                                    </p>
                                                    <div className="mt-2">
                                                        <div className="mb-1 flex justify-between text-xs text-gray-500">
                                                            <span>Not at all true</span>
                                                            <span>Very true</span>
                                                        </div>
                                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                            <div
                                                                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                                                style={{
                                                                    width: `${((answers[index] || 0) / 7) * 100}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <div className="mt-1 text-right text-sm font-medium text-blue-600">
                                                            {answers[index]
                                                                ? scaleLabels[answers[index] - 1]
                                                                : 'Not answered'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mx-4 mb-6 rounded-lg border-t-2 border-r-2 border-b-2 border-l-4 border-yellow-100 border-yellow-400 bg-yellow-50/80 p-4 backdrop-blur-sm">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-yellow-800">
                                            Important Note
                                        </h3>
                                        <div className="mt-2 text-sm text-yellow-700">
                                            <p>
                                                This assessment is not a diagnostic tool. Only a
                                                qualified healthcare professional can diagnose ADHD
                                                or any other medical condition. This tool is for
                                                informational purposes only.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center gap-4 border-t border-white/20 pt-6 sm:flex-row">
                                <button
                                    onClick={resetAssessment}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <svg
                                        className="mr-2 -ml-1 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Take the Test Again
                                </button>
                                <a
                                    href="https://www.researchgate.net/profile/Lisa-Weyandt-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-2.5 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <svg
                                        className="mr-2 -ml-1 h-5 w-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
                                    </svg>
                                    Research Author
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                <footer className="mt-12 border-t border-white/20 bg-white/10 p-6 text-center text-sm text-gray-600">
                    <p>
                        This assessment is based on the Internal Restlessness Scale (IRS) developed
                        by Dr. Lisa Weyandt and colleagues.
                    </p>
                    <p className="mt-2">
                        {new Date().getFullYear()} WKDKavishka. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}

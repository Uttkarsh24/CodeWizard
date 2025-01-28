import React, { useState } from "react";

const App = () => {
  const videos = [
    { id: "libKVRa01L8", title: "The Solar System", topic: "Astronomy" },
    { id: "X9otDixAtFw", title: "Ancient Egypt", topic: "History" },
  ];

  const quizData = {
    "The Solar System": [
      {
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Mars", "Mercury", "Venus"],
        correct: "Mercury",
      },
      {
        question: "How many planets are in the solar system?",
        options: ["7", "8", "9", "10"],
        correct: "8",
      },
    ],
    "Ancient Egypt": [
      {
        question: "What is the name of the ancient Egyptian writing system?",
        options: ["Cuneiform", "Hieroglyphs", "Latin", "Runes"],
        correct: "Hieroglyphs",
      },
      {
        question: "Who was the first Pharaoh of Egypt?",
        options: ["Tutankhamun", "Narmer", "Ramesses", "Cleopatra"],
        correct: "Narmer",
      },
    ],
  };

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [quizLoad, setQuizLoad] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const handleSelectionChange = (event) => {
    const selectedId = event.target.value;
    const video = videos.find((v) => v.id === selectedId);
    setSelectedVideo(video);
    setQuizLoad(false);
    resetQuiz();
  };

  const handleQuizClick = () => {
    setQuizLoad(!quizLoad);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setProgress(0);
    setScore(0);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quizData[selectedVideo.title][currentQuestionIndex];

    if (selectedOption === currentQuestion.correct) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedOption("");
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < quizData[selectedVideo.title].length) {
      setCurrentQuestionIndex(nextIndex);
      setProgress(((nextIndex + 1) / quizData[selectedVideo.title].length) * 100);
    } else {
      alert(`Quiz complete! Your score is ${score + 1}/${quizData[selectedVideo.title].length}`);
      resetQuiz();
    }
  };

  const currentQuestion = quizData[selectedVideo.title]?.[currentQuestionIndex];

  return (
    <div className="overflow-hidden no-scrollbar">
    <div className="main h-fullw-full text-white  bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Educational Videos</h1>

      {/* Video Selection */}
      <div className="mb-6">
        <label htmlFor="videoSelect" className="block text-lg font-medium mb-2">
          Select a Video:
        </label>
        <select
          id="videoSelect"
          className="w-full p-3 border border-gray-900 rounded focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
          onChange={handleSelectionChange}
          value={selectedVideo.id}
        >
          {videos.map((video) => (
            <option key={video.id} value={video.id}>
              {video.title}
            </option>
          ))}
        </select>
      </div>

      {/* Video Display */}
      <div className="video-container  p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
        <p className="text-sm text-gray-400 mb-4">Topic: {selectedVideo.topic}</p>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${selectedVideo.id}`}
          title={selectedVideo.title}
          className="rounded-md"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Quiz Section */}
        <div className="text-2xl mt-4">CHOOSE A GAME:</div>
        <button
          className="quiz mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={handleQuizClick}
        >
          {quizLoad ? "Hide Quiz" : "Start Quiz"}
        </button>

        {quizLoad && currentQuestion && (
          <div className="quiz-container mt-4 p-4 bg-gray-900 rounded shadow">
            <h2 className="text-xl font-bold">{`Question ${currentQuestionIndex + 1}`}</h2>
            <p className="font-medium mt-2">{currentQuestion.question}</p>
            <ul className="mt-4">
              {currentQuestion.options.map((option, i) => (
                <li key={i} className="mt-2">
                  <label>
                    <input
                      type="radio"
                      name="quizOption"
                      value={option}
                      className="mr-2"
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className="mt-4 p-2 bg-blue-600 text-white rounded"
            >
              Submit & Next
            </button>
            <div className="mt-4">
              <div className="w-full bg-gray-300 rounded">
                <div
                  className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded"
                  style={{ width: `${progress}%` }}
                >
                  {progress.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default App;

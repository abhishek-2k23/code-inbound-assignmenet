import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, goToNextQuestion, goToPreviousQuestion, completeSurvey } from '../redux/surveySlice';
import questions from '../data/questions';

const SurveyScreen = () => {
  const dispatch = useDispatch();
  const { currentQuestionIndex, answers } = useSelector((state) => state.survey);
  const currentQuestion = questions[currentQuestionIndex];
  const [selectedAnswer, setSelectedAnswer] = useState(answers); // Syncing with Redux answers

  // Function to handle answer selection
  const handleAnswerSelect = (value) => {
    if (answers[currentQuestion.id] === value) {
      // Remove answer if the same rating is clicked
      setSelectedAnswer({
        ...answers,
        [currentQuestion.id]: null
      });
      dispatch(answerQuestion({ questionId: currentQuestion.id, answer: null }));
    } else {
      // Update answer
      setSelectedAnswer({
        ...answers,
        [currentQuestion.id]: value
      });
      dispatch(answerQuestion({ questionId: currentQuestion.id, answer: value }));
    }
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setSelectedAnswer({ ...answers, [currentQuestion.id]: value });
    dispatch(answerQuestion({ questionId: currentQuestion.id, answer: value }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      dispatch(goToPreviousQuestion());
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(goToNextQuestion());
    } else {
      dispatch(completeSurvey());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="p-6 md:p-10 bg-blue-300 shadow-lg rounded-3xl border border-gray-500 text-black w-full max-w-lg ">
        <h2 className="text-xl mb-4 text-center ">Customer Survey</h2>
        <h2 className="text-xl mb-4 text-end ">{` ${currentQuestionIndex + 1}/${questions.length}`}</h2>
        <p className="mb-4 text-center">{`${currentQuestionIndex + 1}. ${currentQuestion.question}`}</p>

        {/* Rating question */}
        {currentQuestion.type === 'rating' && (
          <div className="flex justify-center space-x-2 space-y-2 mb-4 flex-wrap gap-3 md:gap-0">
            {Array.from({ length: currentQuestion.scale }).map((_, index) => {
              const ratingValue = index + 1;
              const isSelected = answers[currentQuestion.id] === ratingValue;

              return (
                <div
                  key={ratingValue}
                  className={`min-w-10 min-h-10 md:w-12 md:h-12 flex items-center justify-center border cursor-pointer rounded-full  ${
                    isSelected ? 'bg-red-500 text-black' : 'bg-gray-200 text-black'
                  }`}
                  onClick={() => handleAnswerSelect(ratingValue)}
                >
                  {ratingValue}
                </div>
              );
            })}
          </div>
        )}

        {/* Text question */}
        {currentQuestion.type === 'text' && (
          <textarea
            value={selectedAnswer[currentQuestion.id] || ''} // Properly using value from state
            onChange={handleTextChange}
            className="p-2 border border-gray-300 rounded-md w-full text-black resize-none"
            rows="4"
            placeholder="Enter your response here..."
          />
        )}

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between w-full">
          <button 
            onClick={handlePrevious} 
            className="p-2 bg-blue-500 text-white rounded-md w-24 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border disabled:border-gray-300" 
            disabled={currentQuestionIndex === 0}
          >
            Prev
          </button>
          <button 
            onClick={handleNext} 
            className="p-2 bg-pink-500 text-white rounded-md w-24"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyScreen;

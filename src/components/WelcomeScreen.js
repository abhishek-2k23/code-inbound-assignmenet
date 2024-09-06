import React from 'react';
import { useDispatch } from 'react-redux';
import { welcomeScreen } from '../redux/surveySlice';

const WelcomeScreen = () => {
    const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200 px-5 md:px-0">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Survey</h1>
      <p className="text-lg mb-8">We appreciate your feedback to help us improve our service!</p>
      <button onClick={() => dispatch(welcomeScreen(false))} className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg">
        Start Survey
      </button>
    </div>
  );
};

export default WelcomeScreen;

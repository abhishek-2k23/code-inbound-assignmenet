import React from 'react';
import { useSelector } from 'react-redux';
import WelcomeScreen from './components/WelcomeScreen';
import SurveyScreen from './components/SurveyScreen';
import ThankYouScreen from './components/ThankYouScreen';

const App = () => {
  const { isCompleted, welcomeScreen } = useSelector((state) => state.survey);

  return (
    <div className="App bg-blue-500 " >
      {
        welcomeScreen ? <WelcomeScreen /> : isCompleted ? <ThankYouScreen /> : <SurveyScreen />
      }
    </div>
  );
};

export default App;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduceTimer, resetSurvey } from '../redux/surveySlice';

const ThankYouScreen = () => {
  const dispatch = useDispatch();
  const { timer } = useSelector((store) => store.survey);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        dispatch(reduceTimer());
      } else {
        dispatch(resetSurvey());
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 px-3 md:px-0">
      <h1 className="text-3xl font-semibold text-white tracking-wider">Thank you for your feedback!</h1>
      <div className='w-14 h-14 rounded-full border border-gray-300 flex justify-center items-center text-white text-xl' >{timer}</div>
    </div>
  );
};

export default ThankYouScreen;
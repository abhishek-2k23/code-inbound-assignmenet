import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuestionIndex: 0,
  answers: {},
  isCompleted: false,
  sessionId: Date.now(),
  welcomeScreen: true,
  timer: 5,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    goToNextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    goToPreviousQuestion: (state) => {
      state.currentQuestionIndex -= 1;
    },
    skipQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    completeSurvey: (state) => {
      state.isCompleted = true;
      localStorage.setItem('surveySession', JSON.stringify(state));
    },
    welcomeScreen: (state, action) => {
      state.welcomeScreen = action.payload
    },
    reduceTimer: (state) =>{
      state.timer = state.timer-1;
    },
    resetSurvey: (state) => {
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.welcomeScreen= true;
      state.isCompleted = false;
      state.timer = 5;
      state.sessionId = Date.now();
    },
  },
});

export const { answerQuestion, goToNextQuestion, goToPreviousQuestion, skipQuestion, completeSurvey, resetSurvey, welcomeScreen, reduceTimer} =
  surveySlice.actions;

export default surveySlice.reducer;

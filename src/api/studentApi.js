import axiosInstance from "./axios";

export const getQuiz = async (code) => {
  const response = await axiosInstance.get(`/user/student/quiz/getquiz/${code}`);
  return response.data;
};

export const submitQuizAPI = async (quizCode, answers) => {
  const response = await axiosInstance.post(
    `/user/student/quiz/submit/${quizCode}`,
    answers
  );
  return response.data;
};



export const getAttemptedQuizzes = async () => {
  const response = await axiosInstance.get(
    "/user/student/quizzes/history"
  );
  return response.data;
};
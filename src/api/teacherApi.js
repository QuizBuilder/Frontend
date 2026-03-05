import axiosInstance from "./axios";

export const generateAIQuiz = async (data) => {
  const response = await axiosInstance.post(
    "/user/teacher/generate_quiz",
    data
  );
  return response.data;
};

export const getGeneratedQuizzes = async () => {
  const response = await axiosInstance.get("/user/teacher/quizzes");
  return response.data;
};

export const getQuizInfo = async (quizCode) => {
  const response = await axiosInstance.get(
    `/user/teacher/quizzes/${quizCode}`
  );
  return response.data;
};
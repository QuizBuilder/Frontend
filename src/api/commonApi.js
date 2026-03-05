import axiosInstance from "./axios";

export const getLeaderBoard = async (quizCode) => {
  const response = await axiosInstance.get(
    `/user/quiz/${quizCode}/leaderboard`
  );
  return response.data;
};
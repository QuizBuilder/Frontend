import { message } from 'antd';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Card, Descriptions, List, Spin, Divider } from "antd";
import dayjs from "dayjs";
import api from "../../api/axios";

function QuizInfo() {
    const quizCode = useParams().quiz_code;
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{fetchQuiz()},
        [quizCode]
    );

    async function fetchQuiz(){
        try{
            const response = await api.get(`/user/teacher/quizzes/${quizCode}`);
            setQuiz(response.data);
        }
        catch{
            message.error("Cannot load the quiz info")
        }
        finally{
            setLoading(false);
        }
    }

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div >
      <Card title="Quiz Information">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Quiz Code">
            {quiz.code}
          </Descriptions.Item>

          <Descriptions.Item label="Topic">
            {quiz.topic}
          </Descriptions.Item>

          <Descriptions.Item label="Difficulty">
            {quiz.difficulty}
          </Descriptions.Item>

          <Descriptions.Item label="No of Questions">
            {quiz.noOfQuestions}
          </Descriptions.Item>

          <Descriptions.Item label="Start Time">
            {dayjs(quiz.startTime).format("DD MMM YYYY, HH:mm")}
          </Descriptions.Item>

          <Descriptions.Item label="End Time">
            {dayjs(quiz.endTime).format("DD MMM YYYY, HH:mm")}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider />

      <Card title="Questions">
        <List
          dataSource={quiz.questionList}
          renderItem={(q, index) => (
            <List.Item>
              <Card
                style={{ width: "100%" }}
                title={`Q${index + 1}. ${q.questionText}`}
              >
                <p>A. {q.optAText}</p>
                <p>B. {q.optBText}</p>
                <p>C. {q.optCText}</p>
                <p>D. {q.optDText}</p>

                {q.correctOptText && (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Correct Answer: {q.correctOptText}
                  </p>
                )}
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );

}


export default QuizInfo

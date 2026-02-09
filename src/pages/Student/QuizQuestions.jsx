import { Card, Radio, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function QuizQuestions() {
  const { quiz_code: code } = useParams();
  const navigate = useNavigate();

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function fetchQuizQuestions() {
      try {
        const response = await api.get(
          `/user/student/quiz/getquiz/${code}`
        );
        setQuizQuestions(response.data);
      } catch {
        message.error("Failed to load quiz");
      }
    }

    fetchQuizQuestions();
  }, [code]);

  function handleChange(questionId, optionId) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  }

  async function submitQuiz() {
    try {
      const payload = Object.keys(answers).map((questionId) => ({
        questionId: Number(questionId),
        selectedOptionId: answers[questionId]
      }));

      const response = await api.post(
        `/user/student/quiz/submit/${code}`,
        payload
      );

      message.success(`Your score: ${response.data.score}`);

      setTimeout(() => {
        navigate("/student/dashboard");
      }, 2000);
    } catch {
      message.error("Failed to submit quiz");
    }
  }

  return (
    <div>
      {quizQuestions.map((q, index) => (
        <Card
          key={q.questionId}
          title={`Q${index + 1}. ${q.questionText}`}
          style={{ marginBottom: 16 }}
        >
          <Radio.Group
            onChange={(e) =>
              handleChange(q.questionId, e.target.value)
            }
            value={answers[q.questionId]}
          >
            <Radio value={q.optAId}>A. {q.optAText}</Radio><br />
            <Radio value={q.optBId}>B. {q.optBText}</Radio><br />
            <Radio value={q.optCId}>C. {q.optCText}</Radio><br />
            <Radio value={q.optDId}>D. {q.optDText}</Radio>
          </Radio.Group>
        </Card>
      ))}

      {quizQuestions.length > 0 && (
        <Button type="primary" block onClick={submitQuiz}>
          Submit Quiz
        </Button>
      )}
    </div>
  );
}

export default QuizQuestions;

import React, { useState } from "react";
import {
  Form, InputNumber, Select, DatePicker, Button, message, Input
} from "antd";
import { useNavigate } from "react-router-dom";
import { generateAIQuiz } from "../../api/teacherApi";
import "./Styles/CreateQuiz.css";

const { Option } = Select;
const { TextArea } = Input;

function CreateQuiz() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const disabledDate = (current) => { return false; };

  const onFinish = async (values) => {
    if (values.endTime.isBefore(values.startTime)) {
      message.error("End time must be after start time");
      return;
    }

    const reqBody = {
      noOfQuestions: values.noOfQuestions,
      difficulty: values.difficulty,
      topic: values.topic,
      startTime: values.startTime.format("YYYY-MM-DDTHH:mm:ss"),
      endTime: values.endTime.format("YYYY-MM-DDTHH:mm:ss"),
      additionalInstruction: values.additionalInstruction?.trim() || null,
    };

    try {
      setLoading(true);
      const data = await generateAIQuiz(reqBody);
      if (!data.questionList || data.questionList.length === 0) {
        message.error("AI returned empty quiz");
        return;
      }
      message.success("Quiz generated successfully");
      navigate(`/teacher/${data.code}/quiz_info`);
    } catch (err) {
      message.error(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "AI service failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cq-root">
      <div className="cq-grid-overlay" />

      {/* Left Panel */}
      <div className="cq-left">
        <div className="cq-left-content">
          <div className="cq-brand">EDU<span>PORTAL</span></div>
          <h2 className="cq-left-heading">Generate a<br />quiz with AI.</h2>
          <p className="cq-left-sub">Let our AI build a fully customized quiz in seconds. Just pick your topic, difficulty, and schedule — we handle the rest.</p>

          <div className="cq-features">
            <div className="cq-feature">
              <span className="cq-feature-icon">✨</span>
              <div>
                <p className="cq-feature-title">AI-Powered Questions</p>
                <p className="cq-feature-desc">Smart, context-aware questions generated instantly</p>
              </div>
            </div>
            <div className="cq-feature">
              <span className="cq-feature-icon">🎯</span>
              <div>
                <p className="cq-feature-title">Difficulty Control</p>
                <p className="cq-feature-desc">Easy, Medium or Hard — tailored to your students</p>
              </div>
            </div>
            <div className="cq-feature">
              <span className="cq-feature-icon">⏰</span>
              <div>
                <p className="cq-feature-title">Scheduled Delivery</p>
                <p className="cq-feature-desc">Set exact start and end times for your quiz</p>
              </div>
            </div>
          </div>
        </div>
        <div className="cq-left-glow" />
      </div>

      {/* Right Panel */}
      <div className="cq-right">
        <div className="cq-card">
          <div className="cq-badge">AI QUIZ GENERATOR</div>
          <h1 className="cq-title">Create a Quiz</h1>
          <p className="cq-subtitle">Fill in the details and let AI do the work</p>

          <Form layout="vertical" onFinish={onFinish} className="cq-form">

            {/* Row: Questions + Difficulty */}
            <div className="cq-form-row">
              <Form.Item
                label="No. of Questions"
                name="noOfQuestions"
                rules={[
                  { required: true, message: "Required" },
                  { type: "number", min: 1, max: 50, message: "1–50" }
                ]}
              >
                <InputNumber min={1} max={50} placeholder="e.g. 10" />
              </Form.Item>

              <Form.Item
                label="Difficulty"
                name="difficulty"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select placeholder="Select difficulty">
                  <Option value="EASY">
                    <span className="cq-opt-easy">● Easy</span>
                  </Option>
                  <Option value="MEDIUM">
                    <span className="cq-opt-medium">● Medium</span>
                  </Option>
                  <Option value="HARD">
                    <span className="cq-opt-hard">● Hard</span>
                  </Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Topic"
              name="topic"
              rules={[{ required: true, message: "Topic is required" }]}
            >
              <Select placeholder="Select topic">
                <Option value="OPERATING_SYSTEMS">Operating Systems</Option>
                <Option value="DBMS">DBMS</Option>
                <Option value="COMPUTER_NETWORKS">Computer Networks</Option>
                <Option value="DATA_STRUCTURES">Data Structures</Option>
                <Option value="ALGORITHMS">Algorithms</Option>
                <Option value="OOP">Object Oriented Programming</Option>
                <Option value="SOFTWARE_ENGINEERING">Software Engineering</Option>
                <Option value="JAVA">Java</Option>
                <Option value="PYTHON">Python</Option>
                <Option value="WEB_DEVELOPMENT">Web Development</Option>
              </Select>
            </Form.Item>

            {/* Row: Start + End Time */}
            <div className="cq-form-row">
              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[{ required: true, message: "Required" }]}
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={disabledDate} />
              </Form.Item>

              <Form.Item
                label="End Time"
                name="endTime"
                dependencies={["startTime"]}
                rules={[{ required: true, message: "Required" }]}
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={disabledDate} />
              </Form.Item>
            </div>

            <Form.Item
              label="Additional Instructions (Optional)"
              name="additionalInstruction"
            >
              <TextArea
                rows={3}
                maxLength={200}
                placeholder="e.g. Include scenario-based questions"
                className="cq-textarea"
              />
            </Form.Item>

            <div className="cq-divider" />

            <Button
              className="cq-btn"
              htmlType="submit"
              block
              loading={loading}
              disabled={loading}
            >
              {loading ? "Generating with AI..." : "✨ Generate Quiz"}
            </Button>

          </Form>

          <p className="cq-footer">
            Back to <span onClick={() => navigate("/teacher/dashboard")}>Dashboard</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
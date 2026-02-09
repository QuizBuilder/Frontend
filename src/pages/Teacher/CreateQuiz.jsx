import React from "react";
import { Form, InputNumber, Select, DatePicker, Button, Card, message } from "antd";
import dayjs from "dayjs";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function CreateQuiz() {
    const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const reqBody = {
        noOfQuestions: values.noOfQuestions,
        difficulty: values.difficulty,
        topic: values.topic,
        startTime: values.startTime.format("YYYY-MM-DDTHH:mm:ss"),
        endTime: values.endTime.format("YYYY-MM-DDTHH:mm:ss"),
      };

      const response = await api.post("/user/teacher/generate_quiz", reqBody);
      navigate(`/teacher/${response.data.code}/quiz_info`)
      message.success("Quiz generated successfully");

    } catch (err) {
      message.error("Failed to generate quiz");
    }
  };

  return (
    <Card title="Generate Quiz" >
      <Form
        layout="vertical"
        onFinish={onFinish}
      >

       
        <Form.Item
          label="Number of Questions"
          name="noOfQuestions"
          rules={[
            { required: true, message: "NoOfQues is required" },
            { type: "number", min: 1, max: 50, message: "Must be between 1 and 50" }
          ]}
        >
          <InputNumber min={1} max={50} style={{ width: "100%" }} />
        </Form.Item>

        
        <Form.Item
          label="Difficulty"
          name="difficulty"
          rules={[{ required: true, message: "Difficulty is required" }]}
        >
          <Select placeholder="Select difficulty">
            <Option value="EASY">Easy</Option>
            <Option value="MEDIUM">Medium</Option>
            <Option value="HARD">Hard</Option>
          </Select>
        </Form.Item>

        
        <Form.Item
          label="Topic"
          name="topic"
          rules={[{ required: true, message: "Topic is required" }]}
        >
          <Select>
            <Option value="TECH">Tech</Option>
          </Select>
        </Form.Item>

     
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Start time is required" }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            style={{ width: "100%" }}
          />
        </Form.Item>

        
        <Form.Item
          label="End Time"
          name="endTime"
          dependencies={["startTime"]}
          rules={[
            { required: true, message: "End time is required" }
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Generate Quiz
        </Button>

      </Form>
    </Card>
  );
}

export default CreateQuiz;


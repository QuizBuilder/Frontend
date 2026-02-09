import { Button, Card, Input, Form, message } from "antd";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AttemptQuiz() {
    const navigate = useNavigate();
    

    function onFinish(values){
        try{
            navigate(`/student/${values.quizCode}/attempt_quiz`);
        }
        catch{
            message.error("Couldn't Fetch Quiz.Quiz is not yet started or enter code properly");
        }
    }

  return (
    <div>
      <Card title="Attempt Quiz">
        <Form
            layout = "vertical"
            onFinish = {onFinish}
        >
            <Form.Item
                label = "Enter Quiz Code"
                name = "quizCode"
                rules={[{ required: true, message: "Please enter quiz code" }]}
            >
                <Input/>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
                Enter Quiz
            </Button>
        </Form>
      </Card>
    </div>
  )
}

export default AttemptQuiz

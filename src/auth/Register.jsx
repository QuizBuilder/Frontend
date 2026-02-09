import React from 'react'
import { Form, Input, Button, Card, message, Radio} from "antd";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";




function Register() {
    const navigate = useNavigate();

    async function onFinish(values){
        try {
            await api.post("user/auth/signup", values);
            navigate("/login");
        } 
        catch (error) {
            message.error("Registration failed");
        }
    }

  return (
    <div>
      <Card title="Register">
        <Form
          layout="vertical"
          onFinish={onFinish}
        >

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
            <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="STUDENT">Student</Radio>
            <Radio value="TEACHER">Teacher</Radio>
          </Radio.Group>
        </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default Register

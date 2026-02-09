import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, message } from "antd";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();

    async function onFinish(values){
        try{
            const response = await api.post("user/auth/signin", values);
            const token = response.data.jwtToken;
            const role = response.data.role;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            if(role === "STUDENT"){
                navigate("/student/dashboard");
            }
            else{
                navigate("/teacher/dashboard");
            }
            message.success("Login Successful");
        }
        catch{
            message.error("Login Failed");
        }
    }
  return (
    <div>
       <Card title="Login">
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item 
             label="Email"
             name="email"
             rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item 
             label="Password"
             name="password"
             rules = {[
                { required: true, message: "Please enter your email" }
              ]}
            >
                <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
                Login
            </Button>
        </Form>

       </Card>
    </div>
  )
}

export default Login

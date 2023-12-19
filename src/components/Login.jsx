import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, Card, Alert, Space, Spin } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggeduser } from "../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState("default");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const [regData, setRegData] = useState({
    email: "shawon12@gmail.com",
    password: "123456789",
  });

  let handleSubmit = async () => {
    setLoader(true);
    let data = await axios.post("http://localhost:8000/api/v1/auth/login", {
      email: regData.email,
      password: regData.password,
    });

    if (data.data.error) {
      setError(data.data.error);
      setLoader(false);
    } else {
      setLoader(false);
      if (data.data.role == "member") {
        setError("This login is only for admin and merchant");
      } else {
        setSuccess(data.data.success);
        dispatch(loggeduser(data.data));
        navigate("/");
      }
    }
  };

  let handleFormData = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  return (
    <Card
      title="Registration"
      bordered={true}
      style={{
        width: 500,
        margin: "auto",
        marginTop: "50px",
      }}
    >
      {error && <Alert message={error} type="error" showIcon />}
      {success && <Alert message={success} type="success" showIcon />}
      <Form
        labelCol={{
          span: 12,
        }}
        layout="vertical"
        initialValues={{
          size: componentSize,
        }}
        //   onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Email">
          <Input name="email" onChange={handleFormData} value={regData.email} />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            name="password"
            type="password"
            onChange={handleFormData}
            value={regData.password}
          />
        </Form.Item>

        <Form.Item>
          {loader ? <Spin /> : <Button onClick={handleSubmit}>Button</Button>}
        </Form.Item>
        <Link to={"/forgotpassword"}>
          <Alert message="Forgot Password?" type="info" />
        </Link>
        <Link to={"/registration"}>
          <Alert message="Do not haver an acoount then click" type="info" />
        </Link>
      </Form>
    </Card>
  );
};

export default Login;

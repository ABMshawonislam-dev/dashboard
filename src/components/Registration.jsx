import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, Card, Alert, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
const Registration = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [error, setError] = useState("");
  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    facebookId: "",
    linkdinId: "",
  });

  let handleSubmit = async () => {
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/registration",
      {
        fullName: "",
        email: "",
        password: "",
        avatar: "",
        facebookId: "",
        linkdinId: "",
      }
    );
    setError(data.data.error);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
        <Form.Item label="Full Name">
          <Input />
        </Form.Item>
        <Form.Item label="Email">
          <Input />
        </Form.Item>
        <Form.Item label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSubmit}>Button</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Registration;

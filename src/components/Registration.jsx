import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, Card, Alert, Space,Spin  } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
const Registration = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    facebookId: "",
    linkdinId: "",
  });

  let handleSubmit = async () => {
    setLoader(true)
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/registration",
      {
        fullName: regData.fullName,
        email: regData.email,
        password: regData.password,
        avatar: "",
        facebookId: "",
        linkdinId: "",
      }
    )

    if(data.data.error){

      setError(data.data.error);
      setLoader(false)
    }else{
      setSuccess(data.data.success)
      setLoader(false)
    }

  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  let handleFormData = (e)=>{

    setRegData({...regData, [e.target.name]:e.target.value})

  }


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
        <Form.Item label="Full Name">
          <Input name="fullName" onChange={handleFormData}/>
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={handleFormData}/>
        </Form.Item>
        <Form.Item label="Password">
          <Input name="password" type="password" onChange={handleFormData}/>
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
          {loader ? <Spin /> :<Button onClick={handleSubmit}>Button</Button>}
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Registration;

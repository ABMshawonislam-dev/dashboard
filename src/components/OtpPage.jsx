import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { InputNumber } from 'antd'
import { Button, Form, Input, Upload, Card, Alert, Space,Spin  } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {

    let param = useParams()
    console.log(param)
    let navigate= useNavigate()
    const [componentSize, setComponentSize] = useState("default");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const [randomOtp, setRandomOtp] = useState("");

  let handleSubmit = async () => {
    setLoader(true)
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/emailvarificationOtpmatch",
      {
        email: param.email,
        randomOtp: randomOtp,
      }
    )
      console.log(data)
    if(data.data.error){

      setError(data.data.error);
      setLoader(false)
    }else{
      setSuccess(data.data.success)
      setLoader(false)
      navigate(`/login`)
    }

  };






  return (
    <Card
    title="OTP Match"
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
     
      <Form.Item label="OTP">
        <Input name="otp" onChange={(e)=>setRandomOtp(e.target.value)}/>
      </Form.Item>

      <Form.Item>
        {loader ? <Spin /> :<Button onClick={handleSubmit}>Button</Button>}
      </Form.Item>
    </Form>
  </Card>
  )
}

export default OtpPage
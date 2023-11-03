import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, Card, Alert, Space,Spin  } from "antd";
import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

const ResetPassword = () => {


  let [searchParams, setSearchParams] = useSearchParams()


let navigate = useNavigate()
  const [componentSize, setComponentSize] = useState("default");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loader, setLoader] = useState(false);
    const [regData, setRegData] = useState({
      newpassword: "",

    });

    

    let handleSubmit = async () => {
        setLoader(true)
        let data = await axios.post(
          "http://localhost:8000/api/v1/auth/resetpassword",
          {
            email: searchParams.get("email"),
            newpassword: regData.newpassword,
          }
        )
        if(data.data.error){
    
          setError(data.data.error);
          setLoader(false)
        }else{
          
          setLoader(false)
          setSuccess(data.data.success)
          navigate("/login")
          
   
        }
    
      };

      
  let handleFormData = (e)=>{

    setRegData({...regData, [e.target.name]:e.target.value})

  }
  return (
    <Card
    title="Change Your Password"
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
 
      <Form.Item label="New Password">
        <Input name="newpassword" onChange={handleFormData}/>
      </Form.Item>
   
      
      <Form.Item>
        {loader ? <Spin /> :<Button onClick={handleSubmit}>Button</Button>}
      </Form.Item>
  
    </Form>
  </Card>
  )
}

export default ResetPassword
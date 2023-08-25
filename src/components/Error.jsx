import React from "react";
import { Alert, Button } from "antd";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <Alert
        message="Page Not Fount"
        description="The url you want visit its not exists"
        type="error"
        showIcon
      />
      <Link to="/">
        <Button type="dashed">Back to Home</Button>
      </Link>
    </>
  );
};

export default Error;

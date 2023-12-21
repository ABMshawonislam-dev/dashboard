import React, { useEffect } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu, Col, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Home = () => {
  let navigate = useNavigate();

  const userInfo = useSelector((state) => state.activeUser.value);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  const items = [
    userInfo?.role == "admin" &&
      getItem("Users List", "sub1", <UsergroupAddOutlined />, [
        getItem("Merchant", "/login"),
        getItem("Users", "2"),
      ]),
    getItem("Product", "sub2", <AppstoreOutlined />, [
      getItem("Add Product", "/addproduct"),
      getItem("All Products", "/allproduct"),
      getItem("All Variant", "/allvariant"),
    ]),
    {
      type: "divider",
    },
    getItem("Category", "sub3", <AppstoreOutlined />, [
      getItem("Add Category", "5"),
      getItem("All Category", "6"),
    ]),
    {
      type: "divider",
    },
    getItem("Sub Category", "sub4", <AppstoreOutlined />, [
      getItem("Add Sub Category", "7"),
      getItem("All Sub Category", "8"),
    ]),
    {
      type: "divider",
    },
    getItem("Discount", "sub5", <AppstoreOutlined />, [
      getItem("Add Discount", "9"),
      getItem("All Discount", "10"),
    ]),

    {
      type: "divider",
    },
    userInfo?.role == "admin" &&
      getItem("Approve", "sub6", <AppstoreOutlined />, [
        getItem("Merchant", "11"),
        getItem("Category", "12"),
        getItem("Sub Category", "13"),
      ]),
    {
      type: "divider",
    },
    getItem("Approve Status", "sub7", <AppstoreOutlined />, [
      getItem("Category", "/categorystatus"),
      getItem("Sub Category", "15"),
    ]),
  ];

  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <>
      <Row>
        <Col span={6}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={14}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default Home;

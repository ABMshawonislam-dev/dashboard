import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { Space, Table, Tag, Button, Alert } from "antd";

const AllProduct = () => {
  let [allpro, setAllPro] = useState([]);
  let [allprolist, setAllProList] = useState([]);
  let [successmsg, setSuccessmsg] = useState("");

  useEffect(() => {
    async function allpro() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/allproducts"
      );
      console.log(data.data);

      let arr = [];
      data.data.map((item, index) => {
        arr.push({
          serial: index + 1,
          key: item._id,
          name: item.name,
          image:
            "https://www.startech.com.bd/image/cache/catalog/monitor/acer/ek220q-h3bi/ek220q-h3bi-05-500x500.webp",
          store: item.store.storename,
        });
      });
      setAllPro(arr);
    }
    allpro();
  }, []);

  let handleDelete = async (id) => {
    console.log("Delete", id);

    let data = await axios.post(
      "http://localhost:8000/api/v1/product/deletproduct",
      {
        id: id,
      }
    );

    setSuccessmsg(data);
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Space size="middle">
          <img alt="No Image" src={record.image} width={40} />
        </Space>
      ),
    },
    {
      title: "Store Name",
      dataIndex: "store",
      key: "store",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button
            onClick={() => handleDelete(record.key)}
            type="primary"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* <Alert message="Success Text" type="success" /> */}

      {/* {successmsg && <Alert message={successmsg} type="success" closable />} */}
      <Table columns={columns} dataSource={allpro} />
    </>
  );
};

export default AllProduct;

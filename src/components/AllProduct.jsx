import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { Space, Table, Tag, Button } from "antd";

const AllProduct = () => {
  let [allpro, setAllPro] = useState([]);
  let [allprolist, setAllProList] = useState([]);

  useEffect(() => {
    async function allpro() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/allproducts"
      );
      console.log(data.data);

      let arr = [];
      data.data.map((item) => {
        arr.push({
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

  const columns = [
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
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  //   useEffect(() => {
  //     let arr = [];
  //     allpro.map((item) => {
  //       arr.push({
  //         key: item._id,
  //         name: item.name,
  //         image:
  //           "https://www.startech.com.bd/image/cache/catalog/monitor/acer/ek220q-h3bi/ek220q-h3bi-05-500x500.webp",
  //         store: item.store.stotename,
  //       });
  //     });
  //     setAllProList(arr);
  //   }, []);

  return <Table columns={columns} dataSource={allpro} />;
};

export default AllProduct;

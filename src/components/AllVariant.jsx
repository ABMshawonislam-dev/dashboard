import axios from "axios";
import { useEffect, useState } from "react";

import { Space, Table, Tag, Button, Alert } from "antd";

const AllVariant = () => {
  let [allvar, setAllvar] = useState([]);
  let [allvarlist, setAllvarList] = useState([]);
  let [successmsg, setSuccessmsg] = useState("");

  useEffect(() => {
    async function allpro() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/allvariant"
      );
      console.log(data.data);

      let arr = [];
      data.data.map((item, index) => {
        arr.push({
          serial: index + 1,
          key: item._id,
          image: item.image,
        });
      });
      setAllvar(arr);
    }
    allpro();
  }, []);

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Variant Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Space size="middle">
          <img alt="No Image" src={record.image} width={100} />
        </Space>
      ),
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

  return <Table columns={columns} dataSource={allvar} />;
};

export default AllVariant;

import React, { useEffect, useState } from "react";
import { Table, Select, Space, Button } from "antd";
import axios from "axios";

const CategoryApprove = () => {
  let [data, setData] = useState([]);
  let [columns, setColumns] = useState([]);
  let [activeButton, setActiveButton] = useState(true);
  const handleChangeStatuschange = (value) => {
    setActiveButton(false);
    console.log(`selected ${value}`);
  };
  const handleChangeActivechange = (value) => {
    setActiveButton(false);
    console.log(`selected ${value}`);
  };
  const tempdata = [];
  const statusoptionData = [];
  const activeoptionData = [];
  const tempcolumns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: "30%",
    },
    {
      title: "Active",
      dataIndex: "active",
    },
    {
      title: "Action status",
      dataIndex: "",
      key: "x",
      render: (value) => (
        <Select
          defaultValue={value}
          style={{ width: 120 }}
          onChange={handleChangeActivechange}
          options={activeoptionData}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      width: "40%",
      render: (value) => (
        <Select
          defaultValue={value}
          style={{ width: 120 }}
          onChange={handleChangeStatuschange}
          options={statusoptionData}
        />
      ),
    },
  ];

  useEffect(() => {
    async function allcat() {
      let cat = await axios.get(
        "http://localhost:8000/api/v1/category/getallcategory"
      );
      console.log(cat);
      cat.data.map((item) => {
        console.log(item);
        tempdata.push({
          key: item._id,
          name: item.name,
          active: item.isActive ? "Active" : "Inactive",
          status: item.status,
        });
        console.log(item._id, item.status);
        statusoptionData.push({
          value: item._id,
          label: item.status,
        });
        activeoptionData.push({
          value: item._id,
          label: item.isActive ? "Active" : "Inactive",
        });

        tempcolumns.map((catitem) => {
          console.log(catitem.title, catitem.filters);
          if (catitem.title == "Name") {
            catitem.filters.push({
              text: item.name,
              value: item.name,
            });
          } else if (catitem.title == "Status") {
            catitem.filters.push({
              text: item.status,
              value: item.status,
            });
          }
        });
      });
      setColumns(tempcolumns);
      setData(tempdata);
    }

    allcat();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Button type="primary" disabled={activeButton}>
        Save Changes {activeButton}
      </Button>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
};

export default CategoryApprove;

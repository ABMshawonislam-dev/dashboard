import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const CategoryStatus = () => {
  let [data, setData] = useState([]);
  let [columns, setColumns] = useState([]);
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
      title: "Status",
      dataIndex: "status",
      filters: [],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
  ];

  const tempdata = [];

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
      <h3>Read Only Data. You can not change anything here</h3>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
};

export default CategoryStatus;

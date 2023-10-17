import React, { useEffect, useState } from "react"; // Import useState
import { Input, Select, Tag } from "antd";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color="green"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const AddProduct = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    async function allvariant() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/allvariant"
      );
      console.log(data.data);
    }
    allvariant();
  }, []);

  const options = [
    {
      value: "gold",
      label: "one",
    },
    {
      value: "lime",
      label: "two",
    },
    {
      value: "green",
      label: "three",
    },
    {
      value: "cyan",
      label: "four",
    },
    {
      value: "shawon",
      label: "five",
    },
  ];

  return (
    <>
      <Input placeholder="Product Name" />
      <br />
      <br />
      <h5>Product Description</h5>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <br />
      <br />
      {/* <h5>Select Product Variant</h5>
      <Select
        mode="multiple"
        tagRender={tagRender}
        style={{
          width: "100%",
        }}
        options={options}
      /> */}
      <h5>Select Product Store</h5>
      <Select
        mode="single"
        style={{
          width: "100%",
        }}
        options={options}
      />
    </>
  );
};

export default AddProduct;

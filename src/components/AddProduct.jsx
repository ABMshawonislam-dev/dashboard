import React, { useState } from "react"; // Import useState
import { Input, Select, Tag } from "antd";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const options = [
  {
    value: "gold",
  },
  {
    value: "lime",
  },
  {
    value: "green",
  },
  {
    value: "cyan",
  },
  {
    value: "shawon",
  },
];

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

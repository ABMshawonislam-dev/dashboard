import React, { useEffect, useState } from "react"; // Import useState
import { Input, Select, Tag, Button } from "antd";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import draftToHtml from "draftjs-to-html";

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
  const [store, setStore] = useState([]);
  const [name, setName] = useState("");
  const [storename, setStorename] = useState("");

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

  useEffect(() => {
    async function allstore() {
      let arr = [];
      let data = await axios.get(
        "http://localhost:8000/api/v1/merchant/allstore"
      );

      console.log("store", data.data);

      data.data.map((item) => {
        arr.push({
          value: item._id,
          label: item.storename,
        });
      });

      setStore(arr);
    }
    allstore();
  }, []);

  let handleProductUpload = async () => {
    let data = await axios.post(
      "http://localhost:8000/api/v1/product/createproduct",
      {
        name: name,
        description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        store: storename,
      }
    );

    console.log(data);
  };

  return (
    <>
      <Input
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />
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
        onChange={(e) => setStorename(e)}
        mode="single"
        style={{
          width: "100%",
        }}
        options={store}
      />
      <br />
      <br />
      <Button onClick={handleProductUpload} type="primary">
        Upload Product
      </Button>
    </>
  );
};

export default AddProduct;

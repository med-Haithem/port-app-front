import React, { useState, useEffect } from "react";
import AdminDashboard from "../../Components/AdminDashboard";
import {
  Button,
  Form,
  Input,
  Radio,
  Alert,
  Modal,
  Table,
  notification,
} from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
const Camions = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const columns = [
    {
      title: "Matricule",
      dataIndex: "Matricule",
      key: "Matricule",
    },
    {
      title: "Dimension",
      dataIndex: "Dimension",
      key: "Dimension",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Position",
      dataIndex: "Position",
      key: "Position",
    },
    {
      title: "Block",
      dataIndex: "Block",
      key: "Block",
    },
    {
      title: "Imdg",
      dataIndex: "Imdg",
      key: "Imdg",
    },
    {
      title: "actions",
      key: "ID",
      render: (action) => {
        return (
          <>
            <Button danger type="primary" onClick={() => deleteData(action.ID)}>
              delete
            </Button>
          </>
        );
      },
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const getData = () => {
    axios
      .get("https://port-app-tn.herokuapp.com/api/container", {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        setData(
          data.data.data.map((row) => ({
            Matricule: row.Matricule,
            Dimension: row.Dimension,
            Imdg: row.Imdg,
            Type: row.Type,
            Block: row.Block,
            Position: row.Position,
            key: row.ID,
            ID: row.ID,
          }))
        );
      })
      .catch((err) => {});
  };
  const deleteData = (id) => {
    axios
      .delete(`https://port-app-tn.herokuapp.com/api/container/${id}`, {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        getData();
      })
      .catch((err) => {
        console.log("plz login");
      });
  };
  const addData = (values) => {
    axios
      .post(`https://port-app-tn.herokuapp.com/api/container`, values, {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        notification.open({ message: data.data.mesasge });
        getData();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <AdminDashboard btn="add ">
        <Button type="primary" onClick={showModal}>
          Add New
        </Button>
        <Modal
          title=" informations"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="time_related_controls"
            onFinish={addData}
            {...formItemLayout}
          >
            <Form.Item name="Dimension" label=" dimension">
              <Input placeholder="enter  dimension " name="Dimension" />
            </Form.Item>
            <Form.Item label="Imdg" name="Imdg">
              <Radio.Group defaultValue={false}>
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="Matricule" label=" matricule">
              <Input placeholder="enter  matricule " />
            </Form.Item>
            <Form.Item name="Type" label=" type">
              <Input placeholder="enter  type " />
            </Form.Item>
            <Form.Item name="Position" label=" position">
              <Input placeholder="enter  position " />
            </Form.Item>
            <Form.Item name="Block" label=" bloc">
              <Input placeholder="enter  block " />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              {error && <Alert message={error} type="error" />}
            </Form.Item>
          </Form>
        </Modal>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          scroll={{ x: true }}
          pagination={{
            size: "small",
            position: ["topRight"],
          }}
        />
      </AdminDashboard>
    </div>
  );
};

export default Camions;

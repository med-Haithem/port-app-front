import React, { useState, useEffect } from "react";
import UserDashboard from "../../Components/UserDashboard";
import { Button, Form, Input, Modal, Alert, Table } from "antd";
import axios from "axios";

const Camions = () => {
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
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "matricule",
      dataIndex: "matricule",
      key: "matricule",
    },
    {
      title: "actions",
      key: "actions",
      render: (fila) => (
        <>
          <Button danger type="primary" onClick={() => deleteData(fila.id)}>
            delete
          </Button>
        </>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [matric, setMatric] = useState({ Matircule: "" });
  const [error, setError] = useState("");
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
      .get("https://port-app-tn.herokuapp.com/api/camion", {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        setData(
          data.data.data.map((row) => ({
            id: row.ID,
            matricule: row.matricule,
            key: row.ID,
          }))
        );
      })
      .catch((err) => {});
  };
  const deleteData = (id) => {
    axios
      .delete(`https://port-app-tn.herokuapp.com/api/camion/${id}`, {
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
  const addData = (e) => {
    e.preventDefault();
    console.log(matric);
    axios
      .post(`https://port-app-tn.herokuapp.com/api/camion`, matric, {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        setMatric({ Matircule: "" });
        setIsModalVisible(false);
        getData();
      })
      .catch((err) => {
        setMatric({ Matircule: "" });
        setError(err.response.data.message);
      });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    setMatric({ [e.target.name]: e.target.value });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <UserDashboard btn="add Camion">
        <Button
          type="primary"
          onClick={showModal}
          style={{
            marginBottom: "1em",
          }}
        >
          Add New Camion
        </Button>
        <Modal
          title="camion informations"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form name="camions_related_controls" {...formItemLayout}>
            <Form.Item label="camion matirulce">
              <Input
                placeholder="Please input your camion's matricule "
                name="Matricule"
                value={matric.Matircule}
                onChange={(e) => handleChange(e)}
              />
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
              <Button type="primary" htmlType="submit" onClick={addData}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {error && <Alert message={error} type="error" />}
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
      </UserDashboard>
    </div>
  );
};

export default Camions;

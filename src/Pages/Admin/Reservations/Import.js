import React, { useState, useEffect } from "react";
import AdminDashboard from "../../../Components/AdminDashboard";
import { Button, Tag, notification, Table, Modal } from "antd";
import { SyncOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const Export = () => {
  const [data, setData] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [seletectedItem, setSeletectedItem] = useState(null);

  const toggleConfirmModal = (id) => {
    setConfirmModal(!confirmModal);
    setSeletectedItem(id != null ? id : null);
  };

  const handleConfirm = () => {
    if (seletectedItem != null) {
      axios
        .patch(
          "https://port-app-tn.herokuapp.com/api/reservation/" + seletectedItem,
          { Status: "RESOLVED" },
          {
            headers: {
              authorization: bearer,
            },
          }
        )
        .then((data) => {
          notification.success({ message: data.data.message });
          toggleConfirmModal();
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
    toggleConfirmModal();
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "CamionID",
      dataIndex: "CamionID",
      key: "CamionID",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "ContainerMatricule",
      dataIndex: "ContainerMatricule",
      key: "ContainerMatricule",
    },
    {
      title: "Dimension",
      dataIndex: "Dimension",
      key: "Dimension",
    },
    {
      title: "ContainerType",
      dataIndex: "ContainerType",
      key: "ContainerType",
    },
    {
      title: "Imdg",
      dataIndex: "Imdg",
      key: "Imdg",
    },
    {
      title: "status",
      key: "status",
      render: (fila) => (
        <>
          <Tag
            style={{
              padding: "0.5em",
            }}
            icon={<SyncOutlined spin />}
            color="processing"
          >
            pending
          </Tag>
        </>
      ),
    },
    {
      title: "action",
      key: "action",
      render: (action) => (
        <>
          <Button type="primary" onClick={() => toggleConfirmModal(action.ID)}>
            confirm
          </Button>
        </>
      ),
    },
  ];

  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const getData = () => {
    axios
      .get(
        "https://port-app-tn.herokuapp.com/api/reservation/?status=PENDING&type=IMPORT&isAdmin=true",
        {
          headers: {
            authorization: bearer,
          },
        }
      )
      .then((data) => {
        setData(
          data.data.data.map((row) => ({
            ID: row.ID,
            CamionID: row.CamionID,
            UserID: row.UserID,
            Date: row.Date,
            ContainerMatricule: row.ContainerMatricule,
            Dimension: row.Dimension,
            ContainerType: row.ContainerType,
            Imdg: row.Imdg,
            key: row.ID,
          }))
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminDashboard>
      <div>
        {confirmModal && (
          <Modal
            title={`confirm reservation n° ${seletectedItem}`}
            visible={confirmModal}
            onOk={handleConfirm}
            onCancel={() => toggleConfirmModal()}
            okText="Confirm"
            cancelText="Cancel"
            okButtonProps={{
              type: "primary",
            }}
          >
            Do you confirm this reservation
          </Modal>
        )}
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
      </div>
    </AdminDashboard>
  );
};

export default Export;

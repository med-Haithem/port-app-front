import React, { useState, useEffect } from "react";
import AdminDashboard from "../../../Components/AdminDashboard";
import { Button, Tag, Table } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Modal from "../../../Components/ConfirmModal";

const Export = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seletectedItem, setSeletectedItem] = useState(null);

  const showModal = (key) => {
    setIsModalVisible(!isModalVisible);
    setSeletectedItem(key ? key : null);
    if (!key) {
      getData();
    }
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
      render: (reservation) => (
        <>
          <Button type="primary" onClick={() => showModal(reservation.ID)}>
            confirm Reservation
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
        "https://port-app-tn.herokuapp.com/api/reservation/?status=PENDING&type=EXPORT&isAdmin=true",
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminDashboard>
      <div>
        {seletectedItem && (
          <Modal
            title="position informations"
            visible={isModalVisible}
            setIsModalVisible={showModal}
            selectedItem={seletectedItem}
          />
        )}
        <Table
          loading={loading}
          dataSource={data}
          columns={columns}
          bordered
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

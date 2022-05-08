import React, { useEffect, useState } from "react";
import { Tag, Table } from "antd";
import { SyncOutlined, StopOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
const PendingImport = ({ reload }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
      render: (date) => {
        return moment(date).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      title: "ContainerMatricule",
      dataIndex: "Matricule",
      key: "Matricule",
    },
    {
      title: "Dimension",
      dataIndex: "Dimension",
      key: "Dimension",
    },
    {
      title: "Container Type",
      dataIndex: "Type",
      key: "ContainerType",
    },
    {
      title: "Imdg",
      dataIndex: "Imdg",
      key: "Imdg",

      render: (imdg) => {
        return imdg ? (
          <StopOutlined color="green" />
        ) : (
          <CheckOutlined color="red" />
        );
      },
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
  ];
  const getlocal = localStorage.getItem("token");
  const bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const getData = () => {
    axios
      .get(
        "https://port-app-tn.herokuapp.com/api/reservation/?status=PENDING&type=IMPORT",
        {
          headers: {
            authorization: bearer,
          },
        }
      )
      .then((data) => {
        setLoading(false);
        setData(
          data.data.data.map((row) => ({
            ID: row.ID,
            CamionID: row.CamionID,
            Date: row.Date,
            Matricule: row.ContainerMatricule,
            Dimension: row.Dimension,
            Type: row.ContainerType,
            Imdg: row.Imdg,
            key: row.ID,
          }))
        );
      })
      .catch((err) => {
        setLoading(false);

        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: true }}
        loading={loading}
        bordered
        pagination={{
          size: "small",
          position: ["topRight"],
        }}
      />
    </div>
  );
};

export default PendingImport;

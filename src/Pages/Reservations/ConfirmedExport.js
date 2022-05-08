import React, { useEffect, useState } from "react";
import { Tag, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { StopOutlined, CheckOutlined } from "@ant-design/icons";

const ConfirmedExport = () => {
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
      title: "Imdg",
      dataIndex: "Imdg",
      key: "Imdg",
      render: (imdg) => {
        return imdg ? <StopOutlined /> : <CheckOutlined />;
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
            color="success"
          >
            confirmed
          </Tag>
        </>
      ),
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
  ];

  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const getData = () => {
    axios
      .get(
        "https://port-app-tn.herokuapp.com/api/reservation/?status=RESOLVED&type=EXPORT",
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
            Date: row.Date,
            Matricule: row.ContainerMatricule,
            Dimension: row.Dimension,
            Type: row.ContainerType,
            Imdg: row.Imdg,
            Position: row.Position,
            Block: row.Block,
            key: row.ID,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
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

export default ConfirmedExport;

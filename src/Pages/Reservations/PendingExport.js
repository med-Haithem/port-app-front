import React, { useEffect, useState } from "react";
import { Tag, Table } from "antd";
import { SyncOutlined, StopOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const PendingExport = ({ reload }) => {
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
            icon={<SyncOutlined spin />}
            color="processing"
          >
            pending
          </Tag>
        </>
      ),
    },
  ];

  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const getData = () => {
    axios
      .get(
        "https://port-app-tn.herokuapp.com/api/reservation/?status=PENDING&type=EXPORT",
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
        loading={loading}
        dataSource={data}
        columns={columns}
        scroll={{ x: true }}
        bordered
        pagination={{
          size: "small",
          position: ["topRight"],
        }}
      />
    </div>
  );
};

export default PendingExport;

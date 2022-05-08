import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  Alert,
  Radio,
  Space,
  notification,
} from "antd";
import axios from "axios";

const { Option } = Select;

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

const CreateExport = ({ handleChangeTab }) => {
  const [Camions, setCamions] = useState([]);
  const [loading, setLoading] = useState(true);

  const camionsList = Camions.map((e, idx) => {
    return (
      <Option value={e.ID} key={idx}>
        {e.matricule}
      </Option>
    );
  });

  const [form] = Form.useForm();

  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const fetch = () => {
    axios
      .get("https://port-app-tn.herokuapp.com/api/camion", {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        setCamions(data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const addData = (values) => {
    const information = {
      Type: "EXPORT",
      ...values,
    };
    axios
      .post(`https://port-app-tn.herokuapp.com/api/reservation/`, information, {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        handleChangeTab("2", true);
        notification.success({ message: data.data.message });
        form.resetFields();
      })
      .catch((err) => {
        notification.open({
          message: err.response.data.message,
          type: "error",
        });
      });
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form form={form} {...formItemLayout} onFinish={addData}>
      <Form.Item label="Camion" name={"CamionID"} required>
        <Select style={{ width: 120 }} loading={loading}>
          {camionsList}
        </Select>
      </Form.Item>

      <Form.Item required name="CreationDate" label="Date Creation">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item name="Dimension" label="container dimension">
        <Input placeholder="enter container dimension " name="Dimension" />
      </Form.Item>

      <Form.Item label="Imdg">
        <Radio.Group name="Imdg">
          <Radio value={true}>True</Radio>
          <Radio value={false}>False</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="ContainerMatricule"
        requiredMark
        label="container matricule"
      >
        <Input
          placeholder="enter container matricule "
          name="ContainerMatricule"
        />
      </Form.Item>
      <Form.Item name="ContainerType" label="container type">
        <Input placeholder="enter container type " name="ContainerType" />
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
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" danger htmlType="reset">
            clear information
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateExport;

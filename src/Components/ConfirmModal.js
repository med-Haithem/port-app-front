import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
const ConfirmModal = ({ title, visible, setIsModalVisible, selectedItem }) => {
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
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirmReservation = (values) => {
    const getlocal = localStorage.getItem("token");
    const bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";

    axios
      .patch(
        "https://port-app-tn.herokuapp.com/api/reservation/" + selectedItem,
        { ...values, Status: "RESOLVED" },
        {
          headers: {
            authorization: bearer,
          },
        }
      )
      .then((data) => {
        notification.success({ message: data.data.message });
        handleCancel();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const [form] = useForm();
  return (
    <div>
      <Modal
        title={title + " of reservation n° " + selectedItem}
        visible={visible}
        onOk={handleOk}
        key={selectedItem}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="camions_related_controls"
          onFinish={handleConfirmReservation}
          {...formItemLayout}
        >
          <Form.Item name="Position" label="container position">
            <Input placeholder="Please input your container's position " />
          </Form.Item>
          <Form.Item name="Block" label="container block">
            <Input placeholder="Please input your container's block " />
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
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConfirmModal;

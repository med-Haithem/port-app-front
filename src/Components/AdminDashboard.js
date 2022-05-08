import React from "react";
import { Layout, Menu, Button } from "antd";

import {
  CarOutlined,
  FieldTimeOutlined,
  ImportOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

const AdminDashboard = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const history = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const logout = () => {
    localStorage.removeItem("token");
    history("/admin/login");
  };

  const { pathname } = useLocation();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div className="logo" />
        <Menu
          style={{ marginTop: 60 }}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          defaultSelectedKeys={pathname}
          activeKey={pathname}
          theme="dark"
        >
          <Menu.Item key="/admin/container">
            <CarOutlined />
            <span>containers</span>
            <Link to="/admin/container" />
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <FieldTimeOutlined />
                <span>Reservations</span>
              </span>
            }
          >
            <Menu.Item key="/admin/import">
              <ImportOutlined />
              <span>Import</span>
              <Link to="/admin/import" />
            </Menu.Item>
            <Menu.Item key="/admin/export">
              <ExportOutlined />
              <span>Export</span>
              <Link to="/admin/export" />
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button style={{ marginRight: 20 }} onClick={logout}>
            logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 580 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminDashboard;

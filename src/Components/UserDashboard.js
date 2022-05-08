import React from "react";
import { Layout, Menu, Button, Icon } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CarOutlined,
  FieldTimeOutlined,
  ImportOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

const UserDashboard = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const history = useNavigate();
  const { pathname } = useLocation();
  const logout = () => {
    localStorage.removeItem("token");
    history("/login");
  };

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
          theme="dark"
          defaultSelectedKeys={pathname}
          activeKey={pathname}
        >
          <Menu.Item key="/user/camions">
            <CarOutlined />
            <span>camions</span>
            <Link to="/user/camions" />
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
            <Menu.Item key="/user/import">
              <ImportOutlined />
              <span>Import</span>
              <Link to="/user/import" />
            </Menu.Item>
            <Menu.Item key="/user/export">
              <ExportOutlined />
              <span>Export</span>
              <Link to="/user/export" />
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
export default UserDashboard;

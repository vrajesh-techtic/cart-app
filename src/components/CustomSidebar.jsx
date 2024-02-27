import React, { useState } from "react";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  XOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

import logo from "../assets/cart-logo.png";

import CartModal from "./CartModal";

import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const CustomSideBar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  let url_str = document.URL;
  let url = new URL(url_str);
  return (
    <>
      {openModal ? (
        <CartModal
          showModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
      ) : null}
      <Layout className="h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Button
            className=" bg-white my-10 mx-auto flex self-center items-center border p-5 rounded-xl "
            onClick={() => navigate("/")}
          >
            <img src={logo} width={35} alt="Website Logo" />
          </Button>

          <div className="demo-logo-vertical " />
          <Menu
            theme="dark"
            mode="inline"
            defaultValue={url.pathname}
            selectedKeys={[url.pathname]}
            // activeKey={activeTab}

            items={[
              {
                key: "/",
                icon: <HomeOutlined />,
                label: "Home",
                onClick: () => {
                  navigate("/");
                },
              },
              {
                key: "/profile",
                icon: <UserOutlined />,
                label: "Profile",
                onClick: () => {
                  navigate("/profile");
                },
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: "1.5rem" }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: "1.5rem" }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "1rem",
                width: 80,
                height: 80,
              }}
            />

            <Button
              type="text"
              icon={<ShoppingCartOutlined style={{ fontSize: "2rem" }} />}
              className="mx-10"
              onClick={() => setOpenModal(true)}
              style={{
                fontSize: "1rem",
                width: 80,
                height: 80,
              }}
            ></Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default CustomSideBar;

import React, { useState } from "react";
import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Empty } from "antd";
import "./index.scss";

export default function Phone(
  { title, children, position, mode, banner, address, time }:
    {
      title: string;
      children?: string;
      position: any;
      mode: "clasic_activity" | "free_activity" | "clasic_roadshow" | "free_roadshow" | "clasic_workspace" | "free_workspace";
      banner: string;
      address: string;
      time: string;
    }) {
  const [ scale, setScale ] = useState(100);

  const items: MenuProps[ "items" ] = [
    {
      key: "1",
      label: <p onClick={() => setScale(100)}>100%</p>,
    },
    {
      key: "1",
      label: <p onClick={() => setScale(75)}>75%</p>,
    },
    {
      key: "1",
      label: <p onClick={() => setScale(50)}>50%</p>,
    },
  ];
  return (
    <div className="tsc-phone" style={{ position: position }}>
      <div className="tsc-phone-hint">
        <p className="tsc-phone-hint-title">显示比例</p>
        <Dropdown menu={{ items }}>
          <Space>
            {`${scale}%`}
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>

      <div
        className="tsc-phone-wrapper"
        style={{ transform: `scale(${scale / 100})`, transformOrigin: "50% 0" }}
      >
        <img
          src={require("../../assets/img/phone.png")}
          alt="phone"
          className="tsc-phone-header"
        />
        <div className="tsc-phone-navbar">
          <LeftOutlined />
          <p className="tsc-phone-navbar-title">{title}</p>
          <div></div>
        </div>

        {
          (mode === "free_activity" || mode === "free_roadshow" || mode === "free_workspace") && children &&
          <div
            dangerouslySetInnerHTML={{ __html: children }}
            className="tsc-phone-content"
          />
        }
        {
          (mode === "free_activity" || mode === "free_roadshow" || mode === "free_workspace") && !children &&
          <Empty description="还没有输入内容" style={{ marginTop: 200 }} />
        }
        {
          (mode === "clasic_activity" || mode === "clasic_roadshow") &&
          <>
            <div className="tsc-phone-img"><img alt="" src={banner} /></div>
            <div className="tsc-phone-info">
              <p className="tsc-phone-info-title">{title}</p>
              <p className="tsc-phone-info-p">地址：{address !== "" ? address : "暂未填写地址"}</p>
              <p className="tsc-phone-info-p">时间：{time !== "" ? time : "暂未填写地址"}</p>
            </div>
            {
              children ? <div
                dangerouslySetInnerHTML={{ __html: children }}
                className="tsc-phone-content"
              /> : <Empty description="活动内容空空如也" style={{ marginTop: 20 }} />
            }
          </>
        }
      </div>
    </div>
  );
}

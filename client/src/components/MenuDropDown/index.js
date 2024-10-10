import React from "react";
import { Dropdown, Menu } from "antd";

const MenuDropdown = ({getSelection, items, triggerElement }) => {
  const menu = (
    <Menu onClick={getSelection}>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return <Dropdown overlay={menu} trigger={["click"]}>{triggerElement}</Dropdown>;
};

export default MenuDropdown;


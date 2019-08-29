import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="hcontainer">
        <div className="back">返回</div>
        <div className="title">购物车</div>
        <div className="menu">菜单</div>
      </div>
    </div>
  );
}

export default Header;

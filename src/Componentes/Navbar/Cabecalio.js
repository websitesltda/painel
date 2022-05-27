import React from 'react';
import 'antd/dist/antd.css';
import './../../index.css';
import { Layout } from 'antd';
const { Header } = Layout;

export default function Cabecalio() {

    return (

        <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      />

    );
}



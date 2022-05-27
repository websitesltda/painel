import React from 'react';
import 'antd/dist/antd.css';
import './../../index.css';
import { Layout } from 'antd';
const { Footer } = Layout;

export default function Rodape() {

    return (

        <Footer style={{ textAlign: 'center' }}>
       Desenvolvido por Caio Oliveira @{new Date().getFullYear()}
      </Footer>


    );
}



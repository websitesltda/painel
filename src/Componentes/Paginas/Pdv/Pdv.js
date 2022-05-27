import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './../../../index.css';
import { Layout, Breadcrumb, Table, Button, Radio, Drawer, Space, notification, Pagination } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Form, Col, Row, Input, Select, DatePicker } from 'antd';
const { Content } = Layout;

export default function Pdv() {
    const [tipo, setTipo] = useState('Produtos');
    const [categorias, setCategorias] = useState([{}]);
    const [produtos, setProdutos] = useState([{}]);
    const [mesas, setMesas] = useState([{}, {}, {}]);
    const [carrinho, setCarrinho] = useState([{}, {}, {}]);
    return (

        <Content style={{ margin: '0 16px', overflow: 'hidden' }} >
            <Breadcrumb style={{ margin: '16px 0' }} >
                <Breadcrumb.Item>Gulosinho</Breadcrumb.Item>
                <Breadcrumb.Item>Pdv</Breadcrumb.Item>
            </Breadcrumb>

            <div
                className="site-layout-background"
                style={{ minHeight: '95%', }} >
                <Row style={{ height: '100%', width: '100%' }}>
                    <Col style={{ height: '80vh', width: '100%', padding: 10 }} span={17} push={7}>
                        <Row >
                            <Col style={{ height: '10vh' }} span={8}>
                                <Button accesskey="1" onClick={() => setTipo('Produtos')} type="primary" style={{ backgroundColor: tipo === 'Produtos' ? '#33206E' : '#cecece', width: '100%', borderWidth: 0, minHeight: '10%' }}>
                                    <text style={{ fontWeight: 'bold', fontSize: 17 }}>Produtos</text>
                                </Button >
                            </Col>
                            <Col style={{ height: '10vh' }} span={8}>
                                <Button accesskey="2" onClick={() => setTipo('Categorias')} type="primary" style={{ backgroundColor: tipo === 'Categorias' ? '#33206E' : '#cecece', width: '100%', borderWidth: 0, minHeight: '10%' }}>
                                    <text style={{ fontWeight: 'bold', fontSize: 17 }}>Categorias</text>
                                </Button >
                            </Col>
                            <Col style={{ height: '10vh' }} span={8}>
                                <Button accesskey="3" onClick={() => setTipo('Mesas')} type="primary" style={{ backgroundColor: tipo === 'Mesas' ? '#33206E' : '#cecece', width: '100%', borderWidth: 0, minHeight: '10%' }}>
                                    <text style={{ fontWeight: 'bold', fontSize: 17 }}>Mesas</text>
                                </Button >
                            </Col>
                            {tipo === 'Mesas' ?
                                <div style={{ display: 'flex', flexDirection: 'row', height: '70vh', flexWrap: 'wrap', justifyContent: 'center' }}>

                                    {mesas.map((m, index) => (
                                        <Button key={index} title={'Total Consumido: R$124,00'} style={{ width: 120, margin: 5, height: 120, display: 'flex', borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
                                            <img style={{ width: 100 }} src={'icones/mesaOFF.png'} />
                                            <text style={{ position: 'absolute', marginTop: -24, fontWeight: 'bold', color: 'white', fontSize: 17 }}>{index + 1}</text>
                                        </Button>
                                    ))}

                                </div> : null}


                            {tipo === 'Produtos' ?
                                <>
                                    <div style={{ display: 'flex', marginTop: -50, width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        <input accesskey="p" value={''} style={{ outline: 0, paddingLeft: 10, backgroundColor: '#cecece', borderWidth: 0, width: '90%', height: 40, borderRadius: 40, boxShadow: "0px 0px 0.2em #cecece" }} placeholder="Pesquisar produto ( Shift + Alt + P )" type="text" />
                                    </div>

                                    <div style={{ display: 'flex', marginTop: 0, width: '100%', height: '70vh', flexDirection: 'row', overflow: 'auto', flexWrap: 'wrap', justifyContent: 'center' }}>

                                        {produtos.map((p, index) => (
                                            <Button key={index} title={'Descrição: Alface, Tomate, Ovo, Bacon'} style={{ width: 150, margin: 5, backgroundColor: '#fff', height: 220, display: 'flex', borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderColor: '#33206E', borderWidth: 1 }}>
                                                <img style={{ width: 140, position: 'absolute', top: 0, marginTop: 20 }} src={'https://noticiapositiva.com.br/wp-content/uploads/2019/09/19.09-mcdonalds.png'} />
                                                <text style={{ color: '#545454', position: 'absolute', bottom: 0, marginBottom: 70, fontSize: 20, fontWeight: 'bold' }}>X-Tudo</text>
                                                <text style={{ color: '#545454', position: 'absolute', bottom: 0, marginBottom: 45, fontSize: 16 }}>R$18,50</text>
                                                <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', bottom: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, height: 40, width: '100%', backgroundColor: '#33206E' }}>
                                                    <text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>ADICIONAR</text>
                                                </div>
                                            </Button>
                                        ))}

                                    </div>
                                </>
                                : null}

                            {tipo === 'Categorias' ?
                                <>
                                    <div style={{ display: 'flex', marginTop: -50, width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        <input accesskey="c" value={''} style={{ outline: 0, paddingLeft: 10, backgroundColor: '#cecece', borderWidth: 0, width: '80%', height: 40, borderRadius: 40, boxShadow: "0px 0px 0.2em #cecece" }} placeholder="Pesquisar categorias ( Shift + Alt + C )" type="text" />
                                    </div>

                                    <div style={{ display: 'flex', marginTop: 0, width: '100%', height: '70vh', flexDirection: 'row', flexWrap: 'wrap', overflow: 'auto', justifyContent: 'center' }}>

                                        {categorias.map((c, index) => (
                                            <Button key={index} title={'Descrição: Alface, Tomate, Ovo, Bacon'} style={{ width: 150, margin: 5, backgroundColor: '#fff', height: 180, display: 'flex', borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderColor: '#33206E', borderWidth: 1 }}>
                                                <img style={{ width: 140, position: 'absolute', top: 0, marginTop: 20 }} src={'https://noticiapositiva.com.br/wp-content/uploads/2019/09/19.09-mcdonalds.png'} />
                                                <text style={{ color: '#545454', position: 'absolute', bottom: 0, marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>X-Tudo</text>
                                            </Button>
                                        ))}

                                    </div>
                                </>
                                : null}


                        </Row>
                    </Col>
                    <Col style={{ height: '79.5vh', width: '100%' }} span={7} pull={17}>
                        <div style={{ backgroundColor: '#fce5cd', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '85%' }}>

                            <div style={{ height: '67vh', width: '100%', display:'flex', alignItems:'center',flexDirection: 'column',overflow: 'auto' }}>

                                {carrinho.map((c, index) => (
                                    <button key={index} onClick={()=>alert('teste')} style={{ width: '95%', flexDirection: 'row', borderWidth: 0, paddingRight: 10, paddingLeft: 10, alignItems: 'center', justifyContent: 'space-between', display: 'flex', minHeight: 40, marginTop: 10, maxHeight: 80, backgroundColor: '#cecece' }}>
                                        <text>( 2x ) - XTudo</text>
                                        <text>R$24,00</text>
                                    </button>
                                ))}

                            </div>

                        </div>
                        <div style={{ backgroundColor: '#cecece', minHeight: '16%' }}>

                        </div>
                    </Col>
                </Row>
            </div>
        </Content>

    );
}



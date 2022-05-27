import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './../../../index.css';
import { Layout, Breadcrumb, Table, Button, Radio, Drawer, Space, notification } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import icones from './icones.js';

import { Form, Col, Row, Input, Select, DatePicker } from 'antd';
const { Content } = Layout;
const { Option } = Select;

export default function Adicionais() {
    const [visible, setVisible] = useState(false);
    const [id, setID] = useState('');
    const [iconeSell, setIconeSell] = useState('');
    const [grupos, setGrupos] = useState([{ id: '1', codigo: 'DL-1654615', grupo: 'Sabores de borda', quantidade: '6' }]);
    const [adicionais, setAdicionais] = useState([{ id: '1', codigo: 'DL-1654615', icone: 'abacaxi.png', adicional: 'Abacaxi', valor: '2,50', medida: 'Uni', estoque: '500', ordem: '1', breve_descricao: '6 Fatias de Abacaxi' }]);
    function abrirModal(params) {
        if (id === '') {
            setID(params);
        } else {
            setID('');
        }
        setVisible(!visible);
    };

    const columns1 = [
        {
            title: 'CODIGO',
            dataIndex: 'codigo',
        },
        {
            title: 'GRUPO',
            dataIndex: 'grupo',
        },
        {
            title: 'QUANTIDADE MAXIMA ITENS',
            dataIndex: 'quantidade',
        },
        {
            title: 'AÇÕES',
            dataIndex: 'id',
            key: 'x',
            render: (dataIndex) =>
                <Radio.Group >
                    <Button title="Ver Pedido" style={{ marginRight: 2, backgroundColor: 'purple', color: 'white' }} onClick={() => abrirModal(dataIndex)} icon={<EyeOutlined />} size={40} />
                    <Button title="Aceitar" style={{ marginRight: 2, backgroundColor: 'green', color: 'white' }} onClick={() => openNotification('bottom', dataIndex)} icon={<CheckOutlined />} size={40} />
                    <Button title="Recusar" style={{ marginRight: 2, backgroundColor: 'red', color: 'white' }} onClick={() => openNotification('bottom', dataIndex)} icon={<CloseOutlined />} size={40} />
                </Radio.Group>,
        },
    ];

    const columns2 = [
        {
            title: 'CODIGO',
            dataIndex: 'codigo',
        },
        {
            title: 'ICONE',
            dataIndex: 'icone',
            render: (dataIndex) =>
            <div style={{ borderRadius: 80, width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cecece' }}>
                <img style={{width:'80%', height:'80%', borderRadius: 80}} src={ window.location.origin + '/icones/' + dataIndex} />
            </div>,
        },
        {
            title: 'ADICIONAL',
            dataIndex: 'adicional',
        },
        {
            title: 'VALOR',
            dataIndex: 'valor',
        },
        {
            title: 'MEDIDA',
            dataIndex: 'medida',
        },
        {
            title: 'ESTOQUE',
            dataIndex: 'estoque',
        },
        {
            title: 'ORDEM DE APRESENTAÇÃO',
            dataIndex: 'ordem',
        },
        {
            title: 'BREVE DESCRIÇÃO',
            dataIndex: 'breve_descricao',
        },
        {
            title: 'AÇÕES',
            dataIndex: 'id',
            key: 'x',
            render: (dataIndex) =>
                <Radio.Group >
                    <Button title="Ver Pedido" style={{ marginRight: 2, backgroundColor: 'purple', color: 'white' }} onClick={() => abrirModal(dataIndex)} icon={<EyeOutlined />} size={40} />
                    <Button title="Aceitar" style={{ marginRight: 2, backgroundColor: 'green', color: 'white' }} onClick={() => openNotification('bottom', dataIndex)} icon={<CheckOutlined />} size={40} />
                    <Button title="Recusar" style={{ marginRight: 2, backgroundColor: 'red', color: 'white' }} onClick={() => openNotification('bottom', dataIndex)} icon={<CloseOutlined />} size={40} />
                </Radio.Group>,
        },
    ];


    const openNotification = (placement, id) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Radio.Group >
                <Button type="primary" style={{ marginRight: 10 }} danger size="small" onClick={() => notification.close(key)}>
                    Cancelar
                </Button>
                <Button type="primary" style={{ backgroundColor: 'green' }} >
                    Aceitar
                </Button>
            </Radio.Group>
        );
        notification.open({
            message: 'Qual o tempo de espera ?',
            description: <input value={'60 Minutos'} style={{ outline: 0, borderWidth: 0, width: '100%', height: 40, borderRadius: 40, boxShadow: "0px 0px 0.5em #cecece" }} placeholder="Ex: 60 Minutos" type="text" />,
            placement,
            btn,
            key,
        });
    };


    return (

        <Content style={{ margin: '0 16px' }} >
            <Breadcrumb style={{ margin: '16px 0' }} >
                <Breadcrumb.Item>Gulosinho</Breadcrumb.Item>
                <Breadcrumb.Item>Adicionais</Breadcrumb.Item>
            </Breadcrumb>

            <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }} >
                <Table style={{ marginTop: 20 }} columns={columns1} dataSource={grupos} />
            </div>

            <div
                className="site-layout-background"
                style={{ padding: 24, marginTop: 20, minHeight: 360 }} >
                <Table style={{ marginTop: 20 }} columns={columns2} dataSource={adicionais} />
            </div>

            <Drawer
                title="NOVO ADICIONAL"
                placement={'right'}
                width={600}
                onClose={() => setVisible(false)}
                closable={false}
                visible={visible}
                extra={
                    <Space>
                        <Button onClick={() => setVisible(false)}>Cancelar</Button>
                        <Button onClick={() => setVisible(false)}>Salvar</Button>
                    </Space>
                }
            >
                <div style={{ width: '100', border: '1px solid #cecece', minHeight: '100%', backgroundColor: '#fff' }}>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button style={{ backgroundColor: '#fce5cd', borderWidth: 0, width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 20, borderRadius: 10 }}>
                            <img style={{ marginTop: 20, width: 200, height: '100%', borderRadius: 15, }} src={iconeSell === '' ? 'produto.png' : window.location.origin + '/icones/' + iconeSell} />
                        </button>
                    </div>



                    <Form layout="vertical" style={{ padding: 15 }} hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={5}>
                                <Form.Item
                                    name="owner"
                                    label="Icone"
                                    rules={[{ required: true, message: 'Icone' }]}
                                >
                                    <Select value={iconeSell} onChange={(value) => setIconeSell(value)} placeholder="Icone">
                                        {icones.map((i, index) => (
                                            <Option key={index} value={i}><img style={{ width: 25, height: 25 }} src={window.location.origin + '/icones/' + i} /></Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={19}>
                                <Form.Item
                                    name="name"
                                    label="Nome do acicional"
                                    rules={[{ required: true, message: 'Nome do acicional' }]}
                                >
                                    <Input placeholder="Nome do acicional" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Valor"
                                    rules={[{ required: true, message: 'Valor' }]}
                                >
                                    <Input
                                        addonBefore="R$"
                                        placeholder="Valor"
                                        addonAfter={
                                            <Select placeholder="Medida">
                                                <Option title="Unidade" value="Uni">Uni</Option>
                                                <Option title="Kilo" value="Kg">Kg</Option>
                                                <Option title="Pacote" value="Pc">Pc</Option>
                                                <Option title="Fardo" value="Far">Far</Option>
                                                <Option title="Centimetros" value="Cm">Cm</Option>
                                            </Select>
                                        } />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Estoque"
                                    rules={[{ required: true, message: 'Estoque' }]}
                                >
                                    <Input placeholder="Estoque" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                           
                        <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Ordem de apresentação"
                                    rules={[{ required: true, message: 'Ordem de apresentação' }]}
                                >
                                    <Input placeholder="Ordem de apresentação" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="description"
                                    label="Breve descrição"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Breve descrição',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={2} placeholder="Breve descrição" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                </div>
            </Drawer>


        </Content>

    );
}



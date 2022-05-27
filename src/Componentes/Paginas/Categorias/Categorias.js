import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './../../../index.css';
import { Layout, Breadcrumb, Table, Button, Radio, Drawer, Space, notification } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Form, Col, Row, Input, Select, DatePicker } from 'antd';
const { Content } = Layout;

export default function Categorias() {
    const [visible, setVisible] = useState(false);
    const [visible_L, setVisible_L] = useState(false);
    const [id, setID] = useState('');
    const [buscar_imagens, setBuscar_imagens] = useState('');
    const api_imagen = 'https://arquivo.pt/imagesearch?q=' + buscar_imagens + '&from=19960101000000&to=20220122163016&maxItems=1000';
    const [categorias, setCategorias] = useState([{ id: '1', codigo: 'DL-1654615', foto: 'produto.png', categoria: 'Lanches', breve_descricao: 'Lanches de melhor', ordem: '1', adicionais: 'DL-165165' }]);
    const [imagens, setImagens] = useState([]);
    const [imagen, setImagen] = useState('');
    function abrirModal(params) {
        if (id === '') {
            setID(params);
        } else {
            setID('');
        }
        setVisible(!visible);
    };
    function escolherIMG(params) {
        if (imagen === '') {
            setImagen(params);
        } else if (imagen === params) {
            setImagen('');
        } else {
            setImagen(params);
        };
    };

    async function BuscarImagens() {
        const res = await axios.get(api_imagen);
        if (res.data.responseItems.length > 0) {
            setImagens(res.data.responseItems);
        } else {
            setImagens([]);
        };
    };

    useEffect(() => {
        BuscarImagens();
    }, [buscar_imagens]);

    const columns = [
        {
            title: 'CODIGO',
            dataIndex: 'codigo',
        },
        {
            title: 'FOTO',
            dataIndex: 'foto',
            render: (dataIndex) =>
                <div style={{ borderRadius: 80, width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cecece' }}>
                    <img style={{width:'100%', height:'100%', borderRadius: 80}} src={dataIndex} />
                </div>,
        },
        {
            title: 'CATERGORIA',
            dataIndex: 'categoria',
        },
        {
            title: 'BREVE DESCRIÇÃO',
            dataIndex: 'breve_descricao',
        },
        {
            title: 'ORDERM DE APRESENTAÇÃO',
            dataIndex: 'ordem',
        },
        {
            title: 'ADICIONAIS',
            dataIndex: 'adicionais',
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

    const imagemsell = imagens.filter((i, index) => (index === imagen));
    const { Option } = Select;
    return (

        <Content style={{ margin: '0 16px' }} >
            <Breadcrumb style={{ margin: '16px 0' }} >
                <Breadcrumb.Item>Gulosinho</Breadcrumb.Item>
                <Breadcrumb.Item>Categorias</Breadcrumb.Item>
            </Breadcrumb>

            <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }} >

                <Table style={{ marginTop: 20 }} columns={columns} dataSource={categorias} />

            </div>

            <Drawer
                title="NOVA CATEGORIA"
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
                            <img style={{ marginTop: 20, width: 200, height: '100%', borderRadius: 15, }} src={'produto.png'} />
                        </button>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: 10, marginTop: 20, backgroundColor: '#fff' }}>
                        <label className="labelInput" for="arquivo">Enviar imagem</label>
                        <input type="file" name="arquivo" id="arquivo" />

                        <label className="labelInput" onClick={() => setVisible_L(true)}>Galeria</label>

                    </div>

                    <Form layout="vertical" style={{ padding: 15 }} hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Codigo da categoria"
                                    rules={[{ required: true, message: 'Codigo da categoria' }]}
                                >
                                    <Input placeholder="Codigo da categoria" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Nome da categoria"
                                    rules={[{ required: true, message: 'Nome da categoria' }]}
                                >
                                    <Input placeholder="Nome da categoria" />
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
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
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

            <Drawer
                title="ESCOLHER IMAGEM"
                placement={'left'}
                width={800}
                onClose={() => setVisible_L(false)}
                closable={false}
                visible={visible_L}
                extra={
                    <Space>
                        <Button onClick={() => setVisible_L(false)}>Cancelar</Button>
                        <Button onClick={() => setVisible_L(false)}>Salvar</Button>
                    </Space>
                }
            >
                <div style={{ width: '100', flexDirection: 'column', border: '1px solid #cecece', minHeight: '100%', backgroundColor: '#fce5cd', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                    <div style={{ width: '100%', padding: 10, height: 70, backgroundColor: '#fff' }}>
                        <input value={buscar_imagens} onChange={(value) => setBuscar_imagens(value.target.value)} style={{ outline: 0, paddingLeft: 10, backgroundColor: '#cecece', borderWidth: 0, width: '100%', height: 40, borderRadius: 40, boxShadow: "0px 0px 0.5em #cecece" }} placeholder="Palavra chave" type="text" />
                    </div>

                    <div>
                        <center>
                            {imagens.map((i, index) => (
                                <button onClick={() => escolherIMG(index)}>
                                    <img id={'img'} style={{ width: 104.7, height: 100, opacity: imagen === index || imagen === '' ? 1 : 0.5 }} src={i.imgLinkToArchive} />
                                </button>
                            ))}
                        </center>
                    </div>

                </div>
            </Drawer>

        </Content>

    );
}



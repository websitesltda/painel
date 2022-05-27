import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './../../../index.css';
import { Layout, Breadcrumb, Table, Button, Radio, Drawer, Space,  notification } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import QRCode from "react-qr-code";

const { Content } = Layout;

export default function Pedidos() {
    const [visible, setVisible] = useState(false);
    const [id, setID] = useState('');

    function imprimir() {
        var conteudo = document.getElementById('pedido').innerHTML,
            tela_impressao = window.open('about:blank');
        tela_impressao.document.open();
        tela_impressao.document.write(conteudo);
        tela_impressao.window.print();
        tela_impressao.window.focus();
        tela_impressao.window.close();

    }
    const [pedidos, setPedidos] = useState([{ id: '1', data: '24/04/2022', pedido: 'DL-164659', cliente: 'Nadia Pereira Rodrigues', modo_de_entrega: 'Delivery', modo_de_pagamento: 'Dinheiro', valor: '50.00', troco: '100.00', status: 'Aceito', tempo: '60 Minutos' }, { id: '2', data: '24/04/2022', pedido: 'DL-1949659', cliente: 'Caio Silva Oliveira', modo_de_entrega: 'Buscar no local', modo_de_pagamento: 'Dinheiro', valor: '50.00', troco: '100.00', status: 'Aceito', tempo: '60 Minutos' }]);

    const [atualizador, setAtualizador] = useState(0);
    const pedidosN = pedidos.filter(f => (f.status.toString() === 'Aguardando'));

    function novopedido() {
        var audio = new Audio('novo.mp3');
        audio.addEventListener('canplaythrough', function () {
            audio.play();
            audio.loop()
        });
    };

    function confirmar() {
        notification.close();
    };

    useEffect(() => {
        setTimeout(function () {
            if (pedidosN.length > 0) {
                setAtualizador(atualizador + 1)
                novopedido();
            } else {
                setAtualizador(atualizador + 1)
            };
        }, 2500);
    }, [atualizador])

    function abrirModal(params) {
        if (id === '') {
            setID(params);
        } else {
            setID('');
        }
        setVisible(!visible);
    };

    const columns = [
        {
            title: 'PEDIDO',
            dataIndex: 'pedido',
        },
        {
            title: 'DATA',
            dataIndex: 'data',
            sorter: {
                compare: (a, b) => a.data - b.data,
                multiple: 3,
            },
        },
        {
            title: 'CLIENTE',
            dataIndex: 'cliente',
        },
        {
            title: 'MODO DE ENTREGA',
            dataIndex: 'modo_de_entrega',
            render: (dataIndex) =>
                <div style={{ borderRadius: 30, minWidth: 80, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
                    <text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{dataIndex}</text>
                </div>,
        },
        {
            title: 'MODO DE PAGAMENTO',
            dataIndex: 'modo_de_pagamento',
            render: (dataIndex) =>
                <div style={{ borderRadius: 30, minWidth: 80, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
                    <text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{dataIndex}</text>
                </div>,
        },
        {
            title: 'VALOR',
            dataIndex: 'valor',
        },
        {
            title: 'LEVAR DE TROCO',
            dataIndex: 'troco',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            render: (dataIndex) =>
                <div style={{ borderRadius: 30, minWidth: 80, maxWidth: 150, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: dataIndex === 'Aceito' ? 'green' : '#f44336' }}>
                    <text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{dataIndex}</text>
                </div>,
        },
        {
            title: 'TEMPO DE ESPERA',
            dataIndex: 'tempo',
            render: (dataIndex) =>
                <div style={{ borderRadius: 30, minWidth: 80, maxWidth: 150, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#545454' }}>
                    <text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{dataIndex}</text>
                </div>,
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
                <Button type="primary" style={{ backgroundColor: 'green' }} onClick={confirmar}>
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
                <Breadcrumb.Item>Pedidos</Breadcrumb.Item>
            </Breadcrumb>

            <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }} >

                <Table style={{ marginTop: 20 }} columns={columns} dataSource={pedidos} />

            </div>

            <Drawer
                title="#PEDIDO: DL-519814"
                placement={'right'}
                width={400}
                onClose={() => setVisible(false)}
                closable={false}
                visible={visible}
                extra={
                    <Space>
                        <Button onClick={() => imprimir()}>Imprimir</Button>
                        <Button onClick={() => setVisible(false)}>Fechar</Button>
                    </Space>
                }
            >
                <div id="pedido" style={{ width: '100', border: '1px solid #cecece', minHeight: '10%', backgroundColor: '#fce5cd' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img style={{ marginTop: 20, width: 200, height: '100%' }} src={'https://seeklogo.com/images/F/food-logo-59E5A73AFD-seeklogo.com.png'} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                        <h3>#PEDIDO: DL-519814</h3>
                        <p>Pedido realizado em: 24/04/2022 as 18:57</p>
                        <p>{'//////////////////////////////////////////////////////'}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                        <h3>ITENS DO PEDIDO</h3>

                        <div style={{ width: '95%', minHeight: 40, alignItems: 'center', justifyContent: 'center', padding: 5, marginTop: 10, border: '1px solid #cecece', backgroundColor: '#faf0e6' }}>


                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: 17, fontWeight: 'bold' }}>( 2x ) - Misto Quente</p>
                                <text style={{ fontSize: 17, marginRight: 5, fontWeight: 'bold' }}>R$14,00</text>
                            </div>
                            <div style={{ flexDirection: 'column', display: 'flex' }}>
                                <text style={{ fontSize: 13, marginTop: -10, width: '75%' }}><text style={{ fontWeight: 'bold' }}>Adc:</text> Sem Milho e por favor trazer uma coca cola gelada </text>
                                <text style={{ fontSize: 13, marginTop: 0, width: '75%' }}><text style={{ fontWeight: 'bold' }}>Obs:</text> Sem Milho e por favor trazer uma coca cola gelada </text>
                            </div>
                            <p>------------------------------------------------------</p>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: 17, fontWeight: 'bold' }}>( 2x ) - Misto Quente</p>
                                <text style={{ fontSize: 17, marginRight: 5, fontWeight: 'bold' }}>R$14,00</text>
                            </div>
                            <div style={{ flexDirection: 'column', display: 'flex' }}>
                                <text style={{ fontSize: 13, marginTop: -10, width: '75%' }}><text style={{ fontWeight: 'bold' }}>Adc:</text> Sem Milho e por favor trazer uma coca cola gelada </text>
                                <text style={{ fontSize: 13, marginTop: 0, width: '75%' }}><text style={{ fontWeight: 'bold' }}>Obs:</text> Sem Milho e por favor trazer uma coca cola gelada </text>
                            </div>
                            <p>------------------------------------------------------</p>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: 17, fontWeight: 'bold' }}>( 2x ) - Misto Quente</p>
                                <text style={{ fontSize: 17, marginRight: 5, fontWeight: 'bold' }}>R$14,00</text>
                            </div>
                            <div style={{ flexDirection: 'column', display: 'flex' }}>
                                <text style={{ fontSize: 13, marginTop: -10, width: '75%' }}><text style={{ fontWeight: 'bold' }}>Adc:</text> Sem Milho e por favor trazer uma coca cola gelada </text>
                                <text style={{ fontSize: 13, marginTop: 0, width: '75%' }}><text style={{ fontWeight: 'bold' }}>Obs:</text> Sem Milho e por favor trazer uma coca cola gelada </text>
                            </div>

                        </div>

                    </div>

                    <div style={{ width: '100%', minHeight: 300, flexDirection: 'column', display: 'flex', alignItems: 'center', marginTop: 10, backgroundColor: '#fce5cd' }}>
                        <h3>TOTAL DO PEDIDO</h3>

                        <div style={{ backgroundColor: '#faf0e6', border: '1px solid #cecece', display: 'flex', flexDirection: 'column', width: '95%', padding: 5, minHeight: 50 }}>
                            <text style={{ fontSize: 15, width: '95%' }}><text style={{ fontWeight: 'bold' }}>Total do pedido:</text> <text style={{ float: 'right', textAlign: 'left' }}>R$42,00</text> </text>
                            <text style={{ fontSize: 15, width: '95%' }}><text style={{ fontWeight: 'bold' }}>Taxa de entrega:</text> <text style={{ float: 'right', textAlign: 'left' }}>R$7,00</text> </text>
                            <text style={{ fontSize: 18, width: '95%', border: '1px solid red', padding: 5 }}><text style={{ fontWeight: 'bold', fontSize: 15 }}>Total Final:</text> <text style={{ float: 'right', textAlign: 'left' }}>R$49,00</text> </text>
                        </div>
                        <br />
                        <h3>OBSERVAÇÕES</h3>

                        <div style={{ backgroundColor: '#faf0e6', border: '1px solid #cecece', display: 'flex', flexDirection: 'column', width: '95%', padding: 5, minHeight: 50 }}>
                            <text style={{ fontSize: 15, width: '95%' }}><text style={{ fontWeight: 'bold' }}>FORMA DE PAGAMENTO:</text> DINHERIO </text>
                            <text style={{ fontSize: 15, width: '75%' }}><text style={{ fontWeight: 'bold' }}>TROCO PARA:</text> R$50,00 - (R$1,00)</text>
                            <text style={{ fontSize: 15, width: '95%' }}><text style={{ fontWeight: 'bold' }}>OBS:</text> O mais rapido possivel </text>
                        </div>
                        <br />
                        <h3>DETALHES DA ENTREGA</h3>

                        <div style={{ backgroundColor: '#faf0e6', border: '1px solid #cecece', display: 'flex', flexDirection: 'column', width: '95%', padding: 5, minHeight: 50 }}>
                            <text style={{ fontSize: 15, width: '75%' }}><text style={{ fontWeight: 'bold' }}>Cliente:</text> Nadia Pereira Rodrigues </text>
                            <text style={{ fontSize: 15, width: '95%' }}><text style={{ fontWeight: 'bold' }}>Endereço:</text> Rua São Francisco, 416, Vila Formosa - São Sebastião do Paraiso/MG </text>
                        </div>
                        <br />
                        <h3>DETALHES DO ESTABELECIMENTO</h3>

                        <div style={{ backgroundColor: '#faf0e6', border: '1px solid #cecece', display: 'flex', flexDirection: 'column', width: '95%', padding: 5, minHeight: 50 }}>
                            <text style={{ fontSize: 15, width: '75%' }}><text style={{ fontWeight: 'bold' }}>Estabelecimento:</text> Gui Kebab </text>
                            <text style={{ fontSize: 15, width: '95%' }}><text style={{ fontWeight: 'bold' }}>Endereço:</text> Av. Angelo Calafiori,7845,Centro - São Sebastião do Paraiso/MG </text>
                            <text style={{ fontSize: 15, width: '95%' }}><text style={{ fontWeight: 'bold' }}>Telefone:</text> (35) 9 9958-5685 / (35) 3531-8569 </text>
                        </div>

                        <QRCode size={100} bgColor={'#fce5cd'} style={{ marginTop: 20 }} fgColor={'#33206E'} value={'https://www.google.com/'} />
                        <text>Golozinho - @{new Date().getFullYear()}</text>
                    </div>

                </div>
            </Drawer>

        </Content>

    );
}



import React from 'react';
import { ShoppingCartOutlined, ProfileOutlined,BookFilled, InsertRowAboveOutlined, SettingOutlined, TableOutlined, RestOutlined, PieChartOutlined, ShopOutlined, FireOutlined } from '@ant-design/icons';


const ListaMenu = [

  {
    title: 'PDV',
    path: '/pdv',
    icon: <ShoppingCartOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

  {
    title: 'PEDIDOS',
    path: '/pedidos',
    icon: <ProfileOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

  {
    title: 'CATEGORIAS',
    path: '/categorias',
    icon: <TableOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },
  {
    title: 'ADICIONAIS',
    path: '/adicionais',
    icon: <InsertRowAboveOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

  {
    title: 'PRODUTOS',
    path: '/produtos',
    icon: <RestOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

  {
    title: 'RELATIORIO',
    path: '/relatorio',
    icon: <PieChartOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

  {
    title: 'ASSINATURA',
    path: '/assinatura',
    icon: <ShopOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

  {
    title: 'MARKTING',
    path: '/markting',
    icon: <FireOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

  {
    title: 'CARDÁPIO',
    path: '/cardapio',
    icon: <BookFilled />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

  {
    title: 'CONFIGURAÇÔES',
    path: '/configuracoes',
    icon: <SettingOutlined />,
    cName: 'nav-text',
    cName2: 'nav-text2'
  },

];

export default ListaMenu;
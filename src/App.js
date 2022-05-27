import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navegador from './Componentes/Navbar/Navegador';
import Cabecalio from './Componentes/Navbar/Cabecalio';
import Rodape from './Componentes/Navbar/Rodape';

//////////////////// PAGINAS //////////////////////////

import Pedidos from './Componentes/Paginas/Pedidos/Pedidos';
import Categorias from './Componentes/Paginas/Categorias/Categorias';
import Adicionais from './Componentes/Paginas/Adicionais/Adicionais';
import Pdv from './Componentes/Paginas/Pdv/Pdv';
//////////////////////////////////////////////////////

const Paginas = () => {
  return (
    <Switch>
      <Route path='/pedidos' exact component={Pedidos} />
      <Route path='/categorias' exact component={Categorias} />
      <Route path='/adicionais' exact component={Adicionais} />
      <Route path='/pdv' exact component={Pdv} />
    </Switch>
  );
};

function App() {

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }} >
        <Navegador />
        <Layout className="site-layout">
          <Cabecalio />
          <Paginas />
          <Rodape />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

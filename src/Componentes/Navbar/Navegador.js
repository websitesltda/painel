import React, { useState , useEffect} from 'react';
import 'antd/dist/antd.css';
import './../../index.css';
import './Nav.css'
import { Link } from "react-router-dom";
import { Layout } from 'antd';
import ListaMenu from './ListaMenu';

export default function Navegador() {
    const { Sider } = Layout;
    const [abrir, setAbrir] = useState(true);
    const [ativo, setAtivo] = useState('');
    var url_atual = window.location.pathname;
    function setarnome() {
        setAtivo(url_atual)
    };
    useEffect(()=>{
        setarnome()
    },[])
    return (
        <Sider width={250} collapsible  style={{backgroundColor:'#33206E'}} collapsed={abrir} onCollapse={() => setAbrir(!abrir)}>
            <div className="logo" >
                {abrir === false ? <img src={'logo.png'}/>:<img src={'logo2.png'}/>} 
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {ListaMenu.map((item, index) => (
                    <li key={index} className={abrir === true ? item.cName2 : item.cName}>
                        <Link title={item.title} onClick={()=>setAtivo(item.path)} to={item.path}>
                            <span className={ativo === item.path  ? "spanactive":null}>{item.icon}</span>
                           {abrir === false ? <span className={ativo === item.path  ? "span2active":"span2"}>{item.title}</span>:null}
                        </Link>
                    </li>
                ))}
                
            </div>
        </Sider>
    );
}



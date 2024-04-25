
import { useState } from 'react';
import './App.css'
import {Form} from './components/Form'
import {Tables} from './components/Tables'

import {Reset} from './components/Reset'
import { MenuTrigger } from './components/MenuTrigger';
import { Menu} from './components/Menu'


function App() {

  const [tableData,setTableData] = useState('')
  const [listaPostos,setListaPostos] = useState([])
  const [terminalSelecionado,setTerminalSelecionado] = useState('Todos')
  const [listaTabelas,setListaTabelas] = useState([])
  const [tabelaSelecionada,setTabelaSelecionada] = useState('Todas')
  const [tipoFiltroMenu,setTipoFiltroMenu] = useState('hide')
  const [informacoesLinhas,setInformacoesLinhas] = useState('')
  const [nomeLinhas,setNomeLinhas] = useState([])

  function handleReset(){
    setTableData('');
    setListaPostos([])
    setTerminalSelecionado('Todos')
    setListaTabelas([])
    setTabelaSelecionada('Todas')
    setInformacoesLinhas('')
  }

  return (
    <div className='container'>
      {(!tableData)? 
        <Form setTableData={setTableData} setListaPostos={setListaPostos} listaTabelas={listaTabelas} setListaTabelas={setListaTabelas} setInformacoesLinhas={setInformacoesLinhas} nomeLinhas={nomeLinhas} setNomeLinhas={setNomeLinhas}/>
      :
      <>
      <MenuTrigger setTipoFiltroMenu={setTipoFiltroMenu}/>
      <Reset handleReset={handleReset}/>

      <Menu  listaPostos={listaPostos} setTerminalSelecionado={setTerminalSelecionado} listaTabelas={listaTabelas} setTabelaSelecionada={setTabelaSelecionada} TipoFiltro={tipoFiltroMenu} setTipoFiltroMenu={setTipoFiltroMenu} informacoesLinhas={informacoesLinhas}/>

      
      
      </>
      }

      <Tables tableData={tableData} terminalSelecionado={terminalSelecionado} tabelaSelecionada={tabelaSelecionada} informacoesLinhas={informacoesLinhas}  />
    </div>
  )
}

export default App

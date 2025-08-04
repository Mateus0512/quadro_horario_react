import { ConsultarLinha } from "./components/consultar_linha";
import { NavBar } from "./components/navbar";
import { useEffect,useState,useRef } from "react";
import { Menu } from "./components/menu";
import { QuadroDeHorario } from "./components/quadro_de_horario";
import { temas } from "./utils/temas";

export function App() {
  const [dia, setDia] = useState('');
  const [listaLinhas, setListaLinhas] = useState([]); 
  const hasRun = useRef(false);
  const [linhaSelecionada,setLinhaSelecionada] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [informacoesLinha, setInformacoesLinha] = useState({});
  const [tema, setTema] = useState(() => localStorage.getItem("theme") || "system");
  const [wrap,setWrap] = useState(()=> localStorage.getItem("wrap") || "no_wrap" );
  const [postoSelecionado,setPostoSelecionado] = useState('todos');
  const [tabelaSelecionada,setTabelaSelecionada] = useState('todas');


  async function consultarLinhas(){
      let request = await fetch("https://api-lyart-chi.vercel.app/linhas/");
      let data = await request.json();
      setListaLinhas(data)
  }

  function dataAtual(){
    let objetoDate = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    objetoDate = objetoDate.split(',')[0];
    objetoDate = objetoDate.split('/');
    objetoDate = `${objetoDate[2]}-${objetoDate[1]}-${objetoDate[0]}`;
    setDia(objetoDate);
  }

    useEffect(()=>{
      if(hasRun.current){
        return
    }
        consultarLinhas();
        dataAtual();
        carregarTema()
        hasRun.current = true
    },[]);

    async function pesquisarLinha(){
      try {
        const tipoLinha  = linhaSelecionada!=="" ?
        listaLinhas.find(linha => linha.numero==linhaSelecionada) :
        "";

        const dataSelecionada = dia.split('-');
        const request = await fetch(`https://api-lyart-chi.vercel.app/Programacao/${linhaSelecionada.split('-')[0]}?data=${dataSelecionada[0]}${dataSelecionada[1]}${dataSelecionada[2]}`);
        //const request = await fetch(`http://localhost:3333/Programacao/${linhaSelecionada.split('-')[0]}?data=${dataSelecionada[0]}${dataSelecionada[1]}${dataSelecionada[2]}`);
        if (!request.ok) {
          throw new Error('Não foi possível obter a programação. Código de status: ' + request.status);
        }

        const programacao = await request.json();
        
        //console.log(programacao)

        const informacoes = programacao.informacoesLinha
        //console.log(informacoes)

        const novasInformacoes = {...informacoes,tipoLinha: tipoLinha};

        //console.log(novasInformacoes);

        const novaProgramacao = {informacoesLinha: novasInformacoes, aproveitamentos: programacao.aproveitamentos, quadroDeHorario: programacao.quadroDeHorario};
        //console.log(novaProgramacao);

        if (programacao.Message) {
          alert(`Ocorreu um erro:  ${programacao.Message}`); 
          return
        }

        setInformacoesLinha(novaProgramacao);
      } catch (error) {
          console.error('Ocorreu um erro:', error.message);
          alert(`Ocorreu um erro:  ${error.message}`);
      }
      

    }

    function abrirMenu(){
      setMenuAberto(true);
    }

    function fecharMenu(){
      setMenuAberto(false);
    }

    function novaLinha(){
      setInformacoesLinha({});
      fecharMenu();
      setLinhaSelecionada('');
      
    }

    function trocarTema(event){
      const body = document.querySelector('body');
      let classesBody = body.classList;
      while(classesBody.length!==2){
        for(let classe of classesBody){
          if(classe!=='antialiased' && classe!=='min-h-screen'){
            body.classList.remove(classe);
          }
        }
      }
      let classes = temas.body[event.currentTarget.value].split(' ');

      classes.map(classe=>{
        body.classList.add(classe);
      })
      
      localStorage.setItem('theme',event.currentTarget.value);
      
      
      setTema(event.currentTarget.value);
    }

    function carregarTema(){
      const body = document.querySelector('body');
      let classes = temas.body[tema].split(' ');

      classes.map(classe=>{
        body.classList.add(classe);
      })

    }

    function trocarModoTabela(event){
      localStorage.setItem("wrap",event.currentTarget.value);
      setWrap(event.currentTarget.value);
    }

    function selecionarPosto(event){
      setPostoSelecionado(event.currentTarget.value);
    }

    function selecionarTabela(event){
      setTabelaSelecionada(event.currentTarget.value);
    }


  return (
    <div className="flex items-center justify-center">
      <div className={`absolute top-0 h-screen w-screen bg-cover bg-center bg-repeat -z-10 ${temas.backgroung[tema]}`}></div>
      <div className=" container flex flex-col">
        
          <NavBar abrirMenu={abrirMenu} tema={tema}/>

          {Object.entries(informacoesLinha).length>0 ? <QuadroDeHorario informacoesLinha={informacoesLinha} tema={tema} wrap={wrap} postoSelecionado={postoSelecionado} tabelaSelecionada={tabelaSelecionada} /> : <ConsultarLinha listaLinhas={listaLinhas} dia={dia} setDia={setDia} pesquisarLinha={pesquisarLinha} setLinhaSelecionada={setLinhaSelecionada} linhaSelecionada={linhaSelecionada} tema={tema}/>}

          
        
          <Menu menuAberto={menuAberto} fecharMenu={fecharMenu} novaLinha={novaLinha} disabled={Object.entries(informacoesLinha).length===0} tema={tema} trocarTema={trocarTema} trocarModoTabela={trocarModoTabela} wrap={wrap} selecionarPosto={selecionarPosto} selecionarTabela={selecionarTabela} informacoesLinha={informacoesLinha.informacoesLinha} />

          
        
      </div>
    </div>
  )
}



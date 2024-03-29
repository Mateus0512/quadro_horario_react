import './Form.css';
import { useState, useEffect } from 'react';

let tipo_linha ='';

export function Form({setTableData,setListaPostos,setListaTabelas,setInformacoesLinhas}) {
    const [date, setDate] = useState('');
    const [nomeLinhas,setNomeLinhas] = useState([])

    async function consultarLinhas() {
        
            try {
                let url = 'http://gistapis.etufor.ce.gov.br:8081/api/linhas/';
                let response = await fetch(url);
                let lista_linhas = await response.json();
                setNomeLinhas(lista_linhas)
                
            } catch (error) {
                console.error('Ocorreu um erro:', error.message);
                alert('Não foi possível consultar o servidor!')
            }


    }

    useEffect(() => {
        let objetoDate = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        objetoDate = objetoDate.split(',')[0];
        objetoDate = objetoDate.split('/');
        setDate(`${objetoDate[2]}-${objetoDate[1]}-${objetoDate[0]}`);
        consultarLinhas()
    }, []);


    async function consultarProgramacao(){
        try {
            let valor = `${search_linha.value.split('-')[0]}?data=${date_linha.value.split('-').join('')}`;
            let request = await fetch('http://gistapis.etufor.ce.gov.br:8081/api/Programacao/' + valor);
    
            if (!request.ok) {
                throw new Error('Não foi possível obter a programação. Código de status: ' + request.status);
            }
    
            let programacao = await request.json();
    
            if (programacao.Message) {
                alert('Programação não encontrada');
            }
            
            organizarProgramacao(programacao);
        } catch (error) {
            console.error('Ocorreu um erro:', error.message);
            alert('Não foi possível consultar o servidor!')
        }
      }

    function organizarProgramacao(programacao){
        let postos = []
        let todosPostos = []
        let tabelas = []
        let vigencia = programacao.dataInicioVigencia.split('T')[0].split('-');
        vigencia = `${vigencia[2]}-${vigencia[1]}-${vigencia[0]}`

        let informacoes_tabelas = []
        let listas_postos = []
        
        let informacoes = {linha:programacao.linha,
                            vigencia:vigencia,
                            extensaoLinha: programacao.extensaoLinha,
                            kmProgramada:programacao.kmProgramada,
                            tipoDia:programacao.quadro.tipoDia,
                            tabelas:[],
                            codigoPostoControle:[]
                            }
        //console.log(informacoes)
        todosPostos.push('Todos') 
        tabelas.push('Todas')

        for(let tabela=0;tabela<programacao.quadro.tabelas.length;tabela++){
            let informacoesTabela = {tabela:programacao.quadro.tabelas[tabela].numero,
                classe:programacao.quadro.tabelas[tabela].classe,
                qtdViagens:programacao.quadro.tabelas[tabela].qtdViagens,
                kmmMorta:programacao.quadro.tabelas[tabela].kmmMorta,
                empresa:programacao.quadro.tabelas[tabela].trechos[0].empresa}

                informacoes_tabelas.push(informacoesTabela)

                tabelas.push(programacao.quadro.tabelas[tabela].numero)

            for(let trecho=0;trecho<programacao.quadro.tabelas[tabela].trechos.length;trecho++){

                adicionarItemUnico(programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle,todosPostos)
                adicionarItemUnico(programacao.quadro.tabelas[tabela].trechos[trecho].fim.postoControle,todosPostos)
                //adicionarItemUnico(programacao.quadro.tabelas[tabela].numero,tabelas)
                adicionarItemUnico(programacao.quadro.tabelas[tabela].trechos[trecho].inicio.codigoPostoControle,listas_postos)
                adicionarItemUnico(programacao.quadro.tabelas[tabela].trechos[trecho].fim.codigoPostoControle,listas_postos)

                
                

                //adicionarObjetoUnico(informacoesTabela,informacoes_tabelas)
                
                if(!postos[programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle]){
                    postos[programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle] = [];
                }
                 postos[programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle].push({
                 terminalSaida: programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle,
                 terminalChegada: programacao.quadro.tabelas[tabela].trechos[trecho].fim.postoControle,
                 tabela:programacao.quadro.tabelas[tabela].numero,
                 descricaoSaida: programacao.quadro.tabelas[tabela].trechos[trecho].inicio.descricao.slice(0,1),
                 descricaoChegada: programacao.quadro.tabelas[tabela].trechos[trecho].fim.descricao.slice(0,1),
                 saida: programacao.quadro.tabelas[tabela].trechos[trecho].inicio.horario.slice(programacao.quadro.tabelas[tabela].trechos[trecho].inicio.horario.indexOf('T')+1,programacao.quadro.tabelas[tabela].trechos[trecho].inicio.horario.length),
                 chegada: programacao.quadro.tabelas[tabela].trechos[trecho].fim.horario.slice(programacao.quadro.tabelas[tabela].trechos[trecho].fim.horario.indexOf('T')+1,programacao.quadro.tabelas[tabela].trechos[trecho].fim.horario.length),
                 empresa:programacao.quadro.tabelas[tabela].trechos[trecho].empresa
                })
            }
        }



        informacoes.codigoPostoControle = listas_postos
        informacoes.tabelas = informacoes_tabelas



        setListaPostos(todosPostos)
        setListaTabelas(tabelas)

        tipo_linha = programacao.linha.indexOf('Corujão');
        organizarHorarios(postos)
        setInformacoesLinhas(informacoes)

        console.log(programacao)
        console.log(informacoes)
        
    }

    function organizarHorarios(postos){
        
        if(tipo_linha == -1){
            for(let posto in postos){
                
                    postos[posto] = postos[posto].sort((a,b)=>{
                        if(a.saida>'00:00'&&a.saida<'04:00'){
                            return 1;
                        }
                        if(a.saida < b.saida){
                            return -1;
                        }
                        else if(a.saida > b.saida){
                            return 1;
                        }
                        else if(a.saida == b.saida){
                            return 0;
                        }
    
                    })
                
            }
        }

        else{

        
            for(let posto in postos){
                

                    postos[posto] = postos[posto].sort((a,b)=>{
                        if(a.saida>'00:00'&&a.saida<'04:00'){
                            return 1;
                        }
                        if(a.saida < b.saida){
                            return -1;
                        }
                        else if(a.saida > b.saida){
                            return 1;
                        }
                        else if(a.saida == b.saida){
                            return 0;
                        }
    
                    })
                
            }
        }
        //console.log(postos)
        setTableData(postos)
    }

    function adicionarItemUnico(item,array){
        if(!array.includes(item)){
            array.push(item)
        }
    }


    return (
        <div  className='form'>
            
                <h1>Quadro de Horário</h1>
                <label htmlFor="search_linha">Linha</label>
                <input type="text" id="search_linha" className="form-control" list='linhas'  />
                <datalist id="linhas">
                    {(nomeLinhas.length>0)?
                        nomeLinhas.map((linha,index)=>(
                            <option key={index} value={linha.numeroNome}></option>
                        ))
                    :
                    ''
                    }
                </datalist>
                <label htmlFor="date_linha">Data</label>
                <input type="date" id="date_linha" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                <button className='btn btn-success' onClick={consultarProgramacao}>Consultar</button>
            
        </div>
    );
}
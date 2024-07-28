export function organizarInformacoes(programacao){
    var quadroDeHorario = [];
    let vigencia = programacao.dataInicioVigencia.split('T')[0].split('-');
    vigencia = `${vigencia[2]}-${vigencia[1]}-${vigencia[0]}`;
    let postos = [];
    let nomesPosto = [];
    
    adicionarItemUnico(postos,programacao.quadro.tabelas[0].trechos[0].inicio.codigoPostoControle);
    adicionarItemUnico(nomesPosto,programacao.quadro.tabelas[0].trechos[0].inicio.postoControle);
    
    adicionarItemUnico(postos,programacao.quadro.tabelas[0].trechos[0].fim.codigoPostoControle);
    adicionarItemUnico(nomesPosto,programacao.quadro.tabelas[0].trechos[0].fim.postoControle);
    if(postos,programacao.quadro.tabelas[0].trechos[2]){
        adicionarItemUnico(postos,programacao.quadro.tabelas[0].trechos[2].inicio.codigoPostoControle);
        adicionarItemUnico(nomesPosto,programacao.quadro.tabelas[0].trechos[2].inicio.postoControle);

        adicionarItemUnico(postos,programacao.quadro.tabelas[0].trechos[2].fim.codigoPostoControle);
        adicionarItemUnico(nomesPosto,programacao.quadro.tabelas[0].trechos[2].fim.postoControle);
    }
    


    let tabelas = [];
    for(let tabela of programacao.quadro.tabelas){
        let tabelaInfo = {
            tabela: tabela.numero,
            classe: tabela.classe,
            qtdViagens: tabela.qtdViagens,
            kmmMorta: tabela.kmmMorta,
            empresa: tabela.trechos[0].empresa
        }
        tabelas.push(tabelaInfo);
    }


    //console.log(programacao);
      let informacoesLinha = {
        linha: programacao.linha.trim(),
        tipo: programacao.quadro.tipoDia,
        vigencia: vigencia,
        extensaoLinha: programacao.extensaoLinha,
        kmProgramada:programacao.kmProgramada,
        tabelas,
        codigoPostoControle:postos,
        nomesPosto
      }
      //console.log(informacoesLinha);
      quadroDeHorario = organizarQuadroDeHorario(programacao);
      return [informacoesLinha,quadroDeHorario];
}

function adicionarItemUnico(array,chave){
    if(!array.includes(chave)){
        array.push(chave);
    }
}

function organizarQuadroDeHorario(programacao){
    let postos = [];
    for(let tabela=0;tabela<programacao.quadro.tabelas.length;tabela++){
        for(let trecho=0;trecho<programacao.quadro.tabelas[tabela].trechos.length;trecho++){
            let voltaLanche = '';
            (trecho>0) ? voltaLanche = programacao.quadro.tabelas[tabela].trechos[trecho-1].fim.descricao.slice(0,1):voltaLanche = programacao.quadro.tabelas[tabela].trechos[trecho].fim.descricao.slice(0,1);
            (programacao.quadro.tabelas[tabela].trechos[trecho].inicio.descricao=="Expresso"||programacao.quadro.tabelas[tabela].trechos[trecho].inicio.descricao=="EntradaExpresso") ? voltaLanche='Ex' : (voltaLanche=='L') ? voltaLanche='VL': voltaLanche='';

            if(!postos[programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle]){
                postos[programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle] = [];
            }
            postos[programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle].push({
                terminalSaida: programacao.quadro.tabelas[tabela].trechos[trecho].inicio.postoControle,
                terminalChegada: programacao.quadro.tabelas[tabela].trechos[trecho].fim.postoControle,
                tabela:programacao.quadro.tabelas[tabela].numero,
                descricaoSaida: voltaLanche || programacao.quadro.tabelas[tabela].trechos[trecho].inicio.descricao.slice(0,1),
                descricaoChegada: programacao.quadro.tabelas[tabela].trechos[trecho].fim.descricao.slice(0,1),
                saida: programacao.quadro.tabelas[tabela].trechos[trecho].inicio.horario.slice(programacao.quadro.tabelas[tabela].trechos[trecho].inicio.horario.indexOf('T')+1,programacao.quadro.tabelas[tabela].trechos[trecho].inicio.horario.length),
                chegada: programacao.quadro.tabelas[tabela].trechos[trecho].fim.horario.slice(programacao.quadro.tabelas[tabela].trechos[trecho].fim.horario.indexOf('T')+1,programacao.quadro.tabelas[tabela].trechos[trecho].fim.horario.length),
                empresa:programacao.quadro.tabelas[tabela].trechos[trecho].empresa
               })
        }
    }


    if(programacao.linha.indexOf('Corujão')===-1){
        organizarHorariosNormal(postos)
    }
    else{
        organizarHorariosCorujao(postos)
    }


    return postos;

}

function organizarHorariosNormal(postos){

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

function organizarHorariosCorujao(postos){
    for(let posto in postos){
        postos[posto] = postos[posto].sort((a,b)=>{
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
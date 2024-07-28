import { temas } from "../utils/temas"

export function ConsultarLinha({listaLinhas,dia,setDia,pesquisarLinha, setLinhaSelecionada,linhaSelecionada,tema}){

    return (
        <div className={`flex flex-col gap-2 px-3 mt-2 p-3 pb-3 w-[99%] md:w-full rounded-2xl bg-transparent  ${temas.consultar_linha.container[tema]}`}>
          <div className="flex flex-col gap-1">
            <label htmlFor="linha" className={`font-bold ${temas.consultar_linha.label[tema]}`}>Linha</label>
            <input type="text" id="linha" placeholder="Digite uma linha" className={`bg-white/5 font-semibold border border-solid border-slate-500 rounded-lg p-2 ring-1 ring-gray-500 ${temas.consultar_linha.input[tema]}`} list="linhas" value={linhaSelecionada} onChange={(event)=>setLinhaSelecionada(event.target.value)}/>
          </div>
          
          <datalist id="linhas">
            {listaLinhas.length >0 && (
                listaLinhas.map(linha=>{
                    return (
                        <option key={linha.numero}>{linha.numeroNome}</option>
                    )
                })
            )}
          </datalist>
          <div className="flex flex-col gap-1">
            <label htmlFor="dataSelecionada"  className={`font-bold ${temas.consultar_linha.label[tema]}`}>Data</label>
            <input type="date" id="dataSelecionada" className={`bg-white/5 border border-solid border-slate-500 ring-1 ring-gray-500 font-semibold rounded-lg p-2 w-full ${temas.consultar_linha.input[tema]}`} value={dia} onChange={(event)=>setDia(event.target.value)} />
            <button type="button" className="bg-indigo-600 text-slate-200 rounded-lg p-2 md:w-28 mt-1 hover:bg-indigo-500 md:max-w-24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  " onClick={pesquisarLinha}><span className="font-semibold">Consultar</span></button>
          </div>
          
        </div>
    )
}
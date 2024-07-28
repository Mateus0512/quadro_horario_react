import { temas } from "../utils/temas"

export function Details({informacoesLinha, tema}){
    return(
        
        <details className={`w-[99%] flex overflow-hidden rounded-xl p-2 pb-2 mt-2 justify-center transition-all duration-500 ease-in-out max-h-18 ${temas.details[tema]}`} >
                
                <summary className="font-semibold">{informacoesLinha.linha}</summary>
                
                <p><strong>Tipo:</strong> {informacoesLinha.tipo}</p>
                <p><strong>Vigência: </strong>{informacoesLinha.vigencia}</p>
                <p><strong>Ids dos postos: </strong>{informacoesLinha.codigoPostoControle.map((posto,index)=>
                    informacoesLinha.codigoPostoControle.length-1 !== index ? (<span key={index}>{posto+','}</span>) : (<span key={index}>{posto}</span>)
                )}</p>
                <p><strong>Extensão da linha: </strong>{informacoesLinha.extensaoLinha}km</p>
                <p className=""><strong>kmProgramada: </strong>{informacoesLinha.kmProgramada}km</p>
                
                <div className="flex mt-2 overflow-auto">
                    <table className="border-collapse table-auto text-sm border border-slate-700 w-full">
                        <thead className={`${temas.table.thead[tema]}`}>
                            <tr className={`border-b border-t font-semibold ${temas.table.th[tema]}`}>
                                <th className="p-2 pt-0 pb-3 text-center">Tabela</th>
                                <th className="p-2 pt-0 pb-3 text-center">Empresa</th>
                                <th className="p-2 pt-0 pb-3 px-2 text-center">Classe</th>
                                <th className="p-2 pt-0 pb-3 text-center">Qtd de Viagens</th>
                                <th className="p-2 pt-0 pb-3 text-center">Kmm morta</th>
                            </tr>
                        </thead>
                        <tbody className={`${temas.table.tbody[tema]}`}>
                            {informacoesLinha.tabelas.map(tabela=>{
                                return(
                                    <tr key={tabela.tabela} className={`border-b ${temas.table.tr[tema]}`}>
                                        <td className="p-2 text-center">{tabela.tabela}</td>
                                        <td className="p-2 text-center">{tabela.empresa}</td>
                                        <td className="p-2 px-2 text-center">{tabela.classe}</td>
                                        <td className="p-2 text-center">{tabela.qtdViagens}</td>
                                        <td className="p-2 text-center">{tabela.kmmMorta}km</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    
                </div>
                
            </details>
            
    )
}
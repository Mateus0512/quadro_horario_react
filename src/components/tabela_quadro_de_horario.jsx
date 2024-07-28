import { temas } from "../utils/temas";

export function TableQuadroDeHorario({informacoesLinha, tema, wrap, postoSelecionado, tabelaSelecionada}){
    return(
        <div className={`mt-4 p-1 overflow-x-scroll ${temas.table[wrap]}`}>
            {Object.entries(informacoesLinha).map(([terminal,dados])=>{
                if(postoSelecionado === "todos" || postoSelecionado === terminal){
                    return (
                        <table key={terminal} className="w-full">
                        <thead className={`${temas.table.thead[tema]} sticky top-0`}>
                            <tr className={`border-b py-3 border-t font-semibold ${temas.table.th[tema]}`}>
                                <th className="p-2 pt-0 pb-3 text-center">Tabela</th>
                                <th className="p-2 pt-0 pb-3 text-center">{informacoesLinha[terminal][0].terminalSaida}</th>
                                <th className="p-2 pt-0 pb-3 text-center">{informacoesLinha[terminal][0].terminalChegada}</th>
                                <th className="p-2 pt-0 pb-3 text-center">Descrição</th>
                            </tr>
                        </thead>
                        <tbody className={`${temas.table.tbody[tema]}`}>
                            {dados.map((item,index)=>{
                                if (tabelaSelecionada === "todas" || tabelaSelecionada == item.tabela){
                                    return (
                                    <tr key={index} className={`border-b ${temas.table.tr[tema]}`}>
                                        <td className="p-2 text-center">{`${item.tabela} ${item.descricaoSaida}`}</td>
                                        <td className="p-2 text-center">{item.saida.substring(0,5)}</td>
                                        <td className="p-2 text-center">{item.chegada.substring(0,5)}</td>
                                        <td className="p-2 text-center">{item.descricaoChegada}</td>
                                    </tr>
                                    )
                                }
                                    
                                
                            })}
                        </tbody>
                    </table>
                    )
                    
                }  
            })}
            
        </div>
    )
}
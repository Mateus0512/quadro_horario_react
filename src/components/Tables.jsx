import './Tables.css';

export function Tables({ tableData, terminalSelecionado, tabelaSelecionada,informacoesLinhas }) {
    return (

        <div id='quadro_horario' style={{maxWidth:'1200px'}}>
                {
                
                (informacoesLinhas) ? (
                    <div className='reset'>
                    <p><span><strong>Linha: </strong>{informacoesLinhas.linha} </span></p> 
                    <p><span><strong>Tipo: </strong>{informacoesLinhas.tipoDia} </span></p> 
                    <p><span><strong>Vigência: </strong>{informacoesLinhas.vigencia} </span></p>
                    </div>
                ) : (
                    ''
                )
                }
            <div className='tables table-responsive-sm'>
                {Object.entries(tableData).map(([terminal, dados]) => {
                    if (terminalSelecionado === "Todos" || terminal === terminalSelecionado) {
                        return (
                            <table key={terminal} className='table table-striped'> 
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>Tabela</th>
                                        <th>{tableData[terminal][0].terminalSaida}</th>
                                        <th>{tableData[terminal][0].terminalChegada}</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dados.map((item, index) => (
                                        // Adiciona uma condição para comparar a tabela selecionada com a tabela de cada item

                                        (tabelaSelecionada == "Todas" || tabelaSelecionada == item.tabela) &&
                                        <tr key={index}>
                                            <td>{item.tabela}</td>
                                            <td>{item.saida}</td>
                                            <td>{item.chegada}</td>
                                            <td>{item.descricaoChegada}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}
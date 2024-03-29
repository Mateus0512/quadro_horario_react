import './Filters.css'

export function Filters({ listaPostos, setTerminalSelecionado, listaTabelas ,setTabelaSelecionada}) {
    const handleSelectPosto = (event) => {
        setTerminalSelecionado(event.target.value);
    };

    const handleSelectTabela = (event) =>{
        setTabelaSelecionada(event.target.value)
    }

    return (
        <div className={`filters `}>
            <h2>Filtros</h2>
            <div className='item-filter'>
                <label htmlFor="lista_postos">Postos</label>
                <select onChange={(e)=>handleSelectPosto(e)} id="lista_postos" className='form-control'>
                    {listaPostos.length > 0 ?
                        listaPostos.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))
                        :
                        <option value="">Nenhum item disponível</option>
                    }
                </select>
            </div>
            <div className='item-filter'>
                <label  htmlFor="tabela_linha">Tabelas</label>
                <select  id="tabela_linha" onChange={(e)=>handleSelectTabela(e)} className='form-control'>
                    {listaTabelas.length > 0 ?
                        listaTabelas.map((item,index) => (
                            <option key={index} value={item}>{item}</option>
                        )):
                            <option value="">Nenhuma Tabela disponível</option>
                        }
                </select>
            </div>
            
        </div>
    );
}

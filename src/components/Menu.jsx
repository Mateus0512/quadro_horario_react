import './Menu.css'
import { Filters} from './Filters'
import { Utilities } from './Utilities'

export function Menu({listaPostos, setTerminalSelecionado, listaTabelas ,setTabelaSelecionada,TipoFiltro,setTipoFiltroMenu,informacoesLinhas}){
    function handleCloseMenu(){
        setTipoFiltroMenu('hide')
    }
    return(
        <div className={`menu `+TipoFiltro}>
            <Filters listaPostos={listaPostos} setTerminalSelecionado={setTerminalSelecionado} listaTabelas={listaTabelas} setTabelaSelecionada={setTabelaSelecionada} />
            
            <button onClick={handleCloseMenu} id='fechar' className='button-fechar'>X</button>
            <Utilities informacoesLinhas={informacoesLinhas}/>
        </div>
    )
}
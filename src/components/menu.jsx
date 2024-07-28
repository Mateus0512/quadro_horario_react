import x from '../assets/x.svg';
import { temas } from '../utils/temas';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

export function Menu({fecharMenu,menuAberto,novaLinha, disabled, tema, trocarTema,trocarModoTabela,wrap, selecionarPosto , selecionarTabela , informacoesLinha}){
    const quadro_de_horario = () => document.getElementById('quadro_de_horario');

    const options = {
        // default is `save`
        method: 'open',
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.EXTREME,
        page: {
           // margin is in MM, default is Margin.NONE = 0
           margin: Margin.SMALL,
           // default is 'A4'
           format: 'letter',
           // default is 'portrait'
           orientation: 'portrait',
        },
        canvas: {
           // default is 'image/jpeg' for better size performance
           mimeType: 'image/jpeg',
           qualityRatio: 1
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break, 
        // so use with caution.
        overrides: {
           // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
           pdf: {
              compress: true
           },
           // see https://html2canvas.hertzen.com/configuration for more options
           canvas: {
              useCORS: true
           }
        },
     };

    function imprimir(){
        // if(tema!=="light"){
        //     const details = document.querySelector('details');

        //     try {
        //         details.classList.remove('dark:bg-slate-200/5')
        //         details.classList.remove('bg-slate-200/5')
        //         details.classList.add('bg-slate-700')
        //     } catch (error) {
        //         console.log(error)
        //     }
        
        // }
        generatePDF(quadro_de_horario, {filename: `${informacoesLinha.linha}-${informacoesLinha.vigencia}.pdf`}, options );
        const canvas = document.querySelector('.html2canvas-container');

        if(informacoesLinha.nomesPosto.length>2 && wrap==="no_wrap"){
            canvas.style.width = '1600px';
        }else{
            canvas.style.width = '1200px';
        }
        
    }


    return (
        <div className={menuAberto ? 'fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80' : "hidden"}>
            <div className={`flex flex-col gap-4  fixed top-4 right-4 rounded-lg shadow-lg p-6 text-base font-semibold min-w-80 ${temas.menu.container[tema]}`}>
                <div className='flex items-baseline justify-between gap-3'>
                    <button className={` hover:text-sky-400 highlight-white/5 inline-flex cursor-pointer disabled:hover:cursor-no-drop ${temas.menu.button[tema]}`} disabled={disabled}  onClick={novaLinha} >Pesquisar outra linha</button>
                    <button type='button' onClick={fecharMenu} className='font-semibold hover:text-sky-400 highlight-white/5 p-2'>
                    <img src={x} alt="" className='size-3 ' />
                    </button>
                    
                </div>
                
                <button type='button' disabled={disabled} className={`hover:text-sky-400 highlight-white/5 inline-flex disabled:hover:cursor-no-drop ${temas.menu.button[tema]}`} onClick={imprimir}>Gerar PDF</button>
                <div className='w-full h-px bg-slate-400'></div>

                <div className='flex gap-4 items-center justify-between'>
                    <span>Temas</span>
                    <select defaultValue={tema} onChange={trocarTema} className={`relative flex p-2 px-2 items-center ring-1 rounded-lg shadow-sm font-semibold w-40 ${temas.menu.select[tema]}`}>
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="system">Sistema</option>
                    </select>
                </div>

                <div className='flex gap-4 items-center justify-between'>
                    <span>Tabela</span>
                    <select defaultValue={wrap} onChange={trocarModoTabela} className={`relative flex p-2 px-2 items-center ring-1 rounded-lg shadow-sm font-semibold w-40 ${temas.menu.select[tema]}`}>
                        <option value="no_wrap">Horizontal</option>
                        <option value="wrap">Vertical</option>
                    </select>
                </div>

                
                {informacoesLinha ?(
                    <>
                    <div className='w-full h-px bg-slate-400'></div>
                    <div className='flex gap-4 items-center justify-between'>
                        <span>Postos</span>
                        <select onChange={selecionarPosto} className={`relative flex p-2 px-2 items-center ring-1 rounded-lg shadow-sm font-semibold w-40 ${temas.menu.select[tema]}`}>
                            <option value="todos">Todos</option>
                            {informacoesLinha.nomesPosto.map((nome,index)=>{
                                return (
                                    <option key={index+10} value={nome}>{nome}</option>
                                )
                            })}
                            
                        </select>
                    </div>

                    <div className='flex gap-4 items-center justify-between'>
                        <span>Tabelas</span>
                        <select onChange={selecionarTabela} className={`relative flex p-2 px-2 items-center ring-1 rounded-lg shadow-sm font-semibold w-40 ${temas.menu.select[tema]}`}>
                            <option value="todas">Todas</option>
                            {informacoesLinha.tabelas.map((tabela,index)=>{
                                return(
                                    <option key={index*10} value={tabela.tabela}>{tabela.tabela}</option>
                                )
                            })}
                            
                        </select>
                    </div>
                    </>
                ): null}

            </div>
        </div>
    )
}
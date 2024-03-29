import './Utilities.css'
import { useRef } from 'react'
import generatePDF, { Margin } from 'react-to-pdf';

export function Utilities({informacoesLinhas}){
    const quadro_horario = () => document.getElementById('quadro_horario');

    const options = {
        method: 'open',
        
        page:{
            margin:Margin.LARGE,
            format: 'letter',
            orientation: 'portraid'
        }
    }

    const dialogRef = useRef(null)

    function openModal(){
        //console.log(informacoesLinhas)
        if(dialogRef.current){
            dialogRef.current.showModal()
        }
    }

    function closeModal(){
        if(dialogRef.current){
            dialogRef.current.close()
        }
    }

    return (
        <div className="pdf-data">
            <button type='button' className='btn btn-dark' onClick={() => generatePDF(quadro_horario,{filename: `${informacoesLinhas.linha}-${informacoesLinhas.vigencia}.pdf`}, options)}>Gerar PDF</button>
            <button type='button' className='btn btn-dark' onClick={openModal}>Informações</button>

            <dialog id='modal' ref={dialogRef}>
                <button type='button' onClick={closeModal} id='closeModal'>X</button>
                <p><span><strong>Linha: </strong>{informacoesLinhas.linha} </span> </p>
                <p><span><strong>Tipo: </strong>{informacoesLinhas.tipoDia} </span></p>
                <p><span><strong>Vigência: </strong>{informacoesLinhas.vigencia} </span></p>
                <p><span><strong>Ids dos postos: </strong>{informacoesLinhas.codigoPostoControle.map((item,index)=>(
                    <span key={index}> {`${item},`} </span>
                ))}
                </span></p>
                <p><strong>Extensão da linha: </strong>{`${informacoesLinhas.extensaoLinha}Km`}</p>
                <p><strong>Quilometragem programada: </strong>{`${informacoesLinhas.kmProgramada}Km`}</p>
                <div className='table-responsive-sm'>
                    <table className='table table-striped'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Tabela</th>
                                <th>Empresa</th>
                                <th>Classe</th>
                                <th>Quantidade de Viagens</th>
                                <th>Quilometragem Morta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {informacoesLinhas.tabelas.map((item,index)=>(
                                <tr key={index}>
                                    <td >{item.tabela}</td>
                                    <td>{item.empresa}</td>
                                    <td>{item.classe}</td>
                                    <td>{`${item.qtdViagens}`}</td>
                                    <td>{`${item.kmmMorta}Km`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </dialog>
        </div>
    )
}
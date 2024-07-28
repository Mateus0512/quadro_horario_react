import { Details } from "./details";
import { TableQuadroDeHorario } from "./tabela_quadro_de_horario";

export function QuadroDeHorario({informacoesLinha, tema, wrap, postoSelecionado, tabelaSelecionada}){
    return(
        <div id="quadro_de_horario" className="flex justify-center items-center flex-col w-full">
            <Details informacoesLinha={informacoesLinha[0]} tema={tema} />
            <TableQuadroDeHorario informacoesLinha={informacoesLinha[1]} tema={tema} wrap={wrap} postoSelecionado={postoSelecionado} tabelaSelecionada={tabelaSelecionada} />
        </div>
    )
}
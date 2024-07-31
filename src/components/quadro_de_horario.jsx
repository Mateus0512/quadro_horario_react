import { Details } from "./details";
import { TableQuadroDeHorario } from "./tabela_quadro_de_horario";

export function QuadroDeHorario({informacoesLinha, tema, wrap, postoSelecionado, tabelaSelecionada}){
    return(
        <div id="quadro_de_horario" className="flex justify-center items-center flex-col w-full">
            <Details informacoesLinha={informacoesLinha.informacoesLinha} tema={tema} aproveitamentos={informacoesLinha.aproveitamentos} />
            <TableQuadroDeHorario informacoesLinha={informacoesLinha.quadroDeHorario} tema={tema} wrap={wrap} postoSelecionado={postoSelecionado} tabelaSelecionada={tabelaSelecionada} />
        </div>
    )
}
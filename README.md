# Quadro de Horário

Esse é um projeto pessoal que fiz vendo uma necessidade na hora de consultar os dados de programação das linhas.

Este é um projeto que permite aos usuários visualizarem os quadros de horário da Prefeitura de Fortaleza consumindo dados de uma API oficial. No entanto, devido ao uso de HTTP em vez de HTTPS, alguns navegadores podem bloquear o conteúdo por motivo de Mixed Content. Neste README, forneceremos instruções para os usuários contornarem esse problema.

## Requisitos

Antes de usar este aplicativo, verifique se você atende aos seguintes requisitos:

- Navegador moderno (recomendamos Google Chrome)
- Dispositivo Android (se estiver usando um dispositivo móvel)

## Como Usar

Siga estas etapas para acessar os quadros de horário da Prefeitura de Fortaleza:

1. Abra o seu navegador preferido no seu dispositivo.

2. No **desktop**, siga estas instruções:
   - Acesse o site que hospeda este projeto.
   - Clique no ícone de cadeado ou informações na barra de endereço (URL).
   - Encontre a opção "Configurações do Site" ou "Configurações de Conteúdo".
   - Ative a opção "Permitir conteúdo não seguro" ou algo semelhante.

3. No **Android**, siga estas instruções para o Google Chrome:
   - Abra o navegador Chrome.
   - Digite `chrome://flags/` na barra de endereços e pressione Enter.
   - Na página de experimentos, use a caixa de pesquisa para encontrar a opção "Insecure Origins Treated as Secure".
   - Selecione essa opção e, no campo de entrada, insira o endereço da API: `http://gistapis.etufor.ce.gov.br:8081/`.
   - Reinicie o navegador Chrome para que as configurações entrem em vigor.

Agora você deve ser capaz de acessar os quadros de horário sem erros de Mixed Content.

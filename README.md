# Quadro de Horário
Este é um projeto pessoal desenvolvido para facilitar a consulta dos horários de ônibus de uma determinada linha, atendendo a uma necessidade comum dos usuários de transporte público.

# Descrição
Este projeto permite aos usuários visualizarem os quadros de horário das linhas de ônibus da Prefeitura de Fortaleza, consumindo dados de uma API oficial. Além disso, oferece a opção de gerar um arquivo PDF com o quadro completo ou selecionar horários específicos de um posto ou tabela.

# Funcionalidades
- Consulta de Horários: Permite visualizar os horários das linhas de ônibus em tempo real.
- Geração de PDF: Possibilidade de exportar o quadro de horários completo ou personalizado em formato PDF.
- Filtros Personalizados: Seleção de horários específicos por posto ou tabela.
- Interface Amigável: Interface intuitiva para facilitar a navegação e consulta dos dados.
# Tecnologias Utilizadas
- Linguagem de Programação: JavaScript
- Framework: React com Vite
- Estilização: TailwindCSS
- Geração de PDF: react-to-pdf
- Proxy API: API criada na Vercel para redirecionar os dados da API oficial, que utiliza HTTP, para a página hospedada no GitHub Pages, que utiliza HTTPS, evitando problemas de mixed content.

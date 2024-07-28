import { temas } from "../utils/temas";

export function NavBar({abrirMenu,tema}){
    return (
        <nav className={`border-b flex items-center justify-between p-3 w-full transition-colors duration-50 backdrop-blur bg-transparent  ${temas.navbar.border[tema]}`}>
            <h2 className={`px-2 font-semibold ${temas.navbar.h2[tema]}`}>Quadro de Horário</h2>
            <button type="button" onClick={abrirMenu} className={`w-8 h-8 flex items-center justify-center ${temas.navbar.button[tema]}`}>
                <svg width="24" height="24" fill="none" aria-hidden="true">
                    <path d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    </path>
                </svg>
            </button>
            
        </nav>
    )
}
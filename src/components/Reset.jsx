import './Reset.css'

export function Reset({handleReset}){
    return (
        <div className='reset'>
            <a onClick={handleReset}>Pesquisar outra linha</a>
        </div>
    )
}
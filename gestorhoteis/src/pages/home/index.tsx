import Countries from "../../components/Countries";

export function Home(){
    return(
        <main>
            <header>
                <h1>
                    Pagina para selecionar paises...
                </h1>
                <div>
                    <Countries/>
                </div>
            </header>
        </main>
    )
}
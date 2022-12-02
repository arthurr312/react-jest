import React from "react";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useNavigate } from "react-router-dom";
const Rodape = () => {
    const participantes = useListaDeParticipantes();
    return(
        <footer>
            <button disabled={participantes.length < 3}>Iniciar brincadeira</button>
        </footer>
    )
}

export default Rodape;
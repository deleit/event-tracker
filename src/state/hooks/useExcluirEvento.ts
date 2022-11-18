import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";

const useExcluirEvento = () => {
    const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

    return (evento: IEvento) => {
        return setListaDeEventos(listaaAntiga => listaaAntiga.filter(e => e.id !== evento.id))
    }
}

export default useExcluirEvento;
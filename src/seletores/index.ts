import { selector } from "recoil";
import { IEvento } from "../interfaces/IEvento";
import { filtroDeEventos, listaDeEventosState } from "../state/atom";

export const eventosFiltradosState = selector({
    key: 'eventosFiltradosState',
    get: ({ get }) => {
        const filtro = get(filtroDeEventos);
        const todosOsEventos = get(listaDeEventosState);
        const eventos = todosOsEventos.filter(evento => {
            if (!filtro.data) {
                return true;
            }
            const mesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);
            return mesmoDia;
        });

        const eventosFiltrados = () => {
            switch (filtro.completo) {
                case "completos":
                    return eventos.filter(evento => evento.completo === true);
                case "incompletos":
                    return eventos.filter(evento => evento.completo === false);
                case "ambos":
                    return eventos;
                default:
                    return eventos;
            }
        }

        return eventosFiltrados();
    }
});

export const eventosAsync = selector({
    key: 'eventosAsync',
    get: async () => {
        const respostaHttp = await fetch('http://localhost:8080/eventos');
        const eventosJson: IEvento[] = await respostaHttp.json();
        return eventosJson.map(evento => ({
            ...evento,
            inicio: new Date(evento.inicio),
            fim: new Date(evento.fim)
        }));
    }
});
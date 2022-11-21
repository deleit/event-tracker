import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IFiltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {
  
  const [data, setData] = useState('')
  const [completo, setCompleto] = useState('ambos');
  const setFiltroDeEvento = useSetRecoilState<IFiltroDeEventos>(filtroDeEventos);
  
  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const filtro: IFiltroDeEventos = {completo: completo};
    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }

    setFiltroDeEvento(filtro);
  }

  return (
    <form className={style.Filtro} onSubmit={submeterForm}>
      <h3 className={style.titulo}>Filtrar por data</h3>
      <input
        type="date"
        name="data"
        className={style.input}
        onChange={evento => setData(evento.target.value)}
        placeholder="Por data"
        value={data}
      />

      <h3 className={style.titulo}>Filtrar por estado</h3>
      <div className={style.checkbox}>
        <input 
          type="radio" 
          name="estado" 
          id="estado-ambos"
          value="ambos"
          onChange={e => setCompleto(e.target.value)}
          defaultChecked
        />
        <label htmlFor="estado-ambos">Ambos</label>

        <input 
          type="radio" 
          name="estado" 
          id="estado-completo"
          value="completos"
          onChange={e => setCompleto(e.target.value)}
        />
        <label htmlFor="estado-completo">Completos</label>

        <input 
          type="radio" 
          name="estado" 
          id="estado-incompleto"
          value="incompletos"
          onChange={e => setCompleto(e.target.value)}
        />
        <label htmlFor="estado-incompleto">Incompletos</label>
      </div>

      <button className={style.botao}>
        Filtrar
      </button>

      </form>
  )
}

export default Filtro
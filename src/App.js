import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const requestApi = async () => {
      if (busqueda.trim() === '') return;

      const imgXpag = 20;
      const key = '20356689-8c848e5282e928050149b395d';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgXpag}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);
      // calcular el total de paginas
      const calcularTotalPag = Math.ceil(resultado.totalHits / imgXpag);
      guardarTotalPaginas(calcularTotalPag);
      // mover la pantalla hacia arriba despues de buscar en el paginado
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
      guardarError(true);
    }
    requestApi();
  }, [busqueda, paginaActual]);

  // definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={ guardarBusqueda }
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        { (paginaActual === 1) ? null : (<button
          type="button"
          className="btn btn-success mr-1 col-6 row"
          onClick={paginaAnterior}
        >&laquo; Anterior</button>)}
        { (paginaActual === totalPaginas) ? null : ( <button
          type="button"
          className="btn btn-info mr-1 col-6 row"
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>)}

        {error && (
          <div className="row col-12 text-center line-final" >
            [{paginaActual}] de [{totalPaginas}]
          </div>
        ) }
      </div>
    </div>
  );
}

export default App;

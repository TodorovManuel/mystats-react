import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./buscar.css";

const Buscar = () => {
  const [partidos, setPartidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [filtro, setFiltro] = useState("");

  // Función para obtener datos según el filtro seleccionado
  // Cambia la línea dentro de fetchPartidos
  /*const fetchPartidos = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Extraer el array de `partidos` si está dentro de un objeto
      if (Array.isArray(data.partidos)) {
        setPartidos(data.partidos);
      } else {
        console.error("La respuesta no contiene un array en 'partidos':", data);
        setPartidos([]);
      }

      setCurrentPage(1); // Resetear a la primera página cuando cambian los datos
    } catch (error) {
      console.error("Error fetching partidos:", error);
      setPartidos([]); // En caso de error, establece un array vacío
    }
  };*/
  const fetchPartidos = async (url, numero) => {
    url = url+"/"+{currentPage};
    switch (numero) {
      case 1:
        setFiltro("la valoración");
        break;
      case 2:
        setFiltro("los minutos jugados");
        break;
      case 3:
        setFiltro("los puntos anotados");
        break;
      case 4:
        setFiltro("las asistencias hechas");
        break;
      case 5:
        setFiltro("los rebotes tomados");
        break;
      default:
        setFiltro("");
        break;
    }
    try {
      // Obtener el token de autenticación (puede estar en localStorage, sessionStorage, o en el estado)
      const token = localStorage.getItem("token"); // Ajusta esto según cómo manejes tu token

      // Verificar si el token existe
      if (!token) {
        console.error("No se proporcionó el token de autenticación");
        return; // Salir de la función si no hay token
      }

      // Configuración de la solicitud con las cabeceras, incluyendo el token
      const response = await fetch(url, {
        method: "GET", // O el método HTTP que estés usando
        headers: {
          Authorization: `Bearer ${token}`, // Pasar el token en la cabecera Authorization
          "Content-Type": "application/json", // Dependiendo del tipo de contenido que manejes
        },
      });

      const data = await response.json();

      // Verificar la respuesta
      if (Array.isArray(data.partidos)) {
        console.log("Partidos:", data.partidos);
        setPartidos(data.partidos);
      } else {
        console.error("La respuesta no contiene un array en 'partidos':", data);
        setPartidos([]); // Si no hay datos, establecer un array vacío
      }

      setCurrentPage(1); // Reiniciar la página a la primera
    } catch (error) {
      console.error("Error al obtener los partidos:", error);
      setPartidos([]); // Si ocurre un error, establecer un array vacío
    }
  };

  // URLs del backend para cada filtro
  const urls = {
    masValoracion: "http://localhost:3000/api/usuarios/partidosPorValoracion",
    masMinutos: "http://localhost:3000/api/usuarios/partidosPorMinutos",
    masPuntos: "http://localhost:3000/api/usuarios/partidosPorPuntos",
    masAsistencias: "http://localhost:3000/api/usuarios/partidosPorAsistencias",
    masRebotes: "http://localhost:3000/api/usuarios/partidosPorRebotes",
  };

  // Calcular el índice de los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = partidos.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const totalPages = Math.ceil(partidos.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Buscar partido</h1>

      <div className="filtrosContainer">
        <button onClick={() => fetchPartidos(urls.masValoracion, 1)}>
          Más valoración
        </button>
        <button onClick={() => fetchPartidos(urls.masMinutos, 2)}>
          Más minutos
        </button>
        <button onClick={() => fetchPartidos(urls.masPuntos, 3)}>
          Más puntos
        </button>
        <button onClick={() => fetchPartidos(urls.masAsistencias, 4)}>
          Más asistencias
        </button>
        <button onClick={() => fetchPartidos(urls.masRebotes, 5)}>
          Más rebotes
        </button>
      </div>

      <h2>Filtrando partidos de mayor a menor según {filtro}</h2>

      <div className="partidosContainer">
        {currentItems.map((partido, index) => (
          <div key={partido.id} className="partidoItem">
            <p>{indexOfFirstItem + index + 1}</p>
            <p>Minutos: {partido.estadisticas.minutosJugados}</p>
            <p>Puntos: {partido.estadisticas.puntos}</p>
            <p>Asistencias: {partido.estadisticas.asistencias}</p>
            <p>
              Rebotes:{" "}
              {partido.estadisticas.rebotesDefensivos +
                partido.estadisticas.rebotesOfensivos}
            </p>
            <p>Valoración: {partido.estadisticas.valoracion}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Buscar;

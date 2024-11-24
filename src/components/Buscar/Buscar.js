import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./buscar.css";

const Buscar = () => {
  const [partidos, setPartidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtro, setFiltro] = useState("");
  const itemsPerPage = 9;

  const urls = {
    masValoracion: "http://localhost:3000/api/usuarios/partidosPorValoracion",
    masMinutos: "http://localhost:3000/api/usuarios/partidosPorMinutos",
    masPuntos: "http://localhost:3000/api/usuarios/partidosPorPuntos",
    masAsistencias: "http://localhost:3000/api/usuarios/partidosPorAsistencias",
    masRebotes: "http://localhost:3000/api/usuarios/partidosPorRebotes",
  };

  // Función para obtener la cantidad total de páginas
  const traerCant = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No se proporcionó el token de autenticación");

      const response = await fetch("http://localhost:3000/api/usuarios/cantidadPartidos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const paginas = Math.ceil(data.partidos / itemsPerPage);
      setTotalPages(paginas);
    } catch (error) {
      console.error("Error al obtener la cantidad de páginas:", error);
      setTotalPages(1);
    }
  };

  // Función para obtener los partidos según el filtro y la página actual
  const fetchPartidos = async (url, numero) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No se proporcionó el token de autenticación");

      const filtroTexto = [
        "la valoración",
        "los minutos jugados",
        "los puntos anotados",
        "las asistencias hechas",
        "los rebotes tomados",
      ];
      setFiltro(filtroTexto[numero - 1] || "");
      console.log("Página actual en BUSQUEDA:", currentPage);

      const response = await fetch(`${url}/${currentPage}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (Array.isArray(data.partidos)) {
        setPartidos(data.partidos);
        console.log("Partidos:", data.partidos);
        console.log("Total de páginas:", totalPages);
      } else {
        console.error("La respuesta no contiene un array en 'partidos':", data);
        setPartidos([]);
      }
    } catch (error) {
      console.error("Error al obtener los partidos:", error);
      setPartidos([]);
    }
  };

  // Cambiar de página
  const goToPage = (pageNumber) => {
    console.log("Página actual:", pageNumber);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      console.log("Cambiando a la página", pageNumber);
      setCurrentPage(pageNumber);
    }
  };

  // Actualizar los datos cuando cambie la página
  useEffect(() => {
    traerCant();
  }, []);

  useEffect(() => {
    // Llama a la URL del filtro actualmente seleccionado
    if (filtro) {
      const url = Object.values(urls).find((u) =>
        u.includes(filtro.replace(" ", "").toLowerCase())
      );
      if (url) fetchPartidos(url);
    }
  }, [currentPage]);

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
        {partidos.map((partido, index) => (
          <div key={partido.id} className="partidoItem">
            <p>{index + 1 + (currentPage - 1) * itemsPerPage}</p>
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

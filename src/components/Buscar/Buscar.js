import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./buscar.css";

const Buscar = () => {
  const [partidos, setPartidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
  const fetchPartidos = async (url) => {
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
        <button onClick={() => fetchPartidos(urls.masValoracion)}>
          Más valoración
        </button>
        <button onClick={() => fetchPartidos(urls.masMinutos)}>
          Más minutos
        </button>
        <button onClick={() => fetchPartidos(urls.masPuntos)}>
          Más puntos
        </button>
        <button onClick={() => fetchPartidos(urls.masAsistencias)}>
          Más asistencias
        </button>
        <button onClick={() => fetchPartidos(urls.masRebotes)}>
          Más rebotes
        </button>
      </div>
      <div className="partidosContainer">
        {currentItems.map((partido) => (
          <div key={partido.id} className="partidoItem">
            <p>{partido.id}</p>
            <p>Minutos: {partido.minutos}</p>
            <p>Puntos: {partido.puntos}</p>
            <p>Asistencias: {partido.asistencias}</p>
            <p>Rebotes: {partido.rebotes}</p>
            <p>Valoración: {partido.valoracion}</p>
            <br></br>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
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

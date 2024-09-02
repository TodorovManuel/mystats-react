import React, { useState, useEffect } from "react";
import NavBar from '../NavBar/NavBar';
import './stats.css';

const Stats = () => {
  const [promedio, setPromedio] = useState({
    minutosJugados: 0,
    segundosJugados: 0,
    puntos: 0,
    rebotesOfensivos: 0,
    rebotesDefensivos: 0,
    asistencias: 0,
    perdidas: 0,
    recuperaciones: 0,
    faltasCometidas: 0,
    faltasRecibidas: 0,
    taponesCometidos: 0,
    taponesRecibidos: 0,
    valoracion: 0,
    tiros: {
      tirosDeCampo: 0,
      tirosDeCampoConvertidos: 0,
      tirosDeDos: 0,
      tirosDeDosConvertidos: 0,
      tirosDeTres: 0,
      tirosDeTresConvertidos: 0,
      tirosLibres: 0,
      tirosLibresConvertidos: 0,
    }
  });
  const [datosUser, setDatosUser] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    club: '',
    dorsal : '',
    altura: '',
    peso: ''
    });

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde localStorage

    fetch('http://localhost:3000/api/usuarios/promedio', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No autorizado');
        }
        return response.json();
      })
      .then(data => {
        setPromedio(data.promedio);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtener el token JWT desde localStorage

        fetch('http://localhost:3000/api/usuarios/traerDatos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No autorizado');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.datos);
                setDatosUser(data.datos);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    , []);
    console.log(datosUser.nacimiento.split('T')[0]);
    datosUser.nacimiento = datosUser.nacimiento.split('T')[0];
  return (
    <div>
      <NavBar />
      <div className="statsContainer">
        <div className="playerContainer">
          <div className="playerText">
            <div className="present">
              <h1>{datosUser.nombre} {datosUser.apellido}</h1>
              <form action="/upload" method="post" enctype="multipart/form-data">
                <label htmlFor="imagen">Elige una imagen:</label>
                <input type="file" id="imagen" name="imagen" accept="image/*"></input>
                <button type="submit">Subir Imagen</button>
              </form>
            </div>
            <div className="moreDetailCont">
              <div className="ultraDetail">
                <p>HT/HW: </p>
                <p>Nacimiento: </p>
                <p>Club: </p>
                <p>Dorsal: </p>
              </div>
              <div className="ultraDetail">
                <p><b>{datosUser.altura}cm/{datosUser.peso}kg</b></p>
                <p><b>{datosUser.nacimiento}</b></p>
                <p><b>{datosUser.club}</b></p>
                <p><b>{datosUser.dorsal}</b></p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="statsColumn topRow">
            <div>
              <p className="statsDivTitle">Partidos</p>
              <p className="statsDivInfo">48</p> {/* Actualiza con otra parte del JSON si es necesario */}
            </div>
            <div>
              <p className="statsDivTitle">Minutos</p>
              <p className="statsDivInfo">{promedio.minutosJugados}</p>
            </div>
            <div>
              <p className="statsDivTitle">Puntos</p>
              <p className="statsDivInfo">{promedio.puntos}</p>
            </div>
            <div>
              <p className="statsDivTitle">Rebotes</p>
              <p className="statsDivInfo">{promedio.rebotesOfensivos + promedio.rebotesDefensivos}</p> {/* Suma ambos tipos de rebotes */}
            </div>
            <div>
              <p className="statsDivTitle">Asistencias</p>
              <p className="statsDivInfo">{promedio.asistencias}</p>
            </div>
          </div>
          <div className="statsColumn lowRow">
            <div>
              <p className="statsDivTitle">Robos</p>
              <p className="statsDivInfo">{promedio.recuperaciones}</p>
            </div>
            <div>
              <p className="statsDivTitle">Pérdidas</p>
              <p className="statsDivInfo">{promedio.perdidas}</p>
            </div>
            <div>
              <p className="statsDivTitle">Tapones</p>
              <p className="statsDivInfo">{promedio.taponesCometidos}</p>
            </div>
            <div>
              <p className="statsDivTitle">Faltas</p>
              <p className="statsDivInfo">{promedio.faltasCometidas}</p>
            </div>
            <div>
              <p className="statsDivTitle">Valoración</p>
              <p className="statsDivInfo">{promedio.valoracion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;

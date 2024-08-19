import React from "react";
import NavBar from "../NavBar/NavBar";
import './agregar.css';                                                                                                                  
const Agregar = () => {
    return (
        <div>
            <NavBar />
            <div className="agregarContainer">
            <h2>Agregar Partido</h2>
            <form>
                <div className="formStatsContainer">
                <label>Datos partido</label>
                <div>
                <input type="text" placeholder="Equipo rival"></input>
                <input type="date" placeholder="Fecha"/>
                <input type="number" placeholder="Puntos a favor"/>
                <input type="number" placeholder="Puntos en contra"/>
                </div>
                </div>

                <div className="formStatsContainer">
                <label>Estadísticas jugador</label>
                <div className="formInputContainer">
                <input type="number" placeholder="Minutos jugados"></input>
                <input type="number" placeholder="Segundos jugados"></input>
                <input type="number" placeholder="Puntos convertidos"></input>
                <input type="number" placeholder="Rebotes ofensivos"></input>
                <input type="number" placeholder="Rebotes defensivos"></input>
                <input type="number" placeholder="Asistencias"></input>
                <input type="number" placeholder="Faltas cometidas"></input>
                <input type="number" placeholder="Faltas recibidas"></input>
                <input type="number" placeholder="Tapones cometidos"></input>
                <input type="number" placeholder="Tapones recibidos"></input>
                <input type="number" placeholder="Balones perdidos"></input>
                <input type="number" placeholder="Recuperaciones"></input>
                <input type="number" placeholder="Valoracion"></input>
                </div>
                </div>

                <div className="formStatsContainer">
                <label>Estadísticas tiros</label>
                <div className="formInputContainer">
                <input type="number" placeholder="Tiros de campo"></input>
                <input type="number" placeholder="Tiros de campo convertidos"></input>
                <input type="number" placeholder="Tiros de dos"></input>
                <input type="number" placeholder="Tiros de dos convertidos"></input>
                <input type="number" placeholder="Tiros de tres"></input>
                <input type="number" placeholder="Tiros de tres convertidos"></input>
                <input type="number" placeholder="Tiros libres"></input>
                <input type="number" placeholder="Tiros libres convertidos"></input>
                </div>
                </div>

                <button className="formAgregarBtn" type="submit">Agregar partido</button>
            </form>
            </div>

        </div>
    );
}

export default Agregar;
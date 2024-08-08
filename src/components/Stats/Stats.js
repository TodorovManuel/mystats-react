import React from "react";
import NavBar from '../NavBar/NavBar'
import './stats.css'

const Stats = () => {   
    return (
        <div>
            <NavBar />
            <div className="statsContainer">
            <div className="playerContainer">
            <form method="post" action="/send/" enctype="multipart/form-data">
                <input type="file"></input>
            </form>

            <div className="playerText">
                <h1>Joaquin Bardelli</h1>
                <div className="detailCont">
                    <div>44</div>
                    <div className="moreDetailCont">
                        <div className="ultraDetail">
                        <p>HT/HW: </p>
                        <p>Nacimiento: </p>
                        <p>Club: </p>
                        </div>
                        <div className="ultraDetail">
                        <p><b>184cm/83kg</b></p>
                        <p><b>29/3/2006</b></p>
                        <p><b>Arquitectura</b></p>    
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="stats">
                <div>
                    <div>
                        <h3>Partidos</h3>
                    </div>
                    <div>
                        <h3>Minutos</h3>
                    </div>
                    <div>
                        <h3>Puntos</h3>
                    </div>
                    <div>
                        <h3>Rebotes</h3>
                    </div>
                    <div>
                        <h3>Asistencias</h3>
                    </div>
                    
                </div>
                <div>
                <div>
                        <h3>Robos</h3>
                    </div>
                    <div>
                        <h3>Pérdidas</h3>
                    </div>
                    <div>
                        <h3>Tahpones</h3>
                    </div>
                    <div>
                        <h3>Faltas</h3>
                    </div>
                    <div>
                        <h3>Valoración</h3>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Stats;
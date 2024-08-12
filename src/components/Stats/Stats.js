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
    <input type="file" id="file-upload" />
</form>

            <div className="playerText">
                
                <div className="detailCont">
                <div className="present">
                <h1>Joaquin Bardelli</h1>
                <p>44</p>
                </div>
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
                <div className="statsColumn topColumn">
                    <div>
                        <h3>Partidos</h3>
                        <p>48</p>
                    </div>
                    <div>
                        <h3>Minutos</h3>
                        <p>344</p>
                    </div>
                    <div>
                        <h3>Puntos</h3>
                        <p>106</p>
                    </div>
                    <div>
                        <h3>Rebotes</h3>
                        <p>147</p>
                    </div>
                    <div>
                        <h3>Asistencias</h3>
                        <p>26</p>
                    </div>
                    
                </div>
                <div className="statsColumn lowFile">
                <div>
                        <h3>Robos</h3>
                        <p>7</p>
                    </div>
                    <div>
                        <h3>Pérdidas</h3>
                        <p>45</p>
                    </div>
                    <div>
                        <h3>Tapones</h3>
                        <p>2</p>
                    </div>
                    <div>
                        <h3>Faltas</h3>
                        <p>56</p>
                    </div>
                    <div>
                        <h3>Valoración</h3>
                        <p>89</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Stats;
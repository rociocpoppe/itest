/* *****************************************************************************************
COSAS PARA HACER:
- Asignar turnos
- Saber si hay un ganador y quien es
- Las piezas de cada jugador se dibujan con una imagen
- Se debe poder reiniciar el juego, (hace otros 49 casilleros, no los reinicia)
- Colocar un timer que limite el tiempo de juego.
- Terminar logica de tamaños de distintos tableros(6 en línea, 7 en línea, 8 en línea)
- Agregar diferentes tipos de fichas (colores, formatos).
- Cortar las imagenes para la ficha redonda
*******************************************************************************************/



let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let esTableroInicial = true;

const CANT_FIG = 25;
let dificultad = 4;
let dimX = 600;
let dimY = 600;
let tableroI = new Tablero(ctx, dimX, dimY);
let casilleros = tableroI.getCasilleros();

let mousedown = false;

// let tableroJuego = [];
// for (let i = 0; i < 7; i++) {
//     tableroJuego[i] = new Array(6);//agrega 6 posiciones vacias al arreglo (el alto del tablero)
//     //console.log(tableroJuego[i]);
// }

// let game= new Juego(ctxJuego,juego.width, juego.height);
// game.dibujarJuego();


//tablerot.dibujarTablero();




let lastClickedFigure = null;
let isMouseDown = false;
let fichasJ1 = [];
let fichasJ2 = [];
let turnoJ1 = true;
let turnoJ2 = false;
let ganador;
let gano = false;

// function addFigure() {

//     addCircle();

//     drawFigure();
// }
// let imagen_1 = document.querySelector("#tres");
let imagen_1 = new Image();
function cargarImagenUno() {
    imagen_1.src = "3.png";
    imagen_1.onload = function () {
        //console.log(imagen_1);
        //ctx.drawImage(this.imagen_1, this.posX - this.radius, this.posY- this.radius, this.radius * 2 , this.radius * 2);
        //return imagen_1;
    }
    return imagen_1;
}

// let imagen_2 = document.querySelector("#cuatro");
let imagen_2 = new Image();
function cargarImagenDos() {
    imagen_2.src = "4.png";
    imagen_2.onload = function () {
        //console.log(imagen_2);
        //ctx.drawImage(this.imagen_2, this.posX - this.radius, this.posY- this.radius, this.radius * 2 , this.radius * 2);
        //console.log(imagen_2);

    }
    return imagen_2;
}

function setDificultad(e){

    if(e.target.id == "cuatro"){
        console.log("cuatro")
        dificultad = 4;
        dimX = 600;

    }
    else if(e.target.id == "cinco"){
        console.log("cinco")
        dificultad = 5;
        dimX = 700;
    }
    else if(e.target.id == "seis"){
        console.log("seis")
        dificultad = 6;
        dimX = 800;
    }
    else{
        console.log("siete")
        dificultad = 7;
        dimX = 900;
    }
  
    // addFigures();
    // tablero();
    // drawFigure();


}

function drawFigure() {
    clearCanvas();
    //cada vez que muevo uno, se va borrando todo y re dibujando
    for (let i = 0; i < fichasJ1.length; i++) {
        fichasJ1[i].setId(i + 1);
        fichasJ1[i].draw();
        // console.log( fichasJ1[i]);
    }
    for (let i = 0; i < fichasJ2.length; i++) {
        fichasJ2[i].setId(i + CANT_FIG + 1);
        fichasJ2[i].draw();
        //console.log( fichasJ2[i]);
    }
    if (!esTableroInicial) {
        tablero();
    }

}

addFigures();
tablero();
function tablero() {
    // if (!esTableroInicial) {
    //     let tablero = new Tablero(ctx, 700, 700);
    //     tablero.dibujarTablero(esTableroInicial);
    // } else {
    tableroI.dibujarTablero(esTableroInicial);
    esTableroInicial = false;
    // }

}

//SIRVE PARA CAMBIAR DE FICHA
// function addRect(){
//     let posX=Math.round(Math.random()*canvasWidth);
//     let posY=Math.round(Math.random()*canvasHeight);
//     let color=randomRGBA();
//     let rect=new Rect(posX,posY,Math.round(Math.random()*50),Math.round(Math.random()*50),color,ctx);
//     figures.push(rect);


// }

function addCircle() {
    //let color=randomRGBA();
    for (let i = 0; i < CANT_FIG; i++) {
        let circle1 = new Circle( 50, canvasHeight - 200, 35, "blue", ctx);
        fichasJ1.push(circle1);
        let circle2 = new Circle(canvasWidth - 50, canvasHeight - 200, 35, "red", ctx);
        fichasJ2.push(circle2);

    }


}




function addFigures() {

    addCircle();
    drawFigure();

}

function clearCanvas() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}


function findClickedFigure(x, y) {
    for (let i = 0; i < fichasJ1.length; i++) {
        const element = fichasJ1[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
    for (let i = 0; i < fichasJ2.length; i++) {
        const element = fichasJ2[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

function onMouseDown(e) {
    isMouseDown = true;
    if (lastClickedFigure != null) {
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }
    let clickFig = findClickedFigure(e.layerX, e.layerY);//coordenadas de x e y dentro del canvas

    if (clickFig != null) {
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
    drawFigure();

}

function esTurno() {
    let jugador = "";

    if (lastClickedFigure.getId() <= CANT_FIG) {
        jugador = "Jugador 1"; //Esto no hace nada, lo puse para probar una cosa
        if (turnoJ1) {
            // turnoJ1 = false;
            // turnoJ2 = true;
            return true;
        } else {
            return false;
        }

    } else {
        jugador = "Jugador 2";//Esto no hace nada, lo puse para probar una cosa
        if (turnoJ2) {
            // turnoJ1 = true;
            // turnoJ2 = false;
            return true;
        } else {
            return false;
        }

    }

}

canvas.addEventListener('click', function (e) {
    let cont = 0;



    if (lastClickedFigure != null && esTurno() && !gano) {


        //        isMouseDown = false;
        let _x = e.layerX;
        let _y = e.layerY;
        //MAP -> [ ID, [casillero, false, fila, columna] ]


        for (const [id, dataCasillero] of casilleros) {
            if (!gano) {
                // for (let i = 0; i < casilleros.length; i++) {//49 pos

                //console.log("ENTRO AL FOR");
                if (_x < dataCasillero[0].getPosX() + dataCasillero[0].getRadius() &&
                    _x > dataCasillero[0].getPosX() - dataCasillero[0].getRadius()) {

                  if (_y <= canvasHeight - tableroI.getHeight()) {
                       
                        let columna = dataCasillero[0].getPosX();
                        // console.log(columna);

                        let fila = canvasHeight - 50 //tableroI.getHeight() + 50;

                        while (fila > canvasHeight - tableroI.getHeight() - 49 && cont != 1) {
                            let id = "" + fila + columna;  // id = ""+fila+100+columna;
                            console.log(id);
                            if (casilleros.get(id)[1] == false && cont == 0) {

                                casilleros.get(id)[0].setFill(lastClickedFigure.getFill());
                                casilleros.get(id)[0].setId(lastClickedFigure.getId());
                                casilleros.get(id)[1] = true;
                                casilleros.get(id)[0].draw();

                                if (lastClickedFigure.getId() <= CANT_FIG) {

                                    turnoJ1 = false;
                                    turnoJ2 = true;
                                    casilleros.get(id)[0].setJugador(1);
                                    for (let i = 0; i < fichasJ1.length; i++) {
                                        if (fichasJ1[i].getId() == lastClickedFigure.getId()) {
                                            fichasJ1.splice(i, 1);

                                            drawFigure();
                                        }
                                    }
                                    //document.getElementById("texto").innerHTML = "Es el turno del jugador 2 ";
                                }

                                else {
                                    turnoJ1 = true;
                                    turnoJ2 = false;
                                    casilleros.get(id)[0].setJugador(2);
                                    for (let i = 0; i < fichasJ2.length; i++) {
                                        if (fichasJ2[i].getId() == lastClickedFigure.getId()) {
                                            fichasJ2.splice(i, 1);

                                            drawFigure();
                                        }

                                    }
                                    //document.getElementById("texto").innerHTML = "Es el turno del jugador 1 ";
                                }
                                if (
                                    chequeoVertical(id, fila, columna) ||
                                    chequeoHorizontal(id, fila, columna) ||
                                    chequeoDiagonalUno(id, fila, columna) ||
                                    chequeoDiagonalDos(id, fila, columna)
                                ) {

                                    gano = true;
                                    ganador = casilleros.get(id)[0].getJugador();
                                    document.getElementById("texto").innerHTML = "GANADOR JUGADOR " + ganador + "!!!";
                                }


                                cont = 1;

                            }


                            fila -= 100;

                        }

                    }else{
                        let px = canvasWidth - 75;
                        lastClickedFigure.setPosition(px, _y);
                        lastClickedFigure.draw();
                    }
                }
            } else {
                break;
            }
        }


    }
});

//MAP -> [ ID, [casillero, false, fila, columna] ]

function chequeoVertical(id, fila, columna) {
    let contLinea = 1;
    let incremento = 100;

    for (let i = 0; i < dificultad - 1; i++) {
        let idAux = "" + (fila + incremento) + columna;
        let casillero = casilleros.get(idAux);
        if (casillero != undefined) {
            if (casillero[1] == true &&
                casillero[0].getJugador() == casilleros.get(id)[0].getJugador()) {
                contLinea++;
                if (contLinea == dificultad) {
                    return true;
                }
            }
            else {
                break;
            }
        }
        incremento += 100;
    }
}

function chequeoHorizontal(id, fila, columna) {

    let contLinea = 1;
    let incrementoIzq = 100;
    let incrementoDer = 100;


    for (let i = 0; i < dificultad - 1; i++) {

        let idIzq = "" + fila + (columna - incrementoIzq);
        let casilleroIzq = casilleros.get(idIzq);

        if (casilleroIzq != undefined) {
            if (casilleroIzq[1] == true &&
                casilleroIzq[0].getJugador() == casilleros.get(id)[0].getJugador()) {
                contLinea++;
            }
            else {
                break;
            }
        }
        incrementoIzq += 100;
    }

    for (let i = 0; i < dificultad - 1; i++) {

        let idDer = "" + fila + (columna + incrementoDer);
        // console.log(idDer);
        let casilleroDer = casilleros.get(idDer);
        //console.log(casilleroDer);
        if (casilleroDer != undefined) {
            if (casilleroDer[1] == true &&
                casilleroDer[0].getJugador() == casilleros.get(id)[0].getJugador()) {
                contLinea++;

            }
            else {
                break;
            }
        }
        incrementoDer += 100;
    }

    if (contLinea >= dificultad) {
        return true;
    }


}

function chequeoDiagonalUno(id, fila, columna) {

    let contLinea = 1;
    let incrementoIzq = 100;
    let incrementoDer = 100;


    for (let i = 0; i < dificultad - 1; i++) {

        let idIzq = "" + (fila - incrementoIzq) + (columna - incrementoIzq);
        let casilleroIzq = casilleros.get(idIzq);

        if (casilleroIzq != undefined) {
            if (casilleroIzq[1] == true &&
                casilleroIzq[0].getJugador() == casilleros.get(id)[0].getJugador()) {
                contLinea++;
            }
            else {
                break;
            }
        }
        incrementoIzq += 100;
    }

    for (let i = 0; i < dificultad - 1; i++) {

        let idDer = "" + (fila + incrementoDer) + (columna + incrementoDer);
        // console.log(idDer);
        let casilleroDer = casilleros.get(idDer);
        //console.log(casilleroDer);
        if (casilleroDer != undefined) {
            if (casilleroDer[1] == true &&
                casilleroDer[0].getJugador() == casilleros.get(id)[0].getJugador()) {
                contLinea++;
            }
            else {
                break;
            }
        }
        incrementoDer += 100;
    }

    if (contLinea >= dificultad) {
        return true;
    }
}

function chequeoDiagonalDos(id, fila, columna) {
    let contLinea = 1;
    let incrementoIzq = 100;
    let incrementoDer = 100;


    for (let i = 0; i < dificultad - 1; i++) {

        let idIzq = "" + (fila + incrementoIzq) + (columna - incrementoIzq);
        let casilleroIzq = casilleros.get(idIzq);

        if (casilleroIzq != undefined) {
            if (casilleroIzq[1] == true &&
                casilleroIzq[0].getJugador() == casilleros.get(id)[0].getJugador()) {
                contLinea++;
            }
            else {
                break;
            }
        }
        incrementoIzq += 100;
    }

    for (let i = 0; i < dificultad - 1; i++) {

        let idDer = "" + (fila - incrementoDer) + (columna + incrementoDer);
        // console.log(idDer);
        let casilleroDer = casilleros.get(idDer);
        //console.log(casilleroDer);
        if (casilleroDer != undefined) {
            if (casilleroDer[1] == true &&
                casilleroDer[0].getJugador() == casilleros.get(id)[0].getJugador()) {
                contLinea++;
            }
            else {
                break;
            }
        }
        incrementoDer += 100;
    }

    if (contLinea >= dificultad) {
        return true;
    }

}

let posWinners = [[0, 0], [0, 0], [0, 0], [0, 0]];

function getGanador(ficha, casilleros) {
    //console.log(casilleros);
    let xFicha = ficha.getPosX();
    let yFicha = ficha.getPosY();

    let valorFicha = casilleros[xFicha][yFicha];
    for (var i = 0; i < 8; i += 2) {

        let lado1 = fCount(dx[i], dy[i], xFicha + dy[i], yFicha + dx[i], valorFicha);
        let lado2 = fCount(dx[i + 1], dy[i + 1], xFicha + dy[i + 1], yFicha + dx[i + 1], valorFicha);
        if (lado1 + lado2 + 1 >= 4) {
            posi = 0;
            fCount2(dx[i], dy[i], xFicha + dy[i], yFicha + dx[i], valorFicha, posi);
            fCount2(dx[i + 1], dy[i + 1], xFicha + dy[i + 1], yFicha + dx[i + 1], valorFicha, posi);
            posWinners[posi] = [xFicha, yFicha];
            return true;
        }
    }
    return false;
}

function fCount(mx, my, columna, fila, valorFicha) {
    if (fila < 0 || fila > 5 || columna < 0 || columna > 6)
        return 0;
    if (tableroI[columna][fila] != valorFicha)
        return 0;
    return 1 + fCount(mx, my, columna + my, fila + mx, valorFicha);
}
var posi = 0;
function fCount2(mx, my, columna, fila, valorFicha) {
    if (fila < 0 || fila > 5 || columna < 0 || columna > 6)
        return;
    if (tableroI[columna][fila] != valorFicha)
        return;
    posWinners[posi] = [columna, fila];
    posi++;
    fCount2(mx, my, columna + my, fila + mx, valorFicha);
}

//para iniciar toma el valor de la posicion de la ficha en el tablero

function onMouseUp(e) {
    isMouseDown = false;
}

function onMouseMove(e) {

    //si tengo el mouse abajo y tengo una figura seleccionada, a la figura le pongo la nueva posicion y la dibujo de nuevo
    if (isMouseDown && lastClickedFigure != null && esTurno() && !gano) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);

        drawFigure();
    }


}


// ANIMAR FICHA CAYENDO
function dejarFichaCaer(x, y, yMax) {
    ctx.clearRect(x - tableroI.getCasillero() / 2, 0, tableroI.getCasillero(), yMax);///############ACA CAMBIE NOMBRE DE LA VARIABLE TABLERO
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
    if (y !== yMax) {
        y += 10;
        setTimeout('dejarFichaCaer(' + x + ',' + y + ', ' + yMax + ')', 1);
    }
    return;
}





// setTimeout(()=>{
//     reiniciarJuego();

// },300000); //cada esta cantidad de milisegundos llama a la función add figures

function reiniciarJuego() {
    esTableroInicial = true;
    gano = false;
    turnoJ1 = true;
    turnoJ2 = false;
    document.getElementById("texto").innerHTML = "";
    fichasJ1.splice(0);
    fichasJ2.splice(0);
    tableroI.getCasilleros().clear();
    tablero();
    addFigures();
    drawFigure();
}



canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
document.getElementById("cuatro").addEventListener("click", setDificultad);
document.getElementById("cinco").addEventListener("click", setDificultad);
document.getElementById("seis").addEventListener("click", setDificultad);
document.getElementById("siete").addEventListener("click", setDificultad);
/* *****************************************************************************************
COSAS PARA HACER:
- Las piezas de cada jugador se dibujan con una imagen
- Se debe poder reiniciar el juego, (hace otros 49 casilleros, no los reinicia)
- Colocar un timer que limite el tiempo de juego.
- Terminar logica de tamaños de distintos tableros(6 en línea, 7 en línea, 8 en línea)
- Agregar diferentes tipos de fichas (colores, formatos).
- Cortar las imagenes para la ficha redonda
*******************************************************************************************/

//se obtiene el canvas donde se va a trabajar y su contexto. 
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

//se definen todas las variables globales que se utilizarán en el código
let esTableroInicial = true;
const CANT_FIG = 25;
let dificultad = 4;
let dimX = 600;
let dimY = 600;
let tableroI = new Tablero(ctx, dimX, dimY);
let casilleros = tableroI.getCasilleros();
let mousedown = false;
let lastClickedFigure = null;
let isMouseDown = false;
let fichasJ1 = [];
let fichasJ2 = [];
let turnoJ1 = true;
let turnoJ2 = false;
let ganador;
let gano = false;
let inicio = false;
let fillF1 = document.getElementById("fichaJ1").value;
let fillF2 = document.getElementById("fichaJ2").value;
let minutos = 4;
let segundos = 59;
let cadena;
let tiempo = true;
let temp;




//se determina la dificultad del juego, siendo 4 la opción predeterminada. Se puede jugar además con las opciones de 
//5,6 o 7 en linea. Dentro de cada if se setean las medidas del tablero correspondiente a cada caso del juego
function setDificultad(e){

    if(e.target.id == "cuatro"){

        dificultad = 4;
        tableroI.setWidth(600);
        tableroI.setHeight(600);

    }
    else if(e.target.id == "cinco"){

        dificultad = 5;
        tableroI.setWidth(700);
        tableroI.setHeight(700);
    }
    else if(e.target.id == "seis"){

        dificultad = 6;
        tableroI.setWidth(800);
        tableroI.setHeight(800);
    }
    else{

        dificultad = 7;
        tableroI.setWidth(900);
        tableroI.setHeight(900);
    }
    // esTableroInicial = true;
    // addFigures();
    // tableroI.dibujarTablero(esTableroInicial);
    // esTableroInicial = false;
    reiniciarJuego();
 }

//dibuja las figuras necesarias para el juego. Primero se borra el canvas y luego, se dibujan las fichas del jugador 1 y 
//jugador 2. Además se setea por cada ficha un id para poder luego identificarlas. También se dibuja el tablero si
// no es la primera vez que se carga.
function drawFigure() {
    clearCanvas();
    if (!esTableroInicial) {
        tablero();
    }
    //cada vez que muevo uno, se va borrando todo y re dibujando
    for (let i = 0; i < fichasJ1.length; i++) {
        fichasJ1[i].setId(i + 1);
        fichasJ1[i].draw();

    }
    for (let i = 0; i < fichasJ2.length; i++) {
        fichasJ2[i].setId(i + CANT_FIG + 1);
        fichasJ2[i].draw();

    }


}

//lama a la función
// addFigures();
drawFigure();
//lama a la función
tablero();

//Si es la primera vez que se carga, se dibuja el tablero y se setea en falso la variable esTableroInicial para
//que luego cada vez que se muevan las fichas, se borre el canvas y se vuelva a redibujar el tablero pero con las 
//posiciones ya ocupadas en él.
function tablero() {
    tableroI.dibujarTablero(esTableroInicial);
    esTableroInicial = false;

}

//SIRVE PARA CAMBIAR DE FICHA
// function addRect(){
//     let posX=Math.round(Math.random()*canvasWidth);
//     let posY=Math.round(Math.random()*canvasHeight);
//     let color=randomRGBA();
//     let rect=new Rect(posX,posY,Math.round(Math.random()*50),Math.round(Math.random()*50),color,ctx);
//     figures.push(rect);


// }


//se agregan las fichas del jugador1 y del jugador 2. Para agregarlas se tiene en cuenta que la cantidad de fichas sea 
//menor a la cantidad de fichas necesarias para cada participante. Cada vez que realiza la iteración, se crea una instancia
//de circle (que sería nuestra ficha redonda) y se le pasan los parámetros necesarios para poder dibujarla.
//Luego, se inserta la ficha en el arreglo de fichas de cada jugador.
function addCircle() {
    //let color=randomRGBA();
    for (let i = 0; i < CANT_FIG; i++) {
        let circle1 = new Circle( 50, canvasHeight - 200, 35,"#ffffff" , ctx, fillF1);
        fichasJ1.push(circle1);
        let circle2 = new Circle(canvasWidth - 50, canvasHeight - 200, 35,"#ffffff" , ctx,fillF2);
        fichasJ2.push(circle2);

    }


}

//crea las figuras para nuestras fichas y llama a la función draFigures que se encargar de dibujar/redibujar el canvas
function addFigures() {

    addCircle();
    // drawFigure();

}

//borra el canvas completo, estableciendo como relleno el color blanco
function clearCanvas() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

//se recorren las fichas de ambos jugadores y se pregunta a la clase circle si la posición está dentro de la 
//ficha. En caso de que esté, nos devuelve la ficha.
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



//se determina el turno de los jugadores. Por default, se decidió que el jugador 1 siempre comience el juego.
//Para obtener el turno de quien corresponda, se utiliza el id de la última imagen clickeada. Luego de obtener el 
//turno, se cambia la variable turno, para que en la próxima iteración tenga turno el otro jugador.
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
    if (lastClickedFigure != null && esTurno() && !gano && inicio && tiempo) {
        //        isMouseDown = false;
        let _x = e.layerX;
        let _y = e.layerY;
        //MAP -> [ ID, [casillero, false, fila, columna] ]
        for (const [id, dataCasillero] of casilleros) {
            if (!gano) {
                // for (let i = 0; i < casilleros.length; i++) {//49 pos


                if (_x < dataCasillero[0].getPosX() + dataCasillero[0].getRadius() &&
                    _x > dataCasillero[0].getPosX() - dataCasillero[0].getRadius()) {

                  if (_y <= canvasHeight - tableroI.getHeight()) {
                       
                        let columna = dataCasillero[0].getPosX();
   

                        let fila = canvasHeight - 50 //tableroI.getHeight() + 50;

                        while (fila > canvasHeight - tableroI.getHeight() - 49 && cont != 1) {
                            let id = "" + fila + columna;  // id = ""+fila+100+columna;

                            if (casilleros.get(id)[1] == false && cont == 0) {
                                let nuevoPosX = casilleros.get(id)[0].getPosX();
                                let nuevoPosY = casilleros.get(id)[0].getPosY();
                                lastClickedFigure.setPosition(nuevoPosX, nuevoPosY);
                                
                                //casilleros.get(id)[0].setFill(lastClickedFigure.getFill());
                                casilleros.get(id)[0].setId(lastClickedFigure.getId());
                                casilleros.get(id)[1] = true;
                                //casilleros.get(id)[0].draw();
                                drawFigure();

                                //se chequea si el id de la última imagen clickeada es del jugador 1
                                if (lastClickedFigure.getId() <= CANT_FIG) {
                                    turnoJ1 = false;
                                    turnoJ2 = true;
                                    casilleros.get(id)[0].setJugador(1);
                                    //si el id de la ficha en la posición es igual al id de la última figura 
                                    //clickeada, se borra la ficha en esa posición, y se dibuja. 
                                    // for (let i = 0; i < fichasJ1.length; i++) {
                                    //     if (fichasJ1[i].getId() == lastClickedFigure.getId()) {
                                    //         fichasJ1.splice(i, 1);

                                    //         drawFigure();
                                    //     }
                                    // }
                                    //document.getElementById("texto").innerHTML = "Es el turno del jugador 2 ";
                                }
                                else {
                                    turnoJ1 = true;
                                    turnoJ2 = false;
                                    casilleros.get(id)[0].setJugador(2);
                                    // for (let i = 0; i < fichasJ2.length; i++) {
                                    //     if (fichasJ2[i].getId() == lastClickedFigure.getId()) {
                                    //         fichasJ2.splice(i, 1);

                                    //         drawFigure();
                                    //     }

                                    // }
                                    //document.getElementById("texto").innerHTML = "Es el turno del jugador 1 ";
                                }
                                //se corrobora si hay ganador. Para esto se chequea vertical, horizontal y diagonales
                                if (
                                    chequeoVertical(id, fila, columna) ||
                                    chequeoHorizontal(id, fila, columna) ||
                                    chequeoDiagonalUno(id, fila, columna) ||
                                    chequeoDiagonalDos(id, fila, columna)
                                ) {

                                //en caso de que haya la cantidad de fichas requeridas para ganar 
                                //(4,5,6  o 7 en linea, de acuerdo al juego elegido), se setea la variable 
                                //gano en verdadero y se obtiene el id del ganador para imprimirlo en el DOM
                                    gano = true;
                                    ganador = casilleros.get(id)[0].getJugador();
                                    clearInterval(temp);
                                    segundos = 59;
                                    minutos = 4;
                                    document.getElementById("texto").innerHTML = "GANADOR JUGADOR " + ganador + " !!!";
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
//se chequea verticalmente si hay un ganador. Para esto, se itera de acuerdo a la dificultad del juego 
//(4,5,6 o 7 veces). Se utiliza la fila y la columna de ubicación de la ficha y se genera un id auxiliar
//que nos servirá para comparar con el id de cada casillero. Si el casillero esta definido, se mira en el array map
//si es true (lo que significa que está ocupado) y se obtiene el jugador que puso la ficha. Si el id también es igual, 
//suma 1 a la cuenta. En caso de que la dificultad del juego sea igual al comtador, se determina que el participante
//ganó.
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

//se chequea horizontalmente si hay un ganador. Para poder comprobar si hay ganador, en esta función 
//se tiene en cuenta tanto las fichas a la derecha como a la izquierda.También se hace uso de break para los casos e
//los que no encuentra una ficha del mismo jugador o no hay ficha definida, deje de contar.
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
        let casilleroDer = casilleros.get(idDer);
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
//se chequea diagonalmente si hay un ganador. Para poder comprobar si hay ganador, en esta función 
//se tiene en cuenta tanto las fichas hacia arriba como hacia abajo.También se hace uso de break para los casos en
//los que no encuentra una ficha del mismo jugador o no haya ficha puesta, deje de contar.
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

        let casilleroDer = casilleros.get(idDer);

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

        let casilleroDer = casilleros.get(idDer);
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


//se llama una vez que se apreta el boton izquierdo del mouse.Sirve para obtener la posición clickeada y preguntar
//si esa posición esté dentro de alguna de las fichas. En caso de que encuentre alguna ficha en esa posición,
//la ultima imagen clickeada se vuelve la imagen que retorna la funcion findClickedFigure
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

//determina que el botón del mouse dejó de apretarse. Setea la variable isMouseDown en falso, lo que sirve 
//para cortar la función que establece el mousedown. 
function onMouseUp(e) {
    isMouseDown = false;
}

//determina si el mouse se está moviendo. Si tengo el mouse abajo, tengo una figura seleccionada, 
//y además no hay ganador, a la última figura clickeada, le pongo la nueva posicion y la dibujo de nuevo
function onMouseMove(e) {
    if (isMouseDown && lastClickedFigure != null && esTurno() && !gano && inicio) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        lastClickedFigure.draw();
        drawFigure();
    }
}


//reinicia el juego ante el evento addEventListener del boton con id reiniciar.
//borra las fichas de ambos jugadores, borra el tablero y vuelve a dibujar todo llamando a las funciones 
//que se encargan de hacerlo
function temporizador() {
    if(segundos < 10){
        cadena = minutos+":0"+segundos;
    }else{
        cadena = minutos+":"+segundos;
    }
    document.getElementById("texto").innerHTML = cadena;

  if (minutos == 0 && segundos == 0) {
        tiempo = false;
        document.getElementById("texto").innerHTML = "Se acabo el tiempo";
        clearInterval(temp);
  } else if (segundos == 0){
      minutos--;
      segundos=60;
  }    
    segundos--;
}




function iniciarJuego(){
    segundos = 59;
    minutos = 4;
    temp = setInterval(temporizador, 1000); 
    let msj = document.getElementById("msjFichas");
    msj.innerHTML = "";
    let selectJ1 = document.getElementById("fichaJ1").value;
    let selectJ2 = document.getElementById("fichaJ2").value;
     if(selectJ1 != selectJ2){
        inicio = true
        fillF1 = selectJ1;
        fillF2 = selectJ2;
        addFigures();
        drawFigure();
        document.getElementById("iniciar").style.display="none";
        document.getElementById("reiniciar").style.display="block";
     }else{
        msj.innerHTML = "No puedes seleccionar fichas iguales"; 
        inicio = false;
     }

     return inicio;
}

function reiniciarJuego() {
    clearCanvas();
    clearInterval(temp);
    segundos = 59;
    minutos = 4;
    inicio = false;
    esTableroInicial = true;
    gano = false;
    turnoJ1 = true;
    turnoJ2 = false;
    tiempo = true;
    document.getElementById("texto").innerHTML = "";
    fichasJ1.splice(0);
    fichasJ2.splice(0);
    tableroI.getCasilleros().clear();
    tablero();
    document.getElementById("iniciar").style.display="block";
    document.getElementById("reiniciar").style.display="none";

}



canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
document.getElementById("cuatro").addEventListener("click", setDificultad);
document.getElementById("cinco").addEventListener("click", setDificultad);
document.getElementById("seis").addEventListener("click", setDificultad);
document.getElementById("siete").addEventListener("click", setDificultad);
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
document.getElementById("iniciar").addEventListener("click", iniciarJuego);
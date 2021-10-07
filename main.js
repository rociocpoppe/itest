/* *****************************************************************************************
COSAS PARA HACER:
- Asignar turnos
- Saber si hay un ganador y quien es
- Las piezas de cada jugador se dibujan con una imagen
- Se debe poder reiniciar el juego, 
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

// fichita();
// function fichita(){


//     var imagen = new Image();
//     imagen.src = "4.png";
//     imagen.onload = function(){
//            var image = ctx.createPattern(imagen,"repeat");
//     ctx.rect(1100, 700, 200, 200);
//     ctx.fillStyle = image;
//     ctx.fill();
//     }


// }

let mousedown = false;

let tableroJuego = [];
for (let i = 0; i < 7; i++) {
    tableroJuego[i] = new Array(6);//agrega 6 posiciones vacias al arreglo (el alto del tablero)
    //console.log(tableroJuego[i]);
}

// let game= new Juego(ctxJuego,juego.width, juego.height);
// game.dibujarJuego();

let tableroI = new Tablero(ctx, 700, 700);
//tablerot.dibujarTablero();




let lastClickedFigure = null;
let isMouseDown = false;
let fichasJ1 = [];
let fichasJ2 = [];
function addFigure() {

    addCircle();

    drawFigure();
}

function drawFigure() {
    clearCanvas();
    //cada vez que muevo uno, se va borrando todo y re dibujando
    for (let i = 0; i < fichasJ1.length; i++) {
        fichasJ1[i].setId(i + 1);
        fichasJ1[i].draw();
    }
    for (let i = 0; i < fichasJ2.length; i++) {
        fichasJ2[i].setId(i + CANT_FIG + 1);
        fichasJ2[i].draw();
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
        let circle1 = new Circle(800, 200, 35, "blue", ctx)
        fichasJ1.push(circle1);
        let circle2 = new Circle(1100, 200, 35, "red", ctx)
        fichasJ2.push(circle2);

    }


}

// setTimeout(()=>{
//     addFigures();

// },333); //cada esta cantidad de milisegundos llama a la función add figures


function addFigures() {
    addFigure();
    if (fichasJ1.length < CANT_FIG) {
        setTimeout(addFigures, 333);
    }
    if (fichasJ2.length < CANT_FIG) {
        setTimeout(addFigures, 333);
    }
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
    let clickFig = findClickedFigure(e.layerX, e.layerY)//coordenadas de x e y dentro del canvas
    if (clickFig != null) {
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
    drawFigure();

}
canvas.addEventListener('click', function (e) {

    if (lastClickedFigure != null) {

        let cont = 0;
        //        isMouseDown = false;
        let _x = e.layerX;
        let casilleros = tableroI.getCasilleros();//[casillero, false, fila, columna]
        for (let i = 0; i < casilleros.length; i++) {//49 pos
            console.log("ENTRO AL FOR");
            if (_x < casilleros[i][0].getPosX() + casilleros[i][0].getRadius() &&
                _x > casilleros[i][0].getPosX() - casilleros[i][0].getRadius()) {

                let columna = casilleros[i][0].getPosX();
                console.log(columna);
                let index = casilleros.length;


                while (index > 0 || cont == 1) {

                    if (casilleros[index - 1][0].getPosX() == columna && casilleros[index - 1][1] == false && cont == 0) {
                        //console.log("ENTRO AL IF");
                        //console.log(lastClickedFigure);
                        casilleros[index - 1][0].setFill(lastClickedFigure.getFill());
                        casilleros[index - 1][1] = true;
                        casilleros[index - 1][0].draw();
                        encontroPosicion = true;
                        if (lastClickedFigure.getId() <= CANT_FIG) {
                            for (let i = 0; i < fichasJ1.length; i++) {
                                if (fichasJ1[i].getId() == lastClickedFigure.getId()) {
                                    fichasJ1.splice(i, 1);
                                    drawFigure();
                                }

                            }
                        } else {
                            for (let i = 0; i < fichasJ2.length; i++) {
                                if (fichasJ2[i].getId() == lastClickedFigure.getId()) {
                                    fichasJ2.splice(i, 1);
                                    drawFigure();
                                }

                            }

                        }
                        //lastClickedFigure
                        cont = 1;

                        //    let fila = casilleros[j][0].getPosY();
                        //    lastClickedFigure.setPosition(columna, fila);
                        //    lastClickedFigure.draw();
                        //    console.log("seteado en ("+columna+","+casilleros[j][1]+")");

                    }
                    console.log("CONTADOR: " + cont);
                    index--;
                    console.log(index);



                }

            }

        }

    }
});

function onMouseUp(e) {
    isMouseDown = false;

}

function onMouseMove(e) {

    //si tengo el mouse abajo y tengo una figura seleccionada, a la figura le pongo la nueva posicion y la dibujo de nuevo
    if (isMouseDown && lastClickedFigure != null) {
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


canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
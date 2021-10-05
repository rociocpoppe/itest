let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
let canvasWidth=canvas.width;
let canvasHeight=canvas.height;

const CANT_FIG=20;



let mousedown=false;

let tableroJuego = [];
for(let i = 0; i < 7; i++){
    tableroJuego[i] = new Array(6);//agrega 6 posiciones vacias al arreglo (el alto del tablero)
    //console.log(tableroJuego[i]);
}

// let game= new Juego(ctxJuego,juego.width, juego.height);
// game.dibujarJuego();

let tablerot=new Tablero(ctx,700,600);
//tablerot.dibujarTablero();



let figures=[];
let lastClickedFigure=null;
let isMouseDown=false;

let fichasJ2=[];
function addFigure(){
    
        addCircle();
        //tablerot.dibujarTablero();
    
    drawFigure();
}

function drawFigure(){
    clearCanvas();
    //cada vez que muevo uno, se va borrando todo y re dibujando
    for(let i=0;i<figures.length;i++){
        figures[i].draw();
    }
    for(let i=0;i<fichasJ2.length;i++){
        fichasJ2[i].draw();
    }
    tablerot.dibujarTablero();

}

//SIRVE PARA CAMBIAR DE FICHA
// function addRect(){
//     let posX=Math.round(Math.random()*canvasWidth);
//     let posY=Math.round(Math.random()*canvasHeight);
//     let color=randomRGBA();
//     let rect=new Rect(posX,posY,Math.round(Math.random()*50),Math.round(Math.random()*50),color,ctx);
//     figures.push(rect);
   

// }

function addCircle(){
    //let color=randomRGBA();
    let circle1=new Circle(800, 200, 35,"blue",ctx)
    figures.push(circle1);
    let circle2=new Circle(1100, 200, 35,"red",ctx)
    fichasJ2.push(circle2);

}

setTimeout(()=>{
    addFigures();
    
},333); //cada esta cantidad de milisegundos llama a la función add figures


function addFigures(){
    addFigure();
    if(figures.length<CANT_FIG){
        setTimeout(addFigures,333);
    }
    if(fichasJ2.length<CANT_FIG){
        setTimeout(addFigures,333);
    }
}

function clearCanvas(){
    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}


function findClickedFigure(x,y){
    for(let i=0; i<figures.length;i++){
        const element=figures[i];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
    for(let i=0; i<fichasJ2.length;i++){
        const element=fichasJ2[i];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
}

function onMouseDown(e){
    isMouseDown=true;
    if(lastClickedFigure!=null){
        lastClickedFigure.setResaltado(false);
        lastClickedFigure=null;
    }
    let clickFig= findClickedFigure(e.layerX,e.layerY)//coordenadas de x e y dentro del canvas
    if(clickFig!=null){
        clickFig.setResaltado(true);
        lastClickedFigure=clickFig;
    }
    drawFigure();
    
}

function onMouseUp(e){
    isMouseDown=false;
}

function onMouseMove(e){
    //si tengo el mouse abajo y tengo una figura seleccionada, a la figura le pongo la nueva posicion y la dibujo de nuevo
    if(isMouseDown && lastClickedFigure!=null){
        lastClickedFigure.setPosition(e.layerX,e.layerY);
        drawFigure();
    }
}


// ANIMAR FICHA CAYENDO
function dejarFichaCaer(x, y, yMax) {
    ctx.clearRect(x - tablerot.getCasillero()/2, 0, tablerot.getCasillero(), yMax);
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
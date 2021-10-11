class Tablero {

    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.casillero = 100;
        this.mitad = this.casillero / 2;
        this.width = width;
        this.height = height;
        this.casilleros = new Map();//[];
        this.fila = 0;
        this.columna = 0;

    }


    dibujarTablero(esTableroInicial) {
        let px = canvasWidth/2 - this.width/2;
        let py = canvasHeight - this.height;



        ctx.fillStyle = "#66B2FF";
        ctx.fillRect(px, py, this.width, this.height);//0,100,this.width, this.height

        if (esTableroInicial) {
            for (let i = py; i < this.width+py; i += this.casillero) {
                //this.fila++;
                for (let j = px ; j <  this.height+px; j += this.casillero) {
                   // if (j == 0) {
                    //     this.columna = 1;
                    // } else {
                    //     this.columna++;
                    // }
                    let casillero = new Circle(j + this.mitad, i + this.mitad, 35, "#ffffff", this.ctx);
                    casillero.draw();
                    let dataCasillero = [casillero, false];//, this.fila, this.columna
                   // this.casilleros.push(dataCasillero);
                   this.casilleros.set(""+(i + this.mitad)+(j + this.mitad), dataCasillero);
                   //this.casilleros.set(id, dato) id= posXposY -> 15050

                    // this.clearCircle(x + this.mitad, y + this.mitad, 35);
                }
            }
           
        }
        else {

            for (const [id, dataCasillero] of this.casilleros) {
               dataCasillero[0].draw();
              }
            // for (let i = 0; i < this.casilleros.length; i++) {

                

            // }
        }
      

    }

    getCasilleros() {
        return this.casilleros;
    }

    clearCircle(x, y, radius) {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }


    getCasillero() {
        return this.casillero;
    }

    getWidth() {
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    setWidth(w){
        this.width = w;
    }

    setHeight(h){
        this.height = h;
    }

}
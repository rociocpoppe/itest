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
    //let numero = 125;
    //console.log("CONVIERTO EL NUMERO 125 A BINARIO: numero.toString(2));  //"1111101"  
    //console.log("CONVIERTO EL NUMERO 1111101 A DECIMAL: parseInt(11001,2));  //"125"


    dibujarTablero(esTableroInicial) {
        
        // console.log("CONVIERTO EL NUMERO 125 A BINARIO: " + numero.toString(2));  //"1111101"  
        // console.log("CONVIERTO EL NUMERO 1111101 A DECIMAL: " + parseInt(1111101, 2));  //"125"

        ctx.fillStyle = "#66B2FF";
        ctx.fillRect(0, 100, this.width, this.height);

        if (esTableroInicial) {
            for (let i = 100; i < 800; i += this.casillero) {
                this.fila++;
                for (let j = 0; j < 700; j += this.casillero) {
                    if (j == 0) {
                        this.columna = 1;
                    } else {
                        this.columna++;
                    }
                    let casillero = new Circle(j + this.mitad, i + this.mitad, 35, "#ffffff", this.ctx);
                    casillero.draw();
                    let dataCasillero = [casillero, false, this.fila, this.columna];
                   // this.casilleros.push(dataCasillero);
                   this.casilleros.set(""+(i + this.mitad)+(j + this.mitad), dataCasillero);
                   //this.casilleros.set(id, dato) id= posXposY -> 15050

                    // this.clearCircle(x + this.mitad, y + this.mitad, 35);
                }
            }console.log(this.casilleros);
        }
        else {

            for (const [id, dataCasillero] of this.casilleros) {
               dataCasillero[0].draw();
              }
            // for (let i = 0; i < this.casilleros.length; i++) {

            //     this.casilleros[i][0].draw();

            // }
        }
        //console.log("casilleros" +this.casilleros.length); 
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


}
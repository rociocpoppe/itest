class Tablero{

    constructor(ctx,width, height){
        this.ctx=ctx;
        this.casillero = 100;
        this.mitad = this.casillero / 2;
        this.width=width;
        this.height=height;
        this.casilleros = [];
        this.fila = 0;
        this.columna = 0;
     
    }

    dibujarTablero(esTableroInicial){
   
    ctx.fillStyle = "#66B2FF";
    ctx.fillRect(0, 100, this.width, this.height);

    if(esTableroInicial){
        for (let y = 100; y < 800; y += this.casillero) {
            this.fila++;
            for (let x = 0; x < 700; x += this.casillero) {
                if(x == 0){
                    this.columna = 1;
                }else{
                  this.columna++;  
                }
                    let casillero = new Circle(x + this.mitad, y + this.mitad, 35,"#ffffff", this.ctx);
                    casillero.draw();
                    let dataCasillero = [casillero, false, this.fila, this.columna];
                    this.casilleros.push(dataCasillero);

               
                   // this.clearCircle(x + this.mitad, y + this.mitad, 35);
                }
            }
    }
    else{

        for (let i = 0; i < this.casilleros.length; i++) {
            
            this.casilleros[i][0].draw();
            
        }
    }
      console.log(this.casilleros); 
    }

    getCasilleros(){
        return this.casilleros;
    }

    clearCircle(x, y, radius) {
            ctx.beginPath();
            ctx.fillStyle = "#ffffff";
            ctx.arc(x,y,radius,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
    }


    getCasillero(){
        return this.casillero;
    }

    getWidth(){
        return this.width;
    }

    
}
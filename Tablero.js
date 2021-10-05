class Tablero{

    constructor(ctx,width, height){
        this.cxt=ctx;
        this.casillero = 100;
        this.mitad = this.casillero / 2;
        this.width=width;
        this.height=height;
    }

    dibujarTablero(){
        ctx.fillStyle = "#66B2FF";
        ctx.fillRect(0, 100, this.width, this.height);
        for (let y = 100; y < 700; y += this.casillero) {
            for (let x = 0; x < 700; x += this.casillero) {
                this.clearCircle(x + this.mitad, y + this.mitad, 35);
            }
        }
       
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
      


    
}
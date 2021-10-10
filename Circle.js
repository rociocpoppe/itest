class Circle extends Figure{
    
    //se crea el constructor de la ficha, con los parámetros necesarios para poder dibujarla en los diferentes casos que se presenten
    constructor(posX,posY,radius,fill,context){
        super(posX,posY,fill,context)
        this.radius=radius;
        this.id;
        this.jugador;
        this.imagen = fill;
    }

    //se obtiene la posición de x
    getPosX(){
        return this.posX;
    }

    //se obtiene la posición de y
    getPosY(){
        return this.posY;
    }
    //se define el relleno
    setFill(fill){
        this.fill = fill;
    }
    //se obtiene el relleno
    getFill(){
        return this.fill;
    }

    //se define el id
    setId(id){
        this.id = id;
    }
    //se define el jugador
    setJugador(jugador){
        this.jugador = jugador;
    }

    //se obtiene el ganador
    getJugador(){
        return this.jugador;
    }

    //se obtiene el id
    getId(){
        return this.id;
    }




    draw(){
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX,this.posY,this.radius,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();

        //****************************************************//
        // this.ctx.save();
        // this.ctx.beginPath();
        // this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        // this.ctx.closePath();
        // this.ctx.clip();
        // this.ctx.fileStyle = this.imagen;
        // if(this.imagen != "#ffffff"){
        //     this.ctx.drawImage(this.imagen, this.getPosX() - this.radius, this.getPosY()- this.radius, this.radius * 2 , this.radius * 2);   
            
        // }
        // this.ctx.fill();
        // ctx.shadowColor="black";
        // this.ctx.strokeStyle="black";
        // this.ctx.stroke();
        // this.ctx.restore();
        //*******************************************************//
    }

    getRadius(){
        return this.radius;
    }
    
    //se determina si está dentro de la ficha o no
    isPointInside(x,y){
        let _x=this.posX - x;//posicion del circulo - la posicion x donde esta el mouse
        let _y=this.posY - y; //posicion del circulo - la posicion y donde esta el mouse
        return Math.sqrt(_x*_x + _y*_y)< this.radius;
        //si la distancia es menor al radio, estoy adentro del circulo
    }
    
}
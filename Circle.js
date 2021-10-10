class Circle extends Figure{
  
    constructor(posX,posY,radius,fill,context){
        super(posX,posY,fill,context)
        this.radius=radius;
        this.id;
        this.jugador;
        this.imagen = fill;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setFill(fill){
        this.fill = fill;
    }

    getFill(){
        return this.fill;
    }

    setId(id){
        this.id = id;
    }

    setJugador(jugador){
        this.jugador = jugador;
    }

    getJugador(){
        return this.jugador;
    }
    
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
    
    //se usa la distancia secudaria entre 2 puntos. 
    isPointInside(x,y){
        // console.log(x);
        // console.log(_x);//posicion del circulo - la posicion de donde esta el mouse
        let _x=this.posX - x;//posicion del circulo - la posicion de donde esta el mouse
        let _y=this.posY - y;
        return Math.sqrt(_x*_x + _y*_y)< this.radius;
        //si la distancia es menor al radio, estoy adentro del circulo
    }
    
}
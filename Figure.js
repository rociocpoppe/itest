class Figure {

     //se crea el constructor de la ficha, con los parámetros necesarios para poder dibujarla en los diferentes casos que se presenten
    constructor(posX, posY, fill, context){
        this.posX=posX;
        this.posY=posY;
        this.context=context;
        this.fill=fill;
        this.resaltado=false;
        this.resaltadoEstilo="red";
        this.ctx=context;
        this.id;
    }
 
    //se determina el relleno de la figura
    setFill(fill){
        this.fill=fill
    }

    //se determina la posición
    setPosition(x,y){
        this.posX=x;
        this.posY=y;
    }

    //se obtiene la posición x e y
    getPosition(){
        return{
            x:this.getPosX(),
            y:this.getPosY()
        };
    }

    //se obtiene la posición x
    getPosX(){
        return this.posX;
    }

    //se obtiene la posición y
    getPosY(){
        return this.posY;
    }

    //se obtiene el relleno
    getFill(){
        return this.fill;
    }

    //se dibuja 
    draw(){
        this.ctx.fillStyle=this.fill;
    }

    //se determina el resaltado de la figura
    setResaltado(resaltado){
        this.resaltado=resaltado;
    }

    //con este método abstracto, se define en la clase hija si el punto está dentro o no de la figura
    isPoinInside(x,y){}

    //se determina el id
    setId(id){
        this.id = id;
    }

    //se obtiene el id
    getId(){
        return this.id;
    }
}
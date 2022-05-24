class CannonBall{
    constructor(x,y){
        var options={
            isStatic:true
        };
        this.raio= 30;
        this.body = Bodies.circle(x,y,this.raio,options);
        this.imagem = loadImage("./assets/cannonball.png");
        World.add(world, this.body);
    }
    show(){
        push()
            imageMode(CENTER);
            image(this.imagem, this.body.position.x, this.body.position.y, this.raio, this.raio);
        pop()
    }
    shoot(){
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body,{x:30, y:-20})
    }
}
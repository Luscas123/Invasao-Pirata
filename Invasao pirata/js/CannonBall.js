class CannonBall{
    constructor(x,y){
        var options={
            isStatic:true
        };
        this.raio= 30;
        this.body = Bodies.circle(x,y,this.raio,options);
        this.imagem = loadImage("./assets/cannonball.png");
        World.add(world, this.body);

        this.trajetoria =[]
    }
    show(){
        push()
            imageMode(CENTER);
            image(this.imagem, this.body.position.x, this.body.position.y, this.raio, this.raio);
        pop()

        if (this.body.velocity.x>0 && this.body.position.x>110){
            var posicoes =[this.body.position.x, this.body.position.y];
            this.trajetoria.push(posicoes);
        }

        for(var i= 0; i<this.trajetoria.length; i++){
            image(this.imagem, this.trajetoria[i][0], this.trajetoria[i][1], 5,5);
        }
    }
    shoot(){
        var newAngle= canhao.angle - 28;
        newAngle = newAngle*(3.14/180)
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body,{x:velocity.x* (180/3.14), y:velocity.y*(180/3.4)})
    }
}
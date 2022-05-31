class Boat{
    constructor(x,y,larg, alt, boatPos){
        this.body = Bodies.rectangle(x,y,larg,alt);
        this.largura = larg;
        this.altura = alt;

        this.image = loadImage("../assets/boat.png");
        this.boatPosition = boatPos;
        World.add(world, this.body);
    }

    show() {
        var angle = this.body.angle;
        var pos = this.body.position;

        push();
        translate (pos.x, pos.y);
        rotate (angle);

        imageMode(CENTER);
        image(this.image, 0, this.boatPosition, this.largura, this.altura);
        pop();
    }
}
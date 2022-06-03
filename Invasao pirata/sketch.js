const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, ground;
var backgroundimg;
var tower, towerimg;
var canhao, angulo;
//var barco;


var barcos = [];


var vetorBolas =[];
function preload() {
  backgroundimg = loadImage("./assets/background.gif");
  towerimg = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  options = {
    isStatic:true
  }
  
  tower = Bodies.rectangle(160,350,160,310,options);
  World.add(world, tower);



  ground= Bodies.rectangle(0,height-1, width*2,1,options);
  World.add(world,ground);

  angleMode(DEGREES)
  angulo = 20

  canhao= new Cannon(180,110,130,100,angulo);

  //barco = new Boat(width - 79, height - 60, 170, 170, -80);

  
  
 
}

function draw() {
  background(189);
  Engine.update(engine);

  image(backgroundimg,0,0,1200,600);
 
  rect(ground.position.x, ground.position.y,width*2,1);

  push();
  imageMode(CENTER);
  image(towerimg,tower.position.x, tower.position.y, 160,310);
  pop();

  for (var i=0; i<vetorBolas.length; i++){
    cannonBallShow(vetorBolas[i], i);
    colisaoComBarco(i);
  }

  canhao.show();
  
  //Body.setVelocity(barco.body,{x: -1, y: 0});
  //barco.show();

  barcosShow();
  
  
}
function keyReleased(){
  if(keyCode===DOWN_ARROW){
    vetorBolas[vetorBolas.length-1].shoot();
  }
}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var bolaDeCanhao;
    bolaDeCanhao= new CannonBall(canhao.x+5, canhao.y+2);
    vetorBolas.push(bolaDeCanhao);
  }
}

function cannonBallShow(bola,indice){
  if(bola){
    bola.show();
    if(bola.body.position.x>width || bola.body.position.y> height -50){
      bola.remove(indice);
    }
  }

} 
function barcosShow(){
  
  if(barcos.length>0){
    // usamos width - 300 para colarmos os barcos para surgirem em uma distancia de 300
    if(barcos[barcos.length - 1].body.position.x < width -300|| barcos[barcos.length -1] ===undefined ){
      var posicoes=[-40,-60,-70,-20];
      var posicao= random(posicoes);
      var barco = new Boat(width +5, height - 60, 170, 170, posicao);
      barcos.push(barco);
    }
    for (var i=0; i<barcos.length; i++){
      if (barcos[i]){
        Body.setVelocity(barcos[i].body,{x: -1, y: 0});
        barcos[i].show();
      }
    }
  
  } else {
      var barco = new Boat(width +5, height - 60, 170, 170, -80);
      barcos.push(barco);
  }
}

function colisaoComBarco(index){
  for (var i=0; i<barcos.length; i++){
    if (vetorBolas[index] !== undefined && barcos[i] !== undefined){
      var colisao = Matter.SAT.collides(vetorBolas[index].body, barcos[i].body);
      if (colisao.collided){
        barcos[i].remove(i);
        World.remove(world, vetorBolas[index]);
        delete vetorBolas[index];
      }
      
    }
  }
}

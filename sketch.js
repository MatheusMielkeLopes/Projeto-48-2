var space
var spaceship
var alien
var alien2
var alien3
var spaceimg
var spaceshipimg
var alienimg
var alienimg2
var alienimg3
var shot
var shotimg
var alienGroup
var alien2Group
var alien3Group
var shotGroup
var restart
var restarimg
var barreira
var gameOver
var gameoverImg
var score=0
var PLAY = 1
var END = 0
var gameState = PLAY;





function preload(){
  spaceimg = loadImage ("space.jpg")
  spaceshipimg = loadImage ("spaceship.png")
  alienimg = loadImage ("alien.png")
  alienimg2 = loadImage ("alien2.png")
  alienimg3 = loadImage ("alien3.png")
  shotimg = loadImage ("shot.png")
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("fimdejogo.png");
}


function setup() {
  createCanvas(800,400);
  spaceship = createSprite(400, 360, 50, 50);
  barreira = createSprite(400,400,1000,20)
  barreira.visible = false

  spaceship.addImage(spaceshipimg)

  score = 0

  spaceship.scale = 0.27

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false

  restart = createSprite(400,140);
  restart.addImage(restartImg);
  restart.visible = false

  gameOver.scale = 0.5;
  restart.scale = 0.1;

  alienGroup = createGroup()
  alien2Group = createGroup()
  alien3Group = createGroup()
  shotGroup = createGroup()

}

function draw() {
  background(spaceimg);


  if(gameState===PLAY){ 
  spaceship.x = World.mouseX;



  edges= createEdgeSprites();
  spaceship.collide(edges);

  if (frameCount % 100 === 0) {
    drawAlien();
  }

  if (frameCount % 130 === 0) {
    drawAlien2();
  }

  if (frameCount % 160 === 0) {
    drawAlien3();
  }

  if(keyDown("space")){
    shootBullet();
  }

  if(alienGroup.collide(shotGroup)){
    alienGroup.destroyEach()
    shotGroup.destroyEach()
    score=score+2;
  }

  if(alien2Group.collide(shotGroup)){
    alien2Group.destroyEach()
    shotGroup.destroyEach()
    score=score+6;
  }

  if(alien3Group.collide(shotGroup)){
    alien3Group.destroyEach()
    shotGroup.destroyEach()
    score=score+10;
  }
if(alienGroup.isTouching(barreira)){
    gameState = END;
  }

  if(alien2Group.isTouching(barreira)){
    gameState = END;
  }

  if(alien3Group.isTouching(barreira)){
    gameState = END;
  }

 
 fill("#FFFF");
 textAlign("center");
 textSize(20);
 text("Pontuação: " + score, width - 710, 30);
}
else if (gameState === END) {

  gameOver.visible = true
  restart.visible = true
  
  alien3Group.setLifetimeEach(-1);
  alien2Group.setLifetimeEach(-1);
  alienGroup.setLifetimeEach(-1);
  alienGroup.destroyEach()
  alien2Group.destroyEach()
  alien3Group.destroyEach()

  if(mousePressedOver(restart)) {
    reset();
}
}
  drawSprites();

}


function drawAlien(){
  alien = createSprite(random(50,750),0,40,40);
  alien.addImage(alienimg);
  alien.scale = 0.7;
  alien.velocityY = 5;
  alien.lifetime = 400;
  alienGroup.add(alien);
}

function drawAlien2(){
  alien2 = createSprite(random(50,750),0,40,40);
  alien2.addImage(alienimg2);
  alien2.scale = 0.7;
  alien2.velocityY = 5;
  alien2.lifetime = 400;
  alien2Group.add(alien2);
}

function drawAlien3(){
  alien3 = createSprite(random(50,750),0,40,40);
  alien3.addImage(alienimg3);
  alien3.scale = 0.7;
  alien3.velocityY = 5;
  alien3.lifetime = 400;
  alien3Group.add(alien3);
}

function shootBullet(){
  shot = createSprite(0, 340, 30, 30)
  shot.x = spaceship.x 
  shot.addImage(shotimg)
  shot.scale=0.1
  shot.velocityY= -7
  shotGroup.add(shot)
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  spaceship.visible = true;
  
  alienGroup.destroyEach();
  alien2Group.destroyEach();
  alien3Group.destroyEach();
  alien3Group.setLifetimeEach(400);
  alien2Group.setLifetimeEach(400);
  alienGroup.setLifetimeEach(400);
  score = 0;
}
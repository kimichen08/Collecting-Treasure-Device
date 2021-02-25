var PLAY = 1;
var END = 2;
var gameState = 1;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
  
// Moving background
path = createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 3;

//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale = 0.06;

boy.setCollider("rectangle",0,0,1100,1100);
boy.debug = false;

cashG = new Group();
diamondsG = new Group();
jwelleryG = new Group();
swordGroup = new Group();

}

function draw() {

  background(0);

  if(gameState === PLAY){
    
      boy.x = World.mouseX;
  
    edges= createEdgeSprites();
    boy.collide(edges);
  
    //code to reset the background
    if(path.y > height ){
      path.y = height/2;
    }
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection += 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection += 150;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection += 100;
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
      }
    }
  }
  if(gameState === END) {
    path.velocityY = 0;
    boy.addAnimation("SahilRunning",endImg);
    boy.x = width/2;
    boy.y = height/2;
    boy.scale = 0.8;
    cashG.destroyEach();
    cashG.velocityY = 0;
    jwelleryG.destroyEach();
    jwelleryG.velocityY = 0;
    diamondsG.destroyEach();
    diamondsG.velocityY = 0;
  }
  drawSprites();
  
  textSize(20);
  fill("red");
  text("Treasure: "+ treasureCollection,150,30);
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 110 == 0) {
  var diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}

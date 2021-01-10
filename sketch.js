var space, spaceImg;
var edges;
var PLAY =1, END = 0;
var coin, coinImg, coinGroup, coinCount;
var gameState = PLAY;
var rocket, rocketImg;
var ufo, ufoImg, ufoGroup;
var lose, loseImg;
var saturn, saturnImg, saturnGroup;
var asteroid, asteroidImg, asteroidGroup;


function preload(){
  spaceImg = loadImage("bg.png");
  coinImg = loadImage("coin.png");
  rocketImg = loadImage("rocket.png"); 
  ufoImg = loadImage("ufo.png");
  saturnImg = loadImage("saturn.png"); 
  asteroidImg = loadImage("asteroid.png");
  loseImg = loadImage("you lose.png");
}

function setup() {
  createCanvas(580,300);
  
  edges = createEdgeSprites();;

  space = createSprite(400,200,10,10);
  space.addImage("spacebg",spaceImg);
 
  rocket = createSprite(80,150,10,10);
  rocket.addImage("spaceship",rocketImg);
  rocket.debug = false;
  rocket.scale = 0.17;

  coinCount = 0;
  
  ufoGroup = new Group();
  coinGroup = new Group();
  asteroidGroup = new Group();
  saturnGroup = new Group();
  
}

function draw() {
  background("black");
  drawSprites(); 
  
  if(gameState===PLAY){
  space.velocityX = -6;
  rocket.collide(edges); 
  
  fill("white");
  stroke("cyan");
  textSize("30");
  text("COINS - " + coinCount, 450, 50);

  if (rocket.isTouching(coinGroup)){
    coinGroup.destroyEach();
    coinCount = coinCount+1;
    coinCount = coinCount;
    console.log("coins - " + coinCount)
  }
  
  if (space.x < 260){
    space.x = space.width/2;
  }
  
  if (keyWentDown("UP_ARROW")){
    rocket.velocityY = -5;
  }
  if (keyWentUp("UP_ARROW")||keyWentUp("DOWN_ARROW")){
    rocket.velocityY = 0;
  }  
  if (keyWentDown("DOWN_ARROW")){
    rocket.velocityY = 5;
  }  
  
  if (rocket.isTouching(asteroidGroup)||rocket.isTouching(saturnGroup)||rocket.isTouching(ufoGroup)){
    gameState = END;
  }

  spawnUfo();
  spawnCoin();
  spawnSaturn();
  spawnAsteroid(); 
  }
  
  if (gameState === END){
    rocket.destroy();
    asteroidGroup.destroyEach();
    ufoGroup.destroyEach();
    saturnGroup.destroyEach();
    space.velocityX = 0;
    lost();    
  }
}

function spawnSaturn(){
  if(frameCount%137===0){
  saturn = createSprite(550,50,10,10);
  saturn.addImage("planet1",saturnImg);
  saturn.scale = .1;
  saturn.velocityX = -8;
  saturn.lifetime = 600;  
  saturn.debug = false;
  saturnGroup.add(saturn);
  saturn = Math.round(random(50,250));
  /*switch(RanNum){
    case 1: saturn.y = 50;
            break; 
    case 2: saturn.y = 150;
            break; 
    case 3: saturn.y = 250;
            break;
    default : break;      
  }  */
  }
}

function spawnAsteroid(){
  if(frameCount%211===0){
  
  asteroid = createSprite(580,150,10,10);
  asteroid.addImage("meteor",asteroidImg);
  asteroid.scale = .26;
  asteroid.velocityX = -8;
  asteroid.lifetime = 600;  
  asteroid.debug = false;  
  asteroid.setCollider("rectangle",0,0,440,200);
  asteroidGroup.add(asteroid);   
  asteroid.y = Math.round(random(50,250));
  /*switch(RanNum3){
    case 1: asteroid.y = 50;
            break; 
    case 2: asteroid.y = 150;
            break; 
    case 3: asteroid.y = 250;
            break;
    default : break;      
  }  */
  }
}

function spawnUfo(){
  if(frameCount%159===0){
  
  ufo = createSprite(580,150,10,10);
  ufo.addImage("ufo",ufoImg);
  ufo.scale = .12;
  ufo.velocityX = -8;
  ufo.lifetime = 600;  
  ufo.debug = false;  
  ufoGroup.add(ufo);   
  ufo.y = Math.round(random(50,250));
  /*switch(RanNum3){
    case 1: ufo.y = 50;
            break; 
    case 2: ufo.y = 150;
            break; 
    case 3: ufo.y = 250;
            break;
    default : break;      
  }  */
  }
}

function lost(){
    lose = createSprite(290,160,10,10);
    lose.addImage("gameover",loseImg);
    lose.scale = 0.3;
}

function spawnCoin(){
  if (frameCount%80===0){
  var coin = createSprite(580,200,10,10);
  coin.addImage("money",coinImg),
  coin.scale = 0.05;  
  coin.collide(asteroidGroup);
  coin.collide(saturnGroup);
  coin.collide(ufoGroup);
  coin.velocityX = -8;
  coin.lifetime = 600;  
  coin.debug = false;  
  coinGroup.add(coin);   
  coin.y = Math.round(random(50,250));
  /*
  switch(RanNum4){
    case 1: coin.y = 50;
            break; 
    case 2: coin.y = 150;
            break; 
    case 3: coin.y = 250;
            break;
    default : break;      
  }   */ 
  }
}
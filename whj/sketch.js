var START = 2;
var PLAY = 1;
var END = 0;
var gameState = START;


var player , playerImage, plrImg;
var score=0;
var road, roadImage;
var gameOver, restart;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var coinGroup, coinImage;
var score = 50;
var restart, restartimg

function preload(){
  
  playerImage = loadAnimation("mainPlayer1.png" , "mainPlayer2.png");
  roadImage = loadImage("Road.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  coinImage = loadImage("goldCoin.png");
  plrImg = loadAnimation("mainPlayer3.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 500);

road = createSprite(200, 250, 10, 30);
road.addImage("road", roadImage );



player = createSprite(100, 250, 20, 10);
player.addAnimation("player", playerImage);
player.scale = 0.1;


invisibleGround = createSprite(200,490,400,10);
invisibleGround.visible = false;

obstaclesGroup = new Group(); 
coinGroup = new Group();

restart= createSprite(500, 250);
restart.addImage("restart", restartimg );

}

function draw() {
  //trex.debug = true;
  background("white")
  player.collide(invisibleGround);
  drawSprites();

  if(gameState == 2)
  {
    textSize(20)
    fill("black")
    text("press the enter to start ", 300,100);
    text("press the spacebar to move your player ", 300,150);
    restart.visible = false;

    if(keyDown("enter"))
    {
        gameState = 1;
    }
  }

if(gameState == 1)
{
  if(keyDown("space") && player.y > 190 ) {
    player.velocityY = -15;
  }
  
  player.velocityY = player.velocityY + 0.8
  road.velocityX = -5

  if (road.x < 0){
    road.x =road.width/2;
  }
   
  spawnObstacles();
  spawnCoins();
  handleObstacles();
  handleCoins();


  restart.visible = false;

  if(score <= 0)
  {
      gameState = 0;
  }
} 

if(gameState == 0)
{
     player.velocityY = 0;
     score = 0;
     road.velocityX = 0;
     obstaclesGroup.setVelocityXEach(0);
     coinGroup.setVelocityXEach(0);
     player.addAnimation("player", plrImg);
     obstaclesGroup.setLifetimeEach(-10);
     coinGroup.setLifetimeEach(-10);
     restart.visible = true;
     if(mousePressedOver(restart))
     {
        restart1()
     }
}
  
  textSize(20)
  fill("black")
  text("Score: "+ score, 800,50);
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(1000,400,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6  
    obstacle.y = Math.round(random(50, 450))
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    //adjust the depth
    player.depth = obstacle.depth;
    player.depth = player.depth + 1

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var coin= createSprite(1000,400,40,10);
    coin.y = Math.round(random(100,450));
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 350;
    
    //adjust the depth
    player.depth = coin.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    coinGroup.add(coin);
  }
}

function handleObstacles()
{
  player.overlap(obstaclesGroup, function(collector, collected)
  {
    score = score - 7;
    collected.remove();
  })
}

function handleCoins()
{
  player.overlap(coinGroup, function(collector, collected)
  {
    score = score + 5;
    collected.remove();
  })
}
  
function restart1()
{
  gameState = 2;
  
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  player.addAnimation("player", playerImage);
  score = 50;

}
  
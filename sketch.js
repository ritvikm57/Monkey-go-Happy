var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, monkeyIdle
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(400, 400);

  var message = "This is a message";
  console.log(message)
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.12

  ground = createSprite(400,350,900,20);

  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  survivalTime = 0;

}


function draw() {
  background('white');
  
  if (gameState===PLAY){
    survivalTime=Math.ceil(frameCount/frameRate())
    
    monkey.collide(ground);
    monkey.velocityY = monkey.velocityY + 0.8
    
    if (keyWentDown('space') && monkey.y >= 200){
      monkey.velocityY = -15 
     }
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }

    
    
    spawnObstacles();
    spawnBanana();
  }
  if (gameState===END){
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);    
    monkey.velocityY = 0;
    
    
    
    
  }
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time : "+ survivalTime,100,50);

  
  drawSprites();
}


function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,330,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
          
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
    obstacle.depth = ground.depth;
    ground.depth = ground.depth + 1;
  }
}



function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(150,300));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}


//creating variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_animation, monkey_collided;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground1, ground2;
var score = 0;
var bg, bgImage;

function preload() {
  bgImage = loadImage("jungle.png");

  monkey_animation = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  monkey_collided = loadAnimation("sprite_0.png")

}

function setup() {
  createCanvas(600, 600);

  bg = createSprite(300, 300, 100, 100);
  bg.addImage("jungle", bgImage);
  bg.velocityX = -4;

  //creating monkey
  monkey = createSprite(80, 540, 20, 20);
  monkey.addAnimation("running", monkey_animation);
  monkey.scale = 0.15;

  //creating ground1
  ground1 = createSprite(500, 595, 1000, 10);
  ground1.velocityX = 4;
  ground1.x = ground1.width / 2
  ground1.shapeColor = "lightgreen";
  ground1.visible = false;


  //creating ground2
  ground2 = createSprite(500, 595, 500, 10);
  ground2.velocityX = -4;
  ground2.x = ground2.width / 2
  ground2.shapeColor = "lightgreen";
  ground2.visible = false;

  //creating groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {

  background(255);

  if (gameState === PLAY) {
    //making ground reset
    if (ground1.x > 0) {
      ground1.x = ground1.width / 2;
    }

    if (ground2.x > 0) {
      ground2.x = ground2.width / 2;
    }

    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    //making monkey collide with the ground
    monkey.collide(ground1);
    monkey.collide(ground2)

    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;
    }

    //add gravity                                         
    monkey.velocityY = monkey.velocityY + 0.8

    switch (score) {
      case 10:
        monkey.scale = 0.16;
        break;
      case 20:
        monkey.scale = 0.18;
        break;
      case 30:
        monkey.scale = 0.21;
        break;
      case 40:
        monkey.scale = 0.25;
        break;
      default:
        break;
    }

    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 5;
    }

    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
      monkey.scale = 0.15;
    }

    //calling the functions
    food();
    obstacles();

  } else if (gameState === END) {
    monkey.velocityY = 0;
    ground1.velocityX = 0;
    ground2.velocityX = 0;
    bg.velocityX = 0;

    monkey.changeAnimation("collided", monkey_collided);

    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

  }
  monkey.setCollider("circle", 0, 0, 350);

  //to display sprites
  drawSprites();

  //to display bananas collected
  text("SCORE:" + score, 450, 30, fill("black"), textSize(20));
}

//making function for banana
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 300, 20, 20);
    banana.y = Math.round(random(120, 400));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 300;
    banana.scale = 0.1;

    //adding banana to group
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 550, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 100;
    obstacle.scale = 0.2;

    obstacleGroup.add(obstacle);
  }
}
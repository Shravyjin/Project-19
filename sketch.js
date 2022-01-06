var gameState = "play"

var gems,gemsImg;
var ground,invisibleGround,groundImg;
var runner,runnerrunning,runnerstop;

var swords,swordsImg;

var score = 0;

var gameover,gameoverImg;
var restart,restartImg;

var pointSound,dieSound;

function preload(){
  runnerrunning = loadAnimation("download__1_-removebg-preview.png","running-removebg-preview.png","running1-removebg-preview (1).png","running2-removebg-preview (1).png");
  runnerstop = loadAnimation("OOF.png");

  groundImg = loadImage("pngtree-yellow-background.png");

  gemsImg = loadImage("gems-removebg-preview.png");

  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  swordsImg = loadImage("sword.png");

  pointSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
}


function setup() {
 createCanvas(550,340);

 runner = createSprite(120,340,100,100);
 runner.addAnimation("running", runnerrunning);
 runner.addAnimation("stop",runnerstop);
 runner.scale = 0.4;
 runner.depth = -2;
 

 ground = createSprite(300,170);
 ground.addImage("ground", groundImg);
 ground.velocityX = -(3 + score/5);
 ground.scale = 1.3;
 ground.depth = -3;


 invisibleGround = createSprite(115,340,600,20)
 invisibleGround.visible = false;

 gameover = createSprite(275,100);
 gameover.addImage("gameover",gameoverImg);
 gameover.scale = 0.5;

 restart = createSprite(275,140);
 restart.addImage("restart",restartImg);
 restart.scale = 0.3;

 gameover.visible = false;
 restart.visible = false;

 gemsGroup = new Group();
 swordsGroup = new Group();

 score = 0;

}

function draw() {

  background(200);

  
  
  
  runner.collide(invisibleGround);

  if(gameState === "play"){
    

    ground.velocityX = -(3 + score/5);

    if (ground.x < 190){
      ground.x = 350;
    }
    
    if(keyDown("UP_ARROW")){
      runner.y = runner.y - 3;
    }

    if(keyDown("DOWN_ARROW")){
      runner.y = runner.y + 3;
    }

    if(runner.y < 205){
      runner.y = 205;
    }

    spawnGems();

    spawnSwords();

    if(runner.isTouching(gemsGroup)){
      gemsGroup.destroyEach();
      pointSound.play();
      score = score + 1;
    }

     if (runner.isTouching(swordsGroup)){
       gameState = "end";
       dieSound.play();
     }
    
  }
  else if (gameState === "end"){
    
    
    gameover.visible = true;
    restart.visible = true;

    ground.velocityX = 0;

    swords.velocityY = 0;
    swords.velocityX = 0;

    text("Press Restart to retry!",300,400);

    runner.changeAnimation("stop",runnerstop);


    if(mousePressedOver(restart)) {
      reset();
    }
  }

  
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+score,450,50);
}
function spawnGems(){
  if (frameCount % 200 === 0){
  
  gems = createSprite(200,700,10,15);
  gems.addImage(gemsImg);
  gems.y = Math.round(random(205,305))
  gems.velocityX = -2;
  gems.lifetime = 40;
  gemsGroup.add(gems);
  gems.scale = 0.1;
  gems.depth = -1;
  }
  }
  
  function spawnSwords(){
  if (frameCount % 300 === 0){
  
   swords = createSprite(220,-50,10,20);
   swords.addImage(swordsImg);
   swords.x = Math.round(random(120,540));
   swords.lifetime = 800;
   swords.velocityY = 4; 
   swords.velocityX = -4;
   swordsGroup.add(swords);
   swords.depth = -1;
   swords.scale = 0.15;
   }
   }
  
   function reset(){
      gameState = "play";
      gameover.visible = false;
      restart.visible = false;
      
      gemsGroup.destroyEach();
      swordsGroup.destroyEach();
      
      runner.changeAnimation("running",runnerrunning);

      score = 0;
    }     
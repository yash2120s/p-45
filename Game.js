class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    p1 = createSprite(100,200);
    p1.addAnimation("p1",p1_Img);
    p2 = createSprite(300,200);
    p2.addAnimation("p2",p2_Img);
    p3 = createSprite(500,200);
    p3.addAnimation("p3",p3_Img);
    p4 = createSprite(700,200);
    p4.addAnimation("p4",p4_Img);
    players = [p1, p2, p3, p4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      //index of the array
      var index  = 0;

      //x and y position of the cars
      var x =200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x = 200 + (index * 200) + allPlayers[plr].xPos;
        y = displayHeight - allPlayers[plr].distance ;
        //position the cars a little away from each other in x direction
       // x = x + 200;
        //use data form the database to display the cars in y direction
      // y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75);
        if (index === player.index){
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y
        }
       
      }

    }

    
    if(player.distance < 2150){
      if(keyIsDown(38) && player.index !== null){
          yVel += 0.9;
          if(keyIsDown(37)){
              xVel -= 0.2;
          }
          if(keyIsDown(39)){
              xVel += 0.2;
          }
      }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
          yVel -= 0.1;
          xVel *= 0.9;
      }else{
          yVel *= 0.985;
          xVel *= 0.985;
      }
    }

  //move the car
  player.distance += yVel;
  yVel *= 0.98;
  player.xPos += xVel;
  xVel *= 0.985;
  player.update();
  //display sprites
  drawSprites();
}
   

}

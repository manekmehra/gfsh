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

    player1 = createSprite(10,200,50,40);
    player2 = createSprite(10,500,50,40);
    players = [player1,player2]  
    ground1 = createSprite(100,210,displayWidth*10,20)
    ground2 = createSprite(100,500,displayWidth*10,20)
    for (var i=600; i<6000;i = i+700){
      var obstacle1 = createSprite(i,447)
      Ogroup1.add(obstacle1)
      var obstacle2 = createSprite(i,147)
      Ogroup2.add(obstacle2)
   
    }
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getPlayerRank()
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
     // image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      player1.collide(ground1)
      player2.collide(ground2)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 50 ;
    

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 460-allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
     
        players[index-1].x = x;
   

        if (index === player.index){
          stroke(10)
         // fill('green')
          //ellipse(x,y,80,80)

          //console.log(cars[index-1].y+"carY")
          players[index - 1].shapeColor = "red";
          camera.position.x = players[index-1].x
          camera.position.y = players[index-1].y;
          if(keyDown("space")){ 
            players[index-1].velocityY = -10 
            
            console.log("space"+players[index-1].velocityY)
           }
           players[index-1].velocityY = players[index-1].velocityY+0.5
        }
    
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }

    if(player.distance < -6000){
      gameState = 2;
      player.rank = player.rank+1
      Player.updatePlayerRank(player.rank)
    }
   
    drawSprites();

  }

  end(){
    console.log("Game Ended"+ player.index);
    console.log(player.rank) 
  }
}

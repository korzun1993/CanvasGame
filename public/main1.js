var canvas = CE.defines("canvas_id").
    ready(function() {
        canvas.Scene.call("MyScene");
    });



var BALLHEIGHT = 40;
var NUMBEROFBALLS = 70;
var USERTOKEN =''  ;
IS_GAME_STARTED =false;

setInterval(checkElems,1000);
function checkElems(){
    if (scene.elems===undefined) getGame();
}

setInterval(checkKilled,1000);
function checkKilled(){
    CE.ajax({url:"/get_killed_balls",
        type: "POST",
        success: function (data){
        if (data!="[]"){
            balls=CE.parseJSON(data)
            console.log(balls[0])
        if (scene.elems!==undefined)
        {
            for (var i=0; i<balls.length; i++){
                console.log (balls[i]['id'])

                for (var j=0; j<scene.elems.length; j++){
                    console.log ('itemID'+scene.elems[j].itemID)
                    if (balls[i]['id']==scene.elems[j].itemID)
                    {
                         scene.elems[j].opacity=0;
                    }
                }
        }
        }
        }
}
    })
}

function getGame(){
  //alert ('func getGame')
  var res
  CE.ajax({url:"/get_game",success: function (data){
      //alert (data)

      if (data!="[]") {
          res =true;
          setInterval(exit,40000)
          //alert ('result'+res)
      IS_GAME_STARTED=true;
      // alert ('IS_GAME_STARTED'+IS_GAME_STARTED)
      scene.has_balls=true;
      scene.start_button.opacity=0
      //1 ('data non undefined')
      var balls=  CE.parseJSON(data)
      var date = new Date();
      scene.beginTime = date.getTime();
      //1('IS_GAME_STARTED'+IS_GAME_STARTED)
      scene.elems=[]
      for (var i=0; i<NUMBEROFBALLS; i++) {
          scene.elems.push(scene.createElement())
          scene.elems[i].itemID=balls[i]['id']
          scene.elems[i].x=balls[i]['x_coordinate']
          scene.elems[i].y=i * BALLHEIGHT/((NUMBEROFBALLS + 1)) - NUMBEROFBALLS/2 * BALLHEIGHT;
          scene.elems[i].kind=balls[i]['kind']
          scene.stage.append(scene.elems[i])
          scene.elems[i].on('click', function (){
              this.opacity = 0;
              $.ajax({url:"/kill_ball",
                  type: "PUT",
                  data: {ball_id: this.itemID, player_token:USERTOKEN},
                  success: function (data){
                  //alert(this.itemID+"  "+USERTOKEN)
              }})
          });


      }

      }

  }

  })

}

function draw() {
    var date = new Date();
    var now = date.getTime();
    var offset = ((now - scene.beginTime) / 1000) * BALLHEIGHT;
    if (scene.elems!==undefined){
    for(var i = 0; i < NUMBEROFBALLS; i++){
       scene.elems[i].y = i * BALLHEIGHT/2 - NUMBEROFBALLS/2 * BALLHEIGHT + offset;
       if(scene.elems[i].y > 0 ){
            scene.elems[i].drawImage(scene.elems[i].kind);
       }
    }
    }
    scene.stage.refresh();
}

 function getKilledBalls(){
     CE.ajax({
         url:"/get_killed_balls",
         type: "POST",
         success: function (data){
             if (scene.elems!==undefined){
                 result=CE.parseJSON(data)
                 for (var i=0; i<result.size();i++)
                    for (var j=0; j<scene.elems.size(); j++){
                          if (scene.elems[j].itemID==result[i]['id'])
                            scene.elems[i].opacity=0;
                    }
             }
         }
     })
 }

scene = canvas.Scene.new({
    name: "MyScene",
    materials: {
        images: {
            start_button: "startbutton.jpg",
            red_ball: "red_ball.png",
            green_ball: "green_ball.png",
            blue_ball: "blue_ball.png",
            yellow_ball: "yellow_ball.png"
        }
    },
    preload: function() {

    },
    ready: function(stage) {
        this.stage = stage ;
        this.start_button=this.createElement();
        this.start_button.x=100;
        this.start_button.y=100;
        this.start_button.drawImage("start_button");
        stage.append(this.start_button);  //*/
        this.start_button.on("click",function(f){
        CE.ajax({url:"/start_game",success: function (x){
         USERTOKEN=x
            // infinite loop
         }})
         })



    },



render: function(stage) {
    draw();
    stage.refresh();
}
});

function exit(){
    $.ajax({url:"/get_results",
        type: "POST",
        data: {token:USERTOKEN},
        success: function (data){
            alert (data)
        }})

}

//setInterval(getKilledBalls,500)

//function draw() {
//	scene.stage.refresh();
//}

var canvas = CE.defines("canvas_id").
    ready(function() {
        canvas.Scene.call("MyScene");
    });

var BALLHEIGHT = 40;
var NUMBEROFBALLS = 70;
var USERTOKEN =''  ;

function getGame(){
  alert ('func getGame')
  CE.ajax({url:"/get_game",success: function (data){
      alert (data)
      if (data!="null") {
      scene.start_button.opacity=0
      alert ('data non undefined')
      var balls=  CE.parseJSON(data)
      var date = new Date();
      scene.beginTime = date.getTime();
      scene.elems=[]
      for (var i=0; i<NUMBEROFBALLS; i++) {
         // alert (balls[i]['id'])
          scene.elems.push(scene.createElement())
          scene.elems[i].itemID=balls[i]['id']
          scene.elems[i].x=balls[i]['x_coordinate']
          scene.elems[i].y=i * BALLHEIGHT/((NUMBEROFBALLS + 1)) - NUMBEROFBALLS/2 * BALLHEIGHT;
          scene.elems[i].kind=balls[i]['kind']
          //alert ('NUMBEROFBALLS')
          //alert (NUMBEROFBALLS)
          //alert (scene.elems[i].x)
          //alert (scene.elems[i].y)
          //alert (scene.elems[i].kind)
          scene.stage.append(scene.elems[i])
          scene.elems[i].on('click', function (){
              this.opacity = 0;
              // request to ruby server kill ball
          });

      }

      }}})
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
            ///USERTOKEN=x

            if (scene.elems==undefined) {
            getGame();
            }
         }
         })
         })

    },



render: function(stage) {
    draw();
    stage.refresh();
}
});


//function draw() {
//	scene.stage.refresh();
//}

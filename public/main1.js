var canvas = CE.defines("canvas_id").
    ready(function() {
        canvas.Scene.call("MyScene");
    });

var BALLHEIGHT = 40;
var NUMBEROFBALLS = 70;

function getGame(){
  CE.ajax({url:"/get_game",success: function (x){
      if (x!=undefined && x.length>0){
          scene.elems=x
          for(var i = 0;i < NUMBEROFBALLS;i++){
              scene.elems[i] = this.createElement();
              scene.elems[i].x = x[i].;
              stage.append(this.elems[i]);
              this.elems[i].y =  i * BALLHEIGHT/((NUMBEROFBALLS + 1)) - NUMBEROFBALLS/2 * BALLHEIGHT;
              this.elems[i].itemID = i;
              this.elems[i].on("click",function(e){
                  var d = new Date();
                  var n = d.getTime();
                  this.opacity = 0;

              });


      }}
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
            alert(x);
         }
         })
         setTimeout(getGame, 500);
         })

    },



render: function(stage) {
    stage.refresh();
}
});


//function draw() {
//	scene.stage.refresh();
//}

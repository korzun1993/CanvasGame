var canvas = CE.defines("canvas_id").
    ready(function() {
        canvas.Scene.call("MyScene");
    });
         
var BALLHEIGHT = 40;
var NUMBEROFBALLS = 70;



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
        //this.start_button.on("click",function(f){
            // CE.ajax({url:"/start_game",success: function (x){
                //alert(x);
            // }
            // })

       // })  ;

    }});






//function draw() {
//	scene.stage.refresh();
//}

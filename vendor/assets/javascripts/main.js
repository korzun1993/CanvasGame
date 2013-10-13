var canvas = CE.defines("canvas_id").
    ready(function() {
        canvas.Scene.call("MyScene");
    });
         
var BALLHEIGHT = 40;
var NUMBEROFBALLS = 70;

function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter--) {
        // Pick a random index
        index = (Math.random() * counter) | 0;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
        this.start_button.on("click",function(f){
             CE.ajax({url:"/start_game",success: function (x){
                alert(x);
             }
             })

        })  ;
        stage.append(this.start_button);  //*/
	    this.elems = [];        
	    var date = new Date();
            this.beginTime = date.getTime();
            for(var i = 0;i < NUMBEROFBALLS;i++){
               this.elems[i] = this.createElement();
	       this.elems[i].x = getRandomInt(0,300);
	       stage.append(this.elems[i]);
	       this.elems[i].y =  i * BALLHEIGHT/((NUMBEROFBALLS + 1)) - NUMBEROFBALLS/2 * BALLHEIGHT;
	       this.elems[i].itemID = i;
	       this.elems[i].on("click",function(e){
		        var d = new Date();
                var n = d.getTime();
		        this.opacity = 0;

	       });
	      if (i<3*(NUMBEROFBALLS/10)){
                		this.elems[i].kind="red_ball";}
		     if (i>=3*(NUMBEROFBALLS/10)&& (i<6*(NUMBEROFBALLS/10))){
				this.elems[i].kind="blue_ball";}
		     if (i>=6*(NUMBEROFBALLS/10) && (i<8*(NUMBEROFBALLS/10))){
				this.elems[i].kind="yellow_ball";}
		     if (i>=8*(NUMBEROFBALLS/10)){
				this.elems[i].kind="green_ball";}
           
	   }
	     shuffle(this.elems) ;
    
    },
    render: function(stage) {
        draw();
        stage.refresh();
    },
    exit: function(stage) {
    
    }
});

function draw() {
//setTimeout(draw,10)
var date = new Date();
        var now = date.getTime();  
        var offset = ((now - scene.beginTime) / 1000) * BALLHEIGHT;
	    for(var i = 0; i < NUMBEROFBALLS; i++){
            scene.elems[i].y = i * BALLHEIGHT/2 - NUMBEROFBALLS/2 * BALLHEIGHT + offset;
            if(scene.elems[i].y > 0 ){
		     scene.elems[i].drawImage(scene.elems[i].kind);
            } 
        } 
	scene.stage.refresh();
}

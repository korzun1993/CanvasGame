class MainControllerController < ApplicationController
  NUMBER_OF_BALLS=70
  skip_before_filter :verify_authenticity_token, :except =>  [:index]
  def index
    Player.destroy_all
    Ball.destroy_all
  end

  def start
    if (Player.all.size < 2)
     token = Time.now-Time.at(0)
     p=Player.create ({:token =>token})
    end
    render :json => token
  end

  def create_balls (from, to, kind_of_ball)
    r=Random.new
    from.upto(to) {|i|  b=Ball.new ({ball_id: i, kind: kind_of_ball, x_coordinate:r.rand(0..300), is_killed:false})
    b.save}
  end

  def get_game
    if (Player.all.size==2)
      res_array=[]
      if Ball.all.size==0
        create_balls(0, (3*NUMBER_OF_BALLS)/10-1, "red_ball")
        create_balls((3*NUMBER_OF_BALLS)/10, (6*NUMBER_OF_BALLS)/10-1, "blue_ball")
        create_balls((6*NUMBER_OF_BALLS)/10, (8*NUMBER_OF_BALLS)/10-1, "yellow_ball")
        create_balls((8*NUMBER_OF_BALLS)/10, NUMBER_OF_BALLS, "green_ball")
        res_array = Ball.all.to_a.shuffle!
      end
    end
      render :json => res_array
  end

  def kill_ball
    b=Ball.find_by(params[:ball_id])
    player = Player.find_by(params[:player_token])
    b.update_attributes(is_killed:true, killer_id:player.id)
    b.save
    render :nothing => true;
  end

  def  get_killed_balls
     result=Ball.all.where(is_killed:true)
     render json: result
  end

end

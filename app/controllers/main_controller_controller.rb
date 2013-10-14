class MainControllerController < ApplicationController
  NUMBER_OF_BALLS=70
  def index
    Player.destroy_all
    Ball.destroy_all
  end

  def start
    if (Player.all.size < 2)
     p=Player.create ({:token => (Time.now-Time.at(0)).to_f.to_s})
    end
    render :nothing => true
  end

  def get_game
    if (Player.all.size>1)
      r=Random.new
      res_array=[]
      from, how_many=1,(NUMBER_OF_BALLS/10)*3
      from.upto(how_many) {|i|  b=Ball.new ({ball_id: i, kind: "red_ball", x_coordinate:r.rand(0..300), is_killed:false})
      res_array<<b
      b.save
      }
      from, how_many=how_many+1,(NUMBER_OF_BALLS/10)*6
      from.upto(how_many) {|i| b=Ball.new ({ball_id: i, kind: "green_ball", x_coordinate:r.rand(0..300), is_killed:false})
      res_array<<b
      b.save}
      from, how_many=how_many+1,(NUMBER_OF_BALLS/10)*8
      from.upto(how_many) {|i| b=Ball.new ({ball_id: i,kind: "yellow_ball", x_coordinate:r.rand(0..300), is_killed:false})
      res_array<<b
      b.save}
      from, how_many=how_many+1,NUMBER_OF_BALLS
      from.upto(how_many) {|i| b=Ball.new ({ball_id: i,kind: "blue_ball", x_coordinate:r.rand(0..300), is_killed:false})
      res_array<<b
      b.save}
      res_array.shuffle!
     end
      render :nothing => true;
      res_array
  end

  def kill_ball (ball_id, player_token)
  end
end

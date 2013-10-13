class MainControllerController < ApplicationController
  def index

  end

  def start
    if (Player.all.size < 2)
     p=Player.create ({:token => (Time.now-Time.at(0)).to_f.to_s})
    end
    render :nothing => true
  end

  def get_game
    if (Player.all.size==2)
      render "index.html.erb"
    end
    else render :nothing => true;
  end

  def kill_ball (ball_id, player_token)
  end
end

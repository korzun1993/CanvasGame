class MainControllerController < ApplicationController
  def index

  end

  def start
    if (Player.all.size < 2)
     p=Player.create ({:token => (Time.now-Time.at(0)).to_f.to_s})
    end
    render :nothing => true
  end
end

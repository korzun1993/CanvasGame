class MainControllerController < ApplicationController
  NUMBER_OF_BALLS=70
  skip_before_filter :verify_authenticity_token, :except =>  [:index]
  def index
    Player.destroy_all
    Ball.destroy_all
  end

  def start
    if (Player.all.size < 2)
     token = Time.now.to_i-Time.at(0).to_i
     puts token
     p=Player.create ({:token =>token.to_i})
     res=[]
     res<< token
     players=Player.all.to_a
     array=['red', 'blue']
     res<<array[players.size-1]
    end
    render :json => res
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
        res_array=Ball.all.to_a.shuffle!
        res_array.each {|e| puts e.id}
        counter=1
        res_array.each {|i| i.ball_id=counter; counter+=1; i.save }
        Ball.all.to_a.each {|i| puts i.id, i.ball_id}
        res_array.each {|i| puts i.id, i.ball_id}
      end
    end
      #puts res_array

      render json: Ball.all.to_a.sort_by{|b| b.ball_id }
  end

  def kill_ball
    puts 'params', params
    b=Ball.find_by(id:params[:ball_id])
    puts params[:player_token]
    player = Player.find_by(token:params[:player_token])
    b.update_attributes(is_killed:true, killer_id:player.id)
    b.save
    puts b.id, b.kind, b.is_killed
    render :nothing => true;
  end

  def  get_killed_balls
     result=Ball.where(:is_killed => true).all
     puts 'kl' , result
     render json: result.to_a
  end

  def get_results
    @token=params[:token]
    @player1=Player.all.to_a[0]
    @count_hash1 = get_hash_of_killed_balls_by_player(@player1.id)
    point_hash={:red_ball=>5, :blue_ball=>-5, :green_ball=>-1, :yellow_ball=>-1}
    @result1 = count_points_for_player(@count_hash1, point_hash)
    puts '1', @result1
    @player2=Player.all.to_a[1]
    @count_hash2=get_hash_of_killed_balls_by_player(@player2.id)
    point_hash={:red_ball=>-5, :blue_ball=>5, :green_ball=>-1,:yellow_ball=>-1}
    @result2 = count_points_for_player(@count_hash2, point_hash)
    render 'main_controller/get_results'
  end

  def  count_points_for_player(hash, point_hash)
    puts 'hash', hash
    puts 'po', point_hash
    res=hash[:red_ball]*point_hash[:red_ball]
    +hash[:blue_ball]*point_hash[:blue_ball]+
    +hash[:green_ball]*point_hash[:green_ball]+
    +hash[:yellow_ball]*point_hash[:yellow_ball]
  end


  def get_hash_of_killed_balls_by_player (id)
    array=[:red_ball, :blue_ball, :green_ball, :yellow_ball]
    result_hash ={}
    array.each {|i|
     count=Ball.where(:killer_id=>id).where(:kind => i).to_a.size
     result_hash[i]=count
    }
    result_hash
  end

 end

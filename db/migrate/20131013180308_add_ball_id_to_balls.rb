class AddBallIdToBalls < ActiveRecord::Migration
  def change
    add_column :balls, :ball_id, :integer
  end
end

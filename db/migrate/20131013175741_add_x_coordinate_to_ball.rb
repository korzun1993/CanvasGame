class AddXCoordinateToBall < ActiveRecord::Migration
  def change
    add_column :balls, :x_coordinate, :integer
  end
end

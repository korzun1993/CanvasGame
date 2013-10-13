class CreateBalls < ActiveRecord::Migration
  def change
    create_table :balls do |t|
      t.string :kind
      t.boolean :is_killed
      t.integer :killer_id
      t.timestamps
    end
  end
end

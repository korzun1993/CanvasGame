class AddTokenToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :token, :string
  end
end

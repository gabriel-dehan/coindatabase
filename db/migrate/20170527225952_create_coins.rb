class CreateCoins < ActiveRecord::Migration[5.0]
  def change
    create_table :coins do |t|
		  t.string :name, null: false
      t.string :symbol, null: false
      t.string :link
      t.string :announcement_thread
      t.text :description

      t.string :algorithm
      t.decimal :reward
      t.boolean :halving
      t.boolean :had_ico
      t.boolean :premined
      t.boolean :ethereum_token
      t.datetime :announcement_date
      t.decimal :max_cap

      t.text :notable_facts, array: true, default: []
      t.text :pros, array: true, default: []
      t.text :cons, array: true, default: []

		  t.decimal :price_usd
      t.decimal :price_btc
		  t.decimal :volume_usd_24h
		  t.decimal :market_cap_usd
		  t.decimal :available_supply
		  t.decimal :total_supply
      t.decimal :percent_change_1h
      t.decimal	:percent_change_24h
      t.decimal :percent_change_7d
		  t.datetime :cmc_last_updated

      t.timestamp
    end
  end
end

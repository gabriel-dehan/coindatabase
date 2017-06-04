class Coin < ApplicationRecord
  has_paper_trail
  after_create :fetch_market_data

  private

  def fetch_market_data
    client = Api::CoinMarketCap.new
    data = client.data_for(self.name)

    if data.any?
      self.price_usd = data[:price_usd].to_d
      self.price_btc = data[:price_btc].to_d
      self.volume_usd_24h = data["24h_volume_usd"].to_d
      self.market_cap_usd = data[:market_cap_usd].to_d
      self.available_supply = data[:available_supply].to_d
      self.total_supply = data[:total_supply].to_d
      self.percent_change_1h = data[:percent_change_1h].to_d
      self.percent_change_24h = data[:percent_change_24h].to_d
      self.percent_change_7d = data[:percent_change_7d].to_d
      self.cmc_last_updated = Time.at(data[:last_updated].to_i)

      self.save!
    end
  end

end

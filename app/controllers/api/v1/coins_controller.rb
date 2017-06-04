=begin
    {"name"=>"Litecoin",
     "symbol"=>"LTC",
     "description"=>"f",
     "algorithm"=>"",
     "reward"=>"",
     "halving"=>"Unknown",
     "had_ico"=>"Unknown",
     "premined"=>"Unknown",
     "ethereum_token"=>"Unknown",
     "announcement_date"=>"",
     "max_cap"=>"",
     "pros"=>[],
     "cons"=>[],
     "link"=>"",
     "announcement_thread"=>""}
=end

class Api::V1::CoinsController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User

  def create
    coin_data = params[:coin].to_hash
    # TODO: Handle unknowns
    coin_data.reject! { |k, v| v.blank? || v == "Unknown" }
    coin = Coin.where(name: coin_data["name"]).or(Coin.where(symbol: coin_data["symbol"])).first

    if coin
      render json: { error: "This coin already exists." }, status: 500
    else
      coin = Coin.create(coin_data)
      if coin
        render json: { coin: coin }, status: :ok
      else
        render json: { error: coin.errors.full_messages }, status: 500
      end
    end
  end

  def index
    render json: { coins: Coin.all }, status: :ok
  end
end

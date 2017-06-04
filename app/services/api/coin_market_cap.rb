require "http"

module Api
  class CoinMarketCap
    URL = "https://api.coinmarketcap.com/v1"

    def global_data_url
      "#{URL}/global"
    end

    def currency_data_url(currency_name, convert = :eur)
      "#{URL}/ticker/#{currency_name}/?convert=#{convert.to_s.upcase}"
    end

    def data_for(name)
      url = currency_data_url(name)
      response = HTTP.get(url)
      if response.status.code == 200 && response.parse[0]
        ActiveSupport::HashWithIndifferentAccess.new(response.parse[0])
      else
        {}
      end
    end
  end
end

class User < ApplicationRecord
  acts_as_token_authenticatable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :accounts
  has_many :trades, through: :accounts

  # TODO: In db
  def exchanges
    ['btce']#, 'plnx']
  end

  # TODO: In db
  def auth_for(exchange)
    {
      plnx: { key: 'KUB4K6BW-Q8ZZXY7S-2Z0Z2YE8-EIR9MJ4W', secret: '3192d5360bf7eadbcbecc8a9e5941841cc79f213a391f73824a83669e63f0df709eefeb333fe9103b72d26293aad675cc80f8cab9aebf7e765a2d8b1b18364b2' },
      btce: { key: 'LMGEJRI0-GDUNGAKP-UKUG0PPU-3KEIFNH9-YS4CTMOR', secret: '3d1b3555a03d4ad622fd99dd43f9bd815c6400bc3a43b6ba3f194b7c3b56cc30' }
    }[exchange.to_sym]
  end
end

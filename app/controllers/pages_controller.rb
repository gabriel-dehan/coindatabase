class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :palette ]

  def home
  end

  def palette
  end
end

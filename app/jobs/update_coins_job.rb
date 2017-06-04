class UpdateDiscordJob < ApplicationJob
  queue_as :default

  def perform()
    Yoda::DiscordBot.latest_entries

    # Do something later
  end
end

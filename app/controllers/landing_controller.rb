class LandingController < ApplicationController
  skip_before_action :user_needed

  def index
    if current_user
      redirect_to map_path
    end
  end
end

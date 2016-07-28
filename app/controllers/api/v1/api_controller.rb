module Api
  module V1
    class ApiController < ApplicationController
      before_action :auth_with_token!
    end
  end
end

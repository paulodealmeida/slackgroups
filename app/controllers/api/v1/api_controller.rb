module Api
  module V1
    class ApiController < ApplicationController
      include Concerns::Authenticator

      before_action :auth_with_token!
    end
  end
end

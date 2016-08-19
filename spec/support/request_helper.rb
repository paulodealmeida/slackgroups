module Request
  module JsonHelpers
    def json_response
      @json_response ||= JSON.parse(response.body, symbolize_names: true)
    end
  end

  module SignedRequestHelpers
    def current_user
      @user ||= try(:user) || FactoryGirl.create(:user)
    end

    def sign_in_user(user)
      authentication_user(user)
    end

    private

    def authentication_user(current_user)
      request.headers['Authorization'] = current_user.auth_token
    end
  end
end

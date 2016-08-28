module Api
  module V1
    class SessionsController < ApiController
      skip_before_action :auth_with_token!, only: [:create]

      def create
        user = User.find_by(email: session_params[:email])
        if user && user.valid_password?(session_params[:password])
          user.generate_auth_token!
          user.save
          render json: user, status: :created, location: [:api, user]
        else
          render json: { errors: 'Invalid email or password' }, status: :unprocessable_entity
        end
      end

      def destroy
        current_user.generate_auth_token!
        current_user.save
        head :no_content
      end

      private

      def session_params
        if params[:session].present?
          params.require(:session).permit(:email, :password)
        else
          params.permit(:email, :password)
        end
      end
    end
  end
end

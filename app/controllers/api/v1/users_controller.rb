module Api
  module V1
    class UsersController < ApiController
      skip_before_action :auth_with_token!, except: [:destroy]

      def show
        user = find_user
        render json: user
      end

      def create
        user = User.new(user_params)
        if user.save
          render json: user, status: :created, location: [:api, user]
        else
          render json: { errors: user.errors }, status: :unprocessable_entity
        end
      end

      def update
        user = find_user
        if user.update(user_params)
          render json: user, status: :no_content, location: [:api, user]
        else
          render json: { errors: user.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        current_user.destroy
        head :no_content
      end

      private

      def find_user
        User.find(params[:id])
      end

      def user_params
        if params[:user].present?
          params.require(:user).permit(:email, :password, :password_confirmation)
        else
          params.permit(:email, :password, :password_confirmation)
        end
      end
    end
  end
end

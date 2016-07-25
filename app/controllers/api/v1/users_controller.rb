class Api::V1::UsersController < ApplicationController
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
    user = find_user
    user.destroy
    head :no_content
  end

  private

  def find_user
    User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end

class Api::V1::SessionsController < ApplicationController
  def create
    user = User.find_by(email: create_params[:email])
    if user.valid_password?(create_params[:password])
      sign_in(user, store: false)
      user.generate_authentication_token!
      user.save
      render json: user, status: :created, location: [:api, user]
    else
      render json: { errors: 'Invalid email or password' }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find_by(auth_token: params[:id])
    if user
      user.generate_authentication_token!
      user.save
      head 204
    else
      head 401
    end
  end

  private

  def create_params
    params.require(:session).permit(:email, :password)
  end
end

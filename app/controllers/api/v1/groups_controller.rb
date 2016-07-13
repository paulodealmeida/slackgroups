class Api::V1::GroupsController < ApplicationController
  def index
    @groups = Group.all

    render json: @groups, :callback => params[:callback]
  end

  def show
    @group = Group.find(params[:id])

    render json: @group
  end

  def create
    group = Group.new(group_params)

    if group.save
      render json: group, status: :created
    else
      render json: { errors: group.errors }, status: :unprocessable_entity
    end
  end

  def update
    group = Group.find(params[:id])
    if group.update(group_params)
      render json: group, status: :no_content
    else
      render json: { errors: group.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    group = Group.find(params[:id])
    group.destroy
    head :no_content
  end

  private

  def group_params
    params.require(:group).permit(:title, :description, :url)
  end
end

class Api::V1::GroupsController < ApplicationController

  before_filter :add_allow_credentials_headers, only: [:index, :show, :create]

  def index
    groups = Group.all.order('title asc')
    render json: groups, callback: params[:callback]
  end

  def show
    group = find_group
    render json: group
  end

  def create
    group = Group.new(group_params)

    if group.save
      render json: group, status: :created, callback: params[:callback], :'Access-Control-Allow-Headers' => 'accept, content-type'
    else
      render json: { errors: group.errors }, status: :unprocessable_entity
    end
  end

  def update
    group = find_group
    if group.update(group_params)
      render json: group, status: :no_content
    else
      render json: { errors: group.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    group = find_group
    group.destroy
    head :no_content
  end

  private

  def find_group
    Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:title, :description, :url)
  end

  def add_allow_credentials_headers
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'                                                                                                                                                                                                     
    response.headers['Access-Control-Allow-Credentials'] = 'true'  
  end
end

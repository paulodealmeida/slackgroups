require 'rails_helper'

describe Api::V1::GroupsController, :type => :controller do

  describe 'GET #index' do
    before(:each) do
      @group_attributes = FactoryGirl.attributes_for(:group)
      post :create, { group: @group_attributes }, format: :json
      get :index, format: :json
    end

    it 'returns all groups' do
      expect(json_response).not_to be_empty
    end

    it { should respond_with 200 }
  end

  describe 'GET #show' do
    before(:each) do
      @group = FactoryGirl.create(:group)
      get :show, { id: @group.id }, format: :json
    end

    it 'returns the information about a group' do
      expect(json_response[:title]).to eq(@group.title)
    end

    it { should respond_with 200 }
  end

  describe 'POST #create' do
    context 'when is successfully created' do
      before(:each) do
        @group_attributes = FactoryGirl.attributes_for(:group)
        post :create, { group: @group_attributes }, format: :json
      end

      it 'renders the json representaion for the group just created' do
        expect(json_response).to include(@group_attributes)
      end

      it { should respond_with 201 }
    end

    context 'when is not created' do
      before(:each) do
        @invalid_user_attributes = { title: nil, amount: nil, date: nil }
        post :create, { group: @invalid_user_attributes }, format: :json
      end

      it 'renders an errors json' do
        expect(json_response).to have_key(:errors)
      end

      it 'renders the json errors when the group could not be created' do
        expect(json_response[:errors][:title]).to include("can't be blank")
        expect(json_response[:errors][:description]).to include("can't be blank")
        expect(json_response[:errors][:url]).to include("can't be blank")
      end

      it { should respond_with 422 }
    end
  end

  describe 'PUT/PATCH #update' do
    before(:each) do
      @group = FactoryGirl.create(:group)
    end

    context 'when group is successfully updated' do
      before(:each) do
        patch :update,
          { id: @group.id, group: { title: 'New title' } },
          format: :json
      end

      it 'renders the json representation for the updated user' do
        expect(json_response[:title]).to eq('New title')
      end

      it { should respond_with 204 }
    end

    context 'when group is not updated' do
      before(:each) do
        patch :update,
          { id: @group.id, group: { title: '' } },
          format: :json
      end

      it 'renders an errors json' do
        expect(json_response).to have_key(:errors)
      end

      it 'renders the json errors when the group could not be updated' do
        expect(json_response[:errors][:title]).to include("can't be blank")
      end

      it { should respond_with 422 }
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do
      @group = FactoryGirl.create(:group)
      delete :destroy, { id: @group.id }, format: :json
    end

    it { should respond_with 204 }
  end
end

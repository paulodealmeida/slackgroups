require 'rails_helper'

describe Api::V1::UsersController, type: :controller do
  before(:each) { request.headers['Accept'] = 'application/vnd.slackgroups.v1' }

  describe 'GET #show' do
    before(:each) do
      @user = FactoryGirl.create(:user)
      get :show, id: @user.id, format: :json
    end

    it 'returns the information about a user' do
      expect(json_response[:email]).to eq(@user.email)
    end

    it { should respond_with 200 }
  end

  describe 'POST #create' do
    context 'when is successfully created' do
      before(:each) do
        @user_attributes = FactoryGirl.attributes_for(:user)
        post :create, { user: @user_attributes }, format: :json
      end

      it 'renders the json representaion for the user just created' do
        expect(json_response[:email]).to eq(@user_attributes[:email])
      end

      it { should respond_with 201 }
    end

    context 'when is not created' do
      before(:each) do
        @invalid_user_attributes = { email: nil, password: nil }
        post :create, { user: @invalid_user_attributes }, format: :json
      end

      it 'renders an errors json' do
        expect(json_response).to have_key(:errors)
      end

      it 'renders the json errors when the user could not be created' do
        expect(json_response[:errors][:email]).to include("can't be blank")
        expect(json_response[:errors][:password]).to include("can't be blank")
      end

      it { should respond_with 422 }
    end
  end

  describe 'PUT/PATCH #update' do
    before(:each) do
      @user = FactoryGirl.create(:user)
    end

    context 'when user is successfully updated' do
      before(:each) do
        patch :update,
          { id: @user.id, user: { email: 'new_email@mail.com' } },
          format: :json
      end

      it 'renders the json representation for the updated user' do
        expect(json_response[:email]).to eq('new_email@mail.com')
      end

      it { should respond_with 204 }
    end

    context 'when user is not updated' do
      before(:each) do
        patch :update,
          { id: @user.id, user: { email: '' } },
          format: :json
      end

      it 'renders an errors json' do
        expect(json_response).to have_key(:errors)
      end

      it 'renders the json errors when the user could not be updated' do
        expect(json_response[:errors][:email]).to include("can't be blank")
      end

      it { should respond_with 422 }
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do
      @user = FactoryGirl.create(:user)
      delete :destroy, { id: @user.id }, format: :json
    end

    it { should respond_with 204 }
  end
end

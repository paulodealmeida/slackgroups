require 'rails_helper'

describe Api::V1::SessionsController, type: :controller do

  describe 'POST #create' do

    before(:each) do
      @user = FactoryGirl.create(:user)
    end

    context 'when the credentials are correct' do

      before(:each) do
        credentials = { email: @user.email, password: '12345678' }
        post :create, { session: credentials }, format: :json
      end

      it 'returns the user record corresponding to the given credentials' do
        @user.reload
        expect(json_response[:auth_token]).to eq(@user.auth_token)
      end

      it { should respond_with 201 }
    end

    context 'when the credentials are incorrect' do

      before(:each) do
        credentials = { email: @user.email, password: 'wrongpassword' }
        post :create, { session: credentials }
      end

      it 'returns a json with an error' do
        expect(json_response[:errors]).to eq('Invalid email or password')
      end

      it { should respond_with 422 }
    end
  end

  describe 'DELETE #destroy' do
    context 'when logout correctly' do
      let(:user) { FactoryGirl.create(:user) }

      before(:each) do
        credentials = { email: user.email, password: '12345678' }
        post :create, { session: credentials }, format: :json
        user.reload
        @user_auth_token = user.auth_token
        delete :destroy, { id: @user_auth_token }, format: :json
      end

      it 'cannot bet found anymore' do
        expect{ User.find_by!(auth_token: @user_auth_token) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it { should respond_with 204 }
    end

    context "when doesn't exists" do
      before(':each') do
        delete :destroy, { id: 'unusedtoken' }, format: :json
      end

      it { should respond_with 401 }
    end
  end
end

require 'rails_helper'

class Authentication < ActionController::Base
  include Authenticable
end

describe Authenticable do
  let(:user) { FactoryGirl.create(:user) }
  let(:authentication) { Authentication.new }
  subject { authentication }

  describe '#current_user' do
    context 'when correct auth' do
      before do
        request.headers['Authorization'] = user.auth_token
        allow(authentication).to receive(:request).and_return(request)
      end

      it 'returns the user from the authorization header' do
        expect(authentication.current_user.auth_token).to eq user.auth_token
      end
    end

    context 'when wrong auth' do
      before do
        request.headers['Authorization'] = 'wrong_token'
        allow(authentication).to receive(:request).and_return(request)
      end

      it 'returns the user from the authorization header' do
        expect(authentication.current_user).to be_nil
      end
    end
  end

  describe '#auth_with_token!' do
    before do
      allow(authentication).to receive(:current_user).and_return(nil)
      allow(response).to receive(:body).and_return({ 'errors' => 'Not authenticated' }.to_json)
      allow(response).to receive(:status).and_return(401)
      allow(authentication).to receive(:response).and_return(response)
    end

    it 'render a json error message' do
      expect(json_response[:errors]).to eq 'Not authenticated'
    end

    it { expect(response.status).to eq 401 }
  end
end

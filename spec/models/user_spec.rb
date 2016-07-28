require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_presence_of(:password) }
    it { should validate_confirmation_of(:password) }
    it { should validate_uniqueness_of(:auth_token) }
  end

  describe '#generate_auth_token!' do
    it 'generates a unique token' do
      allow(Devise).to receive(:friendly_token).and_return('uniquetoken')
      user = FactoryGirl.create(:user)
      expect(user.auth_token).to eq('uniquetoken')
    end

    it 'generates another token when one already has been taken' do
      allow(Devise).to receive(:friendly_token).and_return('uniquetoken',
                                                           'uniquetoken',
                                                           'newuniquetoken')

      existing_user = FactoryGirl.create(:user)
      new_user = FactoryGirl.create(:user)
      expect(existing_user.auth_token).to eq('uniquetoken')
      expect(new_user.auth_token).to eq('newuniquetoken')
      expect(existing_user.auth_token).not_to eq(new_user.auth_token)
    end
  end
end

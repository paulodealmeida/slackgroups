require 'rails_helper'

	describe Group do
		describe 'validations' do
		it { should validate_presence_of :title }
		it { should validate_presence_of :description }
		it { should validate_presence_of :url }
	end

	describe 'get correct link from url' do

		group = Group.create(title: 'title', description: 'description', url: 'www.teste.com')

		it 'should add http' do
			expect(group.link).to eq('http://' + group.url)
		end

		it 'should not add http' do
			group.url = 'http://www.teste.com'
			expect(group.link).to eq(group.url)
			expect(group.link).not_to eq('http://' + group.url)
		end

	end  
end

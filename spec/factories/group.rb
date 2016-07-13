FactoryGirl.define do
  factory :group do
    title 'Group Name'
    description FFaker::Lorem.paragraph
    url FFaker::Internet.http_url
  end
end

class Group < ActiveRecord::Base
  validates_presence_of :title, :description, :url
end

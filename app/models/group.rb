class Group < ActiveRecord::Base
  validates_presence_of :title, :description, :url

  belongs_to :user

  def link
    return 'http://' + url if !url.nil? && !url.include?('http')

    url
  end

  def as_json(options = {})
    {
      title: title,
      description: description,
      url: url,
      link: link
    }
  end
end

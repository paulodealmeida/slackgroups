class Group < ActiveRecord::Base
  validates_presence_of :title, :description, :url

  def link
    return 'http://' + url unless url.nil? && url.include?('http')

    url
  end

  def as_json
    {
      title: title,
      description: description,
      url: url,
      link: link
    }
  end
end

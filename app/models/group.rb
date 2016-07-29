class Group < ActiveRecord::Base
  
  validates_presence_of :title, :description, :url

  def link

  	if (url != nil && !(url.include? "http"))
  		return 'http://' + url
  	end

  	return url
  end

	def as_json(options={})
	  { 
	  	:title => self.title,
	  	:description => self.description,
	  	:url => self.url,
	  	:link => self.link
	  }
	end
end

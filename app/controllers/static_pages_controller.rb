class StaticPagesController < ApplicationController
  before_filter :require_login, :only => [:admin]
  
  def home
    @body_class = 'homepage'
    @post = Post.first
    @project = Project.first
  end

  def connect
    @alt_header = "Connect"
    @alt_header_url = '/connect'
    @body_class = 'connect'
    @available = User.find_by_name('Nick').accepting_projects
  end

  def admin
    @user = current_user
    render :layout => 'admin'
  end

end

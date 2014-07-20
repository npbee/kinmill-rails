class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_filter :require_login, only: [:new, :edit, :create, :update, :destroy]
  layout 'admin', :only => [:new, :edit, :create]
  
  # GET /posts
  def index
    @posts = Post.published.all
  end

  # GET /posts/1
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
    @tag_list = Tag.all
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  def create
    @post = current_user.posts.build(post_params)

    if !current_user.admin 
      redirect_to admin_path, notice: "You cannot create posts as a guest."
    elsif current_user.admin && @post.save
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /posts/1
  def update
    if !current_user.admin
      redirect_to admin_path, notice: "You cannot update posts as a guest."
    elsif current_user.admin && @post.update(post_params)
      redirect_to admin_path, notice: 'Post was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
    redirect_to posts_url, notice: 'Post was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
      check_access(@post)
    end


    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:title, :body, :slug, :tag_list, :excerpt, :published)
    end
end

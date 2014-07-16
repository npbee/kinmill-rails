class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_filter :require_login

  # GET /users
  def index
    @users = User.all
  end

  # GET /users/1
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to(:users, notice: 'User was successfully created.')
    else
      render :new
    end
  end

  # PATCH/PUT /users/1
  def update
    if params[:user][:accepting_projects]
      if @user.update_attribute(:accepting_projects, params[:user][:accepting_projects])
        redirect_to admin_path, notice: 'Got it'
      else
        redirect_to admin_path, notice: 'Trouble'
      end
    elsif @user.update(user_params)
      redirect_to @user, notice: 'User was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    redirect_to users_url, notice: 'User was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :accepting_projects)
    end
end

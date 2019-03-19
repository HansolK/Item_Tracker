class UsersController < ApplicationController
  def create
    user = User.new
    user.name = params[:name]
    user.email = params[:email]
    user.password = params[:password]
    user.save
    session[:user_id] = user.id
    render :json => {user: user}
  end
end

class SessionsController < ApplicationController
  def show
    if session[:user_id]
      render :json => {user: User.find(session[:user_id])}
    else
      render :json => {error: "not logged in"}
    end
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      puts "logged in! #{session[:user_id]}"
      puts session
      render :json => {user: user}
    else
      render :json => {error: "Email or password is invalid"}
    end
  end

  def destroy
    session[:user_id] = nil
    render :json => {success: true}
  end
end

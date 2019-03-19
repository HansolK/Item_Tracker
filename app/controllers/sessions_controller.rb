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
      redirect_to "/categories", notice: "Logged in!"
    else
      flash.now[:alert] = "Email or password is invalid"
      redirect_to "/login"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/', notice: "Logged out!"
  end
end

class CategoriesController < ApplicationController
  def index
    render :json => {categories: Category.where(user_id: session[:user_id])}
  end

  def create
    c = Category.new
    c.user_id = session[:user_id]
    c.name = params[:name]
    c.save

    render :json => c
  end

  def show
    @items = Item.where(category_id: params[:id])
    render :json => {items: @items}
  end

  def destroy
    c = Category.find(params[:id])
    c.destroy
    
    categories = Category.where(user_id: session[:user_id])
    render :json => {categories: categories}
  end
end




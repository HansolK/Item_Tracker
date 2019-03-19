class CategoriesController < ApplicationController
  def index
    render :json => {categories: Category.all}
  end

  def create
    c = Category.new
    c.user_id = params[:user_id]
    c.name = params[:name]
    c.save

    render :json => {user: c}
  end

  def show
    @items = Item.where(category_id: params[:id])
    render :json => {items: @items}
  end
end




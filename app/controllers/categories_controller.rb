class CategoriesController < ApplicationController
  def index
    render :json => {categories: Category.all}
  end

  def create
    c = Category.new
    c.user_id = params[:user_id]
    c.name = params[:name]
    c.save

    redirect_to "/categories"
  end

  def show
    @items = Item.where(category_id: params[:id])
    render :json => {items: @items}
  end
end




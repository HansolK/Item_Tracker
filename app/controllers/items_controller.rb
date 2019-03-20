class ItemsController < ApplicationController
  def create
    i = Item.new
    i.name = params[:name]
    i.category_id = params[:category_id]
    i.price = params[:price]
    i.description = params[:description]
    i.rate = params[:rate]
    i.save

    render :json => {item: i}
  end

  def show
    @item = Item.find(params[:id])
    render :json => {item: @item}
  end

  def edit
    @item = Item.find(params[:id])
    @Item.name = params[:name]
    @Item.category_id = params[:category_id]
    @Item.price = params[:price]
    @Item.description = params[:description]
    @Item.rate = params[:rate]
    @Item.save
  end
end

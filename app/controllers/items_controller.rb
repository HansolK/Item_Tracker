class ItemsController < ApplicationController
  def index
    i = Item.where(user_id: session[:user_id])
    render :json => {items: i}
  end
  
  def create
    i = Item.new
    i.name = params[:name]
    i.category_id = params[:category_id]
    i.user_id = session[:user_id]
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
    @item.name = params[:name]
    @item.category_id = params[:category_id]
    @item.price = params[:price]
    @item.description = params[:description]
    @item.rate = params[:rate]
    @item.save

    render :json => {item: @item}
  end

  def destroy
    i = Item.find(params[:id])
    i.destroy

    @item = Item.all
    puts "items"
    puts @item
    render :json => {item: @item}
  end
end

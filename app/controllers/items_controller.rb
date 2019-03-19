class ItemsController < ApplicationController
  def create
    i = Item.new
    i.name = params[:name]
    i.category_id = params[:category_id]
    i.price = params[:price]
    i.description = params[:description]
    i.rate = params[:rate]
    i.save

    redirect_to "/items/#{i.id}"
  end

  def show
    @item = Item.find(params[:id])
  end
end

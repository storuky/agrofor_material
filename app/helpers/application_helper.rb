module ApplicationHelper
  def order_positions positions
    if params[:order] == 'price' 
      order = 'position_bases.price_etalon * currencies.to_usd'
    elsif params[:order] == 'price DESC'
      order = 'position_bases.price_etalon * currencies.to_usd DESC'
    else
      if Position.accept_for_order.include?(params[:order])
        order = "position_bases.#{params[:order]}"
      end
    end

    if order
      if current_user
        collection = positions.joins("LEFT JOIN favorite_positions ON (position_bases.id=favorite_positions.position_id AND favorite_positions.user_id=#{current_user.id})").order("favorite_positions.position_id, #{order}")
      else
        collection = positions
      end

      collection.order(order)
    else
      positions
    end
  end
end

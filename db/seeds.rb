# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
def create_position u
  lat = 55.831903 + Random.rand(-1.0..1.0)
  lng = 37.411961 + Random.rand(-1.0..1.0)
  option = Option.pluck(:id).sample
  weight = Random.rand(10..1000)
  currency_id = Currency.pluck(:id).sample
  
  weight_dimension_id = WeightDimension.pluck(:id).sample
  params = {
      lat: lat,
      lng: lng,
      title: Faker::Commerce.product_name,
      option_id: option,
      weight: weight,
      weight_min: Random.rand(9..weight),
      weight_dimension_id: weight_dimension_id,
      weight_min_dimension_id: weight_dimension_id,
      price_weight_dimension_id: weight_dimension_id,
      price: Faker::Commerce.price,
      price_discount: Random.rand(5.0..50.0),
      currency_id: currency_id,
      user_id: u.id,
      address: Faker::Address.street_address,
      city: Faker::Address.city,
      trade_type_id: TradeType.pluck(:id).sample,
      description: Faker::Lorem.paragraph
  }

  position = Position.create params
  puts "Позиция №#{position.id} создана"
end

puts "Создание категории"
Category.destroy_all
Category::CATEGORY.each do |title|
  category = Category.where(title: title).first_or_create

  Option::OPTIONS[category.title].each do |option|
    Option.create(category: category, title: option)
  end
end


puts "Создание типов позиций"
TradeType.destroy_all
TradeType::TRADETYPES.each do |trade_type|
  TradeType.create(title: trade_type[:title], trade_type_id: trade_type[:trade_type_id])
end

puts "Создание размерности"
WeightDimension.destroy_all
WeightDimension::DIMENSIONS.each do |weight_dimension|
  WeightDimension.where(name: weight_dimension[:name]).first_or_create(:convert => weight_dimension[:convert])
end


puts "Создание валют"
Currency.destroy_all
Currency::CURRENCY.each do |currency|
  Currency.where(name: currency[:name]).first_or_create
end


puts "Создание админа"
admin = User.where(email: "admin@admin.com").first_or_create(
  password: "123123123",
  first_name: "Павел",
  last_name: "Кононенко",
  phones: ["+7 (988) 999 6543", "+7 (906) 180 0923"],
  skype: "storuky",
  website: "http://agrofor.pro",
  company: "Agrofor",
  additional: Faker::Lorem.paragraph(6),
  address: "#{Faker::Address.city}, #{Faker::Address.street_address}",
  lat: Faker::Address.latitude,
  lng: Faker::Address.longitude,
  country: Faker::Address.country,
  currency_id: Currency.first.id,
  interest_ids: Category.pluck(:id).sample(4)
)
create_position admin


puts "Создание пользователей"
(10-User.count).times do
  u = User.create({
    email: Faker::Internet.free_email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    password: "123123123",
    phones: ["+7 (988) 999 6543"]
  })

  puts "Создание позиций"
  10.times do
    create_position u
  end
end
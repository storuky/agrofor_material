# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151218103235) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "correspondence_positions", force: :cascade do |t|
    t.integer  "position_base_id"
    t.integer  "correspondence_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "correspondence_positions", ["correspondence_id"], name: "index_correspondence_positions_on_correspondence_id", using: :btree
  add_index "correspondence_positions", ["position_base_id"], name: "index_correspondence_positions_on_position_base_id", using: :btree

  create_table "correspondence_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "correspondence_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "correspondence_users", ["correspondence_id"], name: "index_correspondence_users_on_correspondence_id", using: :btree
  add_index "correspondence_users", ["user_id"], name: "index_correspondence_users_on_user_id", using: :btree

  create_table "correspondences", force: :cascade do |t|
    t.integer  "users_ids",           default: [],                   array: true
    t.integer  "positions_ids",       default: [],                   array: true
    t.json     "json_users",          default: []
    t.json     "json_positions",      default: []
    t.string   "correspondence_type", default: "users"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  add_index "correspondences", ["correspondence_type"], name: "index_correspondences_on_correspondence_type", using: :btree
  add_index "correspondences", ["positions_ids"], name: "index_correspondences_on_positions_ids", using: :gin
  add_index "correspondences", ["users_ids"], name: "index_correspondences_on_users_ids", using: :gin

  create_table "currencies", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "deals", force: :cascade do |t|
    t.integer  "position_id"
    t.integer  "offer_id"
    t.string   "status",      default: "new"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "deals", ["offer_id", "position_id"], name: "index_deals_on_offer_id_and_position_id", using: :btree
  add_index "deals", ["offer_id"], name: "index_deals_on_offer_id", using: :btree
  add_index "deals", ["position_id"], name: "index_deals_on_position_id", using: :btree

  create_table "documents", force: :cascade do |t|
    t.string   "file"
    t.integer  "user_id"
    t.integer  "position_base_id"
    t.string   "filename"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "favorite_positions", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "position_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "feedbacks", force: :cascade do |t|
    t.integer  "author_id"
    t.integer  "user_id"
    t.integer  "position_base_id"
    t.text     "description"
    t.boolean  "positive",         default: true
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  create_table "images", force: :cascade do |t|
    t.string   "file"
    t.integer  "user_id"
    t.integer  "position_base_id"
    t.string   "filename"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "correspondence_id"
    t.text     "body"
    t.integer  "user_id"
    t.string   "message_type"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "messages", ["correspondence_id"], name: "index_messages_on_correspondence_id", using: :btree
  add_index "messages", ["user_id"], name: "index_messages_on_user_id", using: :btree

  create_table "options", force: :cascade do |t|
    t.string  "title"
    t.integer "category_id"
  end

  add_index "options", ["category_id"], name: "index_options_on_category_id", using: :btree

  create_table "position_bases", force: :cascade do |t|
    t.string   "type"
    t.string   "template_name"
    t.boolean  "delta",                     default: true,     null: false
    t.string   "status",                    default: "opened"
    t.integer  "position_id"
    t.integer  "offer_id"
    t.string   "title"
    t.text     "description"
    t.integer  "user_id"
    t.integer  "option_id"
    t.integer  "category_id",               default: 1
    t.integer  "trade_type_id",             default: 1
    t.integer  "currency_id",               default: 1
    t.float    "price"
    t.float    "price_etalon"
    t.float    "price_discount",            default: 5.0,      null: false
    t.integer  "price_weight_dimension_id", default: 1
    t.float    "weight"
    t.float    "weight_min",                default: 0.0,      null: false
    t.float    "weight_etalon"
    t.float    "weight_min_etalon",         default: 0.0,      null: false
    t.integer  "weight_dimension_id",       default: 1
    t.integer  "weight_min_dimension_id",   default: 1
    t.text     "index_field"
    t.string   "city"
    t.string   "address"
    t.float    "lat"
    t.float    "lng"
    t.integer  "deal_with_id"
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
  end

  add_index "position_bases", ["category_id"], name: "index_position_bases_on_category_id", using: :btree
  add_index "position_bases", ["city"], name: "index_position_bases_on_city", using: :btree
  add_index "position_bases", ["deal_with_id"], name: "index_position_bases_on_deal_with_id", using: :btree
  add_index "position_bases", ["lat"], name: "index_position_bases_on_lat", using: :btree
  add_index "position_bases", ["lng"], name: "index_position_bases_on_lng", using: :btree
  add_index "position_bases", ["offer_id"], name: "index_position_bases_on_offer_id", using: :btree
  add_index "position_bases", ["option_id"], name: "index_position_bases_on_option_id", using: :btree
  add_index "position_bases", ["position_id"], name: "index_position_bases_on_position_id", using: :btree
  add_index "position_bases", ["price"], name: "index_position_bases_on_price", using: :btree
  add_index "position_bases", ["price_etalon"], name: "index_position_bases_on_price_etalon", using: :btree
  add_index "position_bases", ["trade_type_id"], name: "index_position_bases_on_trade_type_id", using: :btree
  add_index "position_bases", ["user_id"], name: "index_position_bases_on_user_id", using: :btree
  add_index "position_bases", ["weight_dimension_id"], name: "index_position_bases_on_weight_dimension_id", using: :btree
  add_index "position_bases", ["weight_etalon"], name: "index_position_bases_on_weight_etalon", using: :btree
  add_index "position_bases", ["weight_min_dimension_id"], name: "index_position_bases_on_weight_min_dimension_id", using: :btree
  add_index "position_bases", ["weight_min_etalon"], name: "index_position_bases_on_weight_min_etalon", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trade_types", force: :cascade do |t|
    t.string   "title"
    t.integer  "trade_type_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "user_interests", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",   null: false
    t.string   "encrypted_password",     default: "",   null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,    null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "avatar"
    t.string   "language"
    t.string   "phones",                 default: [],                array: true
    t.string   "website"
    t.string   "skype"
    t.string   "city"
    t.string   "address"
    t.float    "lat"
    t.float    "lng"
    t.integer  "currency_id",            default: 2,    null: false
    t.string   "company"
    t.text     "additional"
    t.json     "events",                 default: {}
    t.boolean  "banned"
    t.integer  "role_id"
    t.string   "timezone"
    t.string   "country"
    t.string   "locale",                 default: "ru", null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "weight_dimensions", force: :cascade do |t|
    t.string   "name"
    t.float    "convert"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

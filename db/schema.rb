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

ActiveRecord::Schema.define(version: 20170528005107) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coins", force: :cascade do |t|
    t.string   "name",                             null: false
    t.string   "symbol",                           null: false
    t.string   "link"
    t.string   "announcement_thread"
    t.text     "description"
    t.string   "algorithm"
    t.decimal  "reward"
    t.boolean  "halving"
    t.boolean  "had_ico"
    t.boolean  "premined"
    t.boolean  "ethereum_token"
    t.datetime "announcement_date"
    t.decimal  "max_cap"
    t.text     "notable_facts",       default: [],              array: true
    t.text     "pros",                default: [],              array: true
    t.text     "cons",                default: [],              array: true
    t.decimal  "price_usd"
    t.decimal  "price_btc"
    t.decimal  "volume_usd_24h"
    t.decimal  "market_cap_usd"
    t.decimal  "available_supply"
    t.decimal  "total_supply"
    t.decimal  "percent_change_1h"
    t.decimal  "percent_change_24h"
    t.decimal  "percent_change_7d"
    t.datetime "cmc_last_updated"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                             default: "",    null: false
    t.string   "encrypted_password",                default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                     default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.boolean  "admin",                             default: false
    t.string   "name",                                              null: false
    t.string   "authentication_token",   limit: 30
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "versions", force: :cascade do |t|
    t.string   "item_type",  null: false
    t.integer  "item_id",    null: false
    t.string   "event",      null: false
    t.string   "whodunnit"
    t.text     "object"
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", using: :btree
  end

end

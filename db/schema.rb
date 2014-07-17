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

ActiveRecord::Schema.define(version: 20140717153313) do

  create_table "posts", force: true do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
    t.integer  "user_id"
  end

  add_index "posts", ["slug"], name: "index_posts_on_slug", using: :btree

  create_table "tag_relationships", force: true do |t|
    t.integer  "reference_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "tag_id"
  end

  create_table "tags", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "users", force: true do |t|
    t.string   "email",              null: false
    t.string   "crypted_password",   null: false
    t.string   "salt",               null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.boolean  "accepting_projects"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end

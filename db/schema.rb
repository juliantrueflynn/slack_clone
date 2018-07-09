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

ActiveRecord::Schema.define(version: 20180706212936) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_subs", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id", "user_id"], name: "index_channel_subs_on_channel_id_and_user_id", unique: true
  end

  create_table "channels", force: :cascade do |t|
    t.string "title", null: false
    t.text "topic"
    t.string "slug", null: false
    t.integer "owner_id", null: false
    t.integer "workspace_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_channels_on_owner_id"
    t.index ["slug"], name: "index_channels_on_slug", unique: true
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "message_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id", "user_id"], name: "index_favorites_on_message_id_and_user_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.text "body"
    t.integer "author_id", null: false
    t.string "slug", null: false
    t.integer "channel_id", null: false
    t.integer "parent_message_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_messages_on_slug", unique: true
  end

  create_table "reactions", force: :cascade do |t|
    t.bigint "message_id", null: false
    t.bigint "user_id", null: false
    t.string "emoji", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id"], name: "index_reactions_on_message_id"
    t.index ["user_id"], name: "index_reactions_on_user_id"
  end

  create_table "reads", force: :cascade do |t|
    t.string "readable_type"
    t.bigint "readable_id"
    t.bigint "user_id"
    t.datetime "accessed_at", null: false
    t.datetime "created_at"
    t.index ["readable_type", "readable_id", "user_id"], name: "index_reads_on_readable_type_and_readable_id_and_user_id"
  end

  create_table "user_appearances", force: :cascade do |t|
    t.string "status", default: "ONLINE", null: false
    t.bigint "user_id", null: false
    t.string "workspace_slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_slug", "user_id"], name: "index_user_appearances_on_workspace_slug_and_user_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["slug"], name: "index_users_on_slug", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "workspace_subs", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "workspace_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id", "user_id"], name: "index_workspace_subs_on_workspace_id_and_user_id", unique: true
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.integer "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_workspaces_on_owner_id"
    t.index ["slug"], name: "index_workspaces_on_slug", unique: true
  end

  add_foreign_key "channel_subs", "channels"
  add_foreign_key "channel_subs", "users"
  add_foreign_key "channels", "users", column: "owner_id"
  add_foreign_key "channels", "workspaces"
  add_foreign_key "favorites", "messages"
  add_foreign_key "favorites", "users"
  add_foreign_key "messages", "channels"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "reactions", "messages"
  add_foreign_key "reactions", "users"
  add_foreign_key "reads", "users"
  add_foreign_key "user_appearances", "users"
  add_foreign_key "workspace_subs", "users"
  add_foreign_key "workspace_subs", "workspaces"
  add_foreign_key "workspaces", "users", column: "owner_id"
end

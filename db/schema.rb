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

ActiveRecord::Schema.define(version: 20181027210426) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chatroom_subs", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chatroom_id"
    t.boolean "in_sidebar", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chatroom_id", "user_id"], name: "index_chatroom_subs_on_chatroom_id_and_user_id", unique: true
  end

  create_table "chatrooms", force: :cascade do |t|
    t.string "title"
    t.string "topic"
    t.string "slug", null: false
    t.integer "owner_id"
    t.bigint "workspace_id"
    t.boolean "has_dm", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_chatrooms_on_slug", unique: true
    t.index ["workspace_id"], name: "index_chatrooms_on_workspace_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "workspace_id"
    t.bigint "message_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id", "message_id", "user_id"], name: "index_favorites_on_workspace_id_and_message_id_and_user_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.text "body"
    t.integer "author_id", null: false
    t.string "slug", null: false
    t.bigint "chatroom_id"
    t.integer "parent_message_id"
    t.string "entity_type", default: "entry"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chatroom_id"], name: "index_messages_on_chatroom_id"
    t.index ["slug"], name: "index_messages_on_slug", unique: true
  end

  create_table "pins", force: :cascade do |t|
    t.bigint "message_id"
    t.bigint "user_id"
    t.index ["message_id"], name: "index_pins_on_message_id"
  end

  create_table "reactions", force: :cascade do |t|
    t.bigint "message_id"
    t.bigint "user_id"
    t.string "emoji", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id"], name: "index_reactions_on_message_id"
    t.index ["user_id"], name: "index_reactions_on_user_id"
  end

  create_table "reads", force: :cascade do |t|
    t.integer "readable_id", null: false
    t.string "readable_type", null: false
    t.bigint "user_id"
    t.bigint "workspace_id"
    t.datetime "accessed_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["readable_type", "readable_id", "workspace_id", "user_id"], name: "index_read_workspace_user"
  end

  create_table "user_appearances", force: :cascade do |t|
    t.string "status", default: "online", null: false
    t.bigint "user_id"
    t.bigint "workspace_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id", "user_id"], name: "index_user_appearances_on_workspace_id_and_user_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "slug", null: false
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["slug"], name: "index_users_on_slug", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "workspace_subs", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "workspace_id"
    t.boolean "is_member", default: true
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

  add_foreign_key "chatroom_subs", "chatrooms", on_delete: :cascade
  add_foreign_key "chatroom_subs", "users", on_delete: :cascade
  add_foreign_key "chatrooms", "workspaces", on_delete: :cascade
  add_foreign_key "favorites", "messages", on_delete: :cascade
  add_foreign_key "favorites", "users", on_delete: :cascade
  add_foreign_key "favorites", "workspaces", on_delete: :cascade
  add_foreign_key "messages", "chatrooms", on_delete: :cascade
  add_foreign_key "messages", "users", column: "author_id", on_delete: :cascade
  add_foreign_key "pins", "messages", on_delete: :cascade
  add_foreign_key "pins", "users", on_delete: :cascade
  add_foreign_key "reactions", "messages", on_delete: :cascade
  add_foreign_key "reactions", "users", on_delete: :cascade
  add_foreign_key "reads", "users", on_delete: :cascade
  add_foreign_key "reads", "workspaces", on_delete: :cascade
  add_foreign_key "user_appearances", "users", on_delete: :cascade
  add_foreign_key "user_appearances", "workspaces", on_delete: :cascade
  add_foreign_key "workspace_subs", "users", on_delete: :cascade
  add_foreign_key "workspace_subs", "workspaces", on_delete: :cascade
  add_foreign_key "workspaces", "users", column: "owner_id", on_delete: :cascade
end

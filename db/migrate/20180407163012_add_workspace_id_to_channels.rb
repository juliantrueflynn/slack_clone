class AddWorkspaceIdToChannels < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :workspace_id, :integer
    add_index :channels, :workspace_id
  end
end
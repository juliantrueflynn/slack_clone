class ChangeChannelsWorkspaceIdColumnNull < ActiveRecord::Migration[5.1]
  def change
    change_column_null :channels, :workspace_id, false
  end
end

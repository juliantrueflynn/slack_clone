export const createWorkspaceSub = workspaceSub => (
  $.ajax({
    url: 'api/workspace_subs',
    method: 'POST',
    data: { workspace_sub: workspaceSub }
  })
);
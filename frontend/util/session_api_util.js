export const signup = user => (
  $.ajax({
    url: 'api/user',
    method: 'POST',
    data: {
      user: user
    }
  })
);

export const signin = user => (
  $.ajax({
    url: 'api/session',
    method: 'POST',
    data: {
      user: user
    }
  })
);

export const logout = () => (
  $.ajax({
    url: 'api/session',
    method: 'DELETE'
  })
);
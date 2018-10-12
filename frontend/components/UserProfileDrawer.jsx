import React from 'react';
import Button from './Button';
import withDrawer from './withDrawer';

class UserProfileDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { avatar: null };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  user() {
    const { match: { params: { userSlug } }, members } = this.props;
    return members[userSlug];
  }

  handleClick() {
    const {
      history,
      createDmChatRequest,
      match: { params: { workspaceSlug } },
    } = this.props;

    if (!this.user()) {
      return;
    }

    const { dmChat } = this.user();

    if (dmChat) {
      history.push(`/${workspaceSlug}/messages/${dmChat}`);
    } else {
      createDmChatRequest({ workspaceSlug, memberId: this.user().id });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { updateAvatarRequest } = this.props;
    const { avatar } = this.state;
    const formData = new FormData();
    formData.append('avatar', avatar);
    updateAvatarRequest(formData);

    this.setState({ avatar: null });
    formData.delete('avatar');
    const inputNode = e.target.querySelector('#avatar');
    inputNode.value = '';
  }

  handleFileChange(e) {
    const avatar = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ avatar });
    };

    if (avatar) {
      reader.readAsDataURL(avatar);
    }
  }

  render() {
    const { currentUser } = this.props;

    if (!this.user()) {
      return null;
    }

    const { username, slug } = this.user();
    const isNotCurrUser = currentUser.slug !== slug;

    return (
      <div className="UserProfileDrawer">
        {username}
        {isNotCurrUser && (
          <div className="profile__actions">
            <Button buttonFor="dm" onClick={this.handleClick}>
              Message
            </Button>
          </div>
        )}
        {isNotCurrUser || (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="avatar">
              Upload avatar
              <input
                type="file"
                id="avatar"
                name="user[avatar]"
                accept="image/*"
                onChange={this.handleFileChange}
              />
            </label>
            <Button type="submit" buttonFor="avatar">
              Upload
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default withDrawer('Workspace Directory')(UserProfileDrawer);

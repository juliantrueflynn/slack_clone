import React from 'react';
import Button from './Button';
import withDrawer from './withDrawer';

class UserProfileDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageFile: null };
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
    const { imageFile } = this.state;
    const formData = new FormData();
    formData.append('image_url', imageFile);
    updateAvatarRequest(formData);
  }

  handleFileChange(e) {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ imageFile });
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
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
                name="user[image_url]"
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

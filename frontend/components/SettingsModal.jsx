import React from 'react';
import Button from './Button';
import withForm from './withForm';
import withModal from './withModal';
import './SettingsModal.css';

class SettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      username: '',
      email: '',
    };

    this.handleTextInputValue = this.handleTextInputValue.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextInputValue(name) {
    return event => this.setState({ [name]: event.target.value });
  }

  handleFileChange(e) {
    const avatar = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.setState({ avatar, displayImage: reader.result });
    };

    if (avatar) {
      reader.readAsDataURL(avatar);
    }
  }

  resetForm(formData, formNode) {
    this.setState({ avatar: null });

    formData.forEach((_, key) => {
      formData.delete(key);
    });

    const inputNode = formNode.querySelector('#avatar');
    inputNode.value = '';
  }

  handleSubmit(e) {
    e.preventDefault();

    const { formDispatchRequest, ...props } = this.props;
    const { ...state } = this.state;

    const formData = new FormData();
    Object.keys(state).forEach((key) => {
      formData.append(`user[${key}]`, state[key] || props[key]);
    });

    formDispatchRequest(formData);
    this.resetForm(formData, e.target);
  }

  render() {
    const { modalClose, profilePhoto, ...props } = this.props;
    const { username, email } = this.state;

    return (
      <form className="SettingsModal" onSubmit={this.handleSubmit}>
        <div className="SettingsModal__col">
          <div className="Form__group">
            <label htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="Form__control"
              name="user[username]"
              value={username || props.username}
              onChange={this.handleTextInputValue('username')}
            />
          </div>
          <div className="Form__group">
            <label htmlFor="email">
              Email
            </label>
            <input
              type="text"
              className="Form__control"
              name="user[email]"
              value={email || props.email}
              onChange={this.handleTextInputValue('email')}
            />
          </div>
          <div className="Btn__group">
            <Button type="submit" color="green" buttonFor="save-profile">
              Save
            </Button>
            <Button onClick={() => modalClose()}>
              Cancel
            </Button>
          </div>
        </div>
        <div className="SettingsModal__col">
          <img src={profilePhoto} alt={`${props.username} banner`} />
          <div className="SettingsModal__uploader">
            <label htmlFor="avatar">
              Upload avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="user[avatar]"
              accept="image/*"
              onChange={this.handleFileChange}
            />
          </div>
        </div>
      </form>
    );
  }
}

const modalProps = {
  modalType: 'MODAL_SETTINGS',
  modalTitle: 'Edit your profile'
};

const formProps = { action: 'UPDATE', name: 'USER' };

export default withModal(modalProps)(withForm(formProps)(SettingsModal));

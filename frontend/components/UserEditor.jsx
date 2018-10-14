import React from 'react';
import Button from './Button';
import withForm from './withForm';
import './UserEditor.css';

class UserEditor extends React.Component {
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
      this.setState({ avatar });
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

    const { formDispatchRequest, user } = this.props;
    const { ...state } = this.state;

    const formData = new FormData();
    Object.keys(state).forEach((key) => {
      formData.append(`user[${key}]`, state[key] || user[key]);
    });

    formDispatchRequest(formData);
    this.resetForm(formData, e.target);
  }

  render() {
    const { toggleEditor, user } = this.props;
    const { username, email } = this.state;

    return (
      <form className="UserEditor" onSubmit={this.handleSubmit}>
        <div className="Form__row">
          <label htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="user[username]"
            value={username || user.username}
            onChange={this.handleTextInputValue('username')}
          />
        </div>
        <div className="Form__row">
          <label htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="user[email]"
            value={email || user.email}
            onChange={this.handleTextInputValue('email')}
          />
        </div>
        <div className="Form__row">
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
        <div className="Btn__group">
          <Button type="submit" color="green" buttonFor="save-profile">
            Save
          </Button>
          <Button onClick={() => toggleEditor()}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

export default withForm({ action: 'UPDATE', name: 'USER' })(UserEditor);

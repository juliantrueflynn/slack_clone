import React from 'react';
import Button from './Button';
import FormContainer from './FormContainer';
import './SettingsForm.css';

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      displayAvatar: null,
      username: '',
      email: '',
    };

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      username: user.username,
      email: user.email,
      displayAvatar: user.avatarLarge,
    });
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  handleFileChange(e) {
    const avatar = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.setState({ avatar, displayAvatar: reader.result });
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

    const { updateUserRequest } = this.props;
    const { ...state } = this.state;

    const formData = new FormData();
    Object.keys(state).forEach((key) => {
      formData.append(`user[${key}]`, state[key]);
    });

    updateUserRequest(formData);
    this.resetForm(formData, e.target);
  }

  render() {
    const { close, user } = this.props;
    const { username, email, displayAvatar } = this.state;

    const fields = [
      {
        id: 'username',
        type: 'text',
        name: 'user[username]',
        value: username,
        label: 'Username',
      },
      {
        id: 'email',
        type: 'text',
        name: 'user[email]',
        value: email,
        label: 'Email',
      },
      {
        id: 'avatar',
        type: 'file',
        name: 'user[avatar]',
        className: null,
        accept: 'image/*',
        onChange: this.handleFileChange,
        label: 'Upload avatar',
      }
    ];

    return (
      <div className="SettingsForm">
        <div className="SettingsForm__col">
          <FormContainer
            fields={fields}
            submitForm={this.handleSubmit}
            setFieldValue={this.handleFieldValueChange}
          >
            <Button type="submit" color="green" size="lg">Save</Button>
            <Button onClick={close} size="lg">Cancel</Button>
          </FormContainer>
        </div>
        <div className="SettingsForm__col">
          <div className="SettingsForm__avatar">
            <img
              src={displayAvatar}
              alt={`${user.username} banner`}
              height="250"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsForm;

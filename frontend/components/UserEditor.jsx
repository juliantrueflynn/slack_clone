import React from 'react';
import Button from './Button';
import withForm from './withForm';
import './UserEditor.css';

class UserEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { avatar: null };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    const { user, formDispatchRequest } = this.props;
    const { avatar } = this.state;
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formDispatchRequest(formData);

    this.setState({ avatar: null });
    formData.delete('avatar');
    const inputNode = e.target.querySelector('#avatar');
    inputNode.value = '';
  }

  render() {
    const { toggleEditor } = this.props;

    return (
      <form className="UserEditor" onSubmit={this.handleSubmit}>
        <div className="Form__row">
          <label htmlFor="avatar">
            Upload avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
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

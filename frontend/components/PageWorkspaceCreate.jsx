import React from 'react';
import Form from './Form';
import Label from './Label';
import Button from './Button';
import withForm from './withForm';
import withPublicView from './withPublicView';

class PageWorkspaceCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', slug: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputValueUpdate(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { createEntityRequest } = this.props;
    const { title, slug } = this.state;
    const workspace = { title, slug };
    createEntityRequest({ workspace });
  }

  render() {
    const { title, slug } = this.state;

    return (
      <div className="Page__container">
        <h1 className="Page__title Page__title--m0">
          Create New Workspace
        </h1>

        <Form formFor="workspace" onSubmit={this.handleFormSubmit}>
          <div className="Form__group">
            <Label htmlFor="title">
              Title
            </Label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={this.handleInputValueUpdate('title')}
            />
          </div>
          <div>
            <Label htmlFor="slug">
              Workspace URL
            </Label>
            <input
              type="text"
              name="slug"
              value={slug}
              placeholder="Workspace URL"
              onChange={this.handleInputValueUpdate('slug')}
            />
          </div>
          <Button type="submit" className="Btn__submit">
            Create Workspace
          </Button>
        </Form>
      </div>
    );
  }
}

export default withPublicView(withForm({ formFor: 'workspace' })(PageWorkspaceCreate));

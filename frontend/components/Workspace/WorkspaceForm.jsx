import React from 'react';

class WorkspaceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      slug: "",
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputValueUpdate(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { title, slug } = this.state;
    const workspace = { title, slug };
    this.props.createWorkspaceRequest({ workspace });
  }

  errors() {
    if (this.props.errors.length) {
      return (
        <ul className="errors errors__form">
          {this.props.errors.map((error, i) => (
            <li className="errors__item" key={`newWorkspaceError${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="page page__new-workspace">
        <h1 className="page__title">Create New Workspace</h1>

        {this.errors()}
        
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label>Title</label>
            <input type="text"
              value={this.state.title}
              placeholder="Title"
              onChange={this.handleInputValueUpdate('title')}
            />
          </div>
          <div>
            <label>Workspace URL</label>
            <input
              type="text"
              value={this.state.slug}
              placeholder="Workspace URL"
              onChange={this.handleInputValueUpdate('slug')}
            />
          </div>
          <input type="submit" value="Create Workspace" />
        </form>
      </div>
    );
  }
}

export default WorkspaceForm;
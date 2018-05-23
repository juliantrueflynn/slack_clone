import React from 'react';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isDropdownOpen: false };
    this.setNodeToDropdown = this.setNodeToDropdown.bind(this);
    this.handleDropdownClickOut = this.handleDropdownClickOut.bind(this);
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleDropdownClickOut);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDropdownClickOut);
  }

  handleDropdownToggle() {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  setNodeToDropdown(node) {
    this.wrapperRef = node;
  }

  handleDropdownClickOut(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isDropdownOpen: false });
    }
  }

  render() {
    const { isDropdownOpen } = this.state;
    const { togglerText, menuFor } = this.props;

    return (
      <div className={`dropdown dropdown__${menuFor}`}>
        <button
          className="button button__dropdown"
          onClick={this.handleDropdownToggle}
        >
          {togglerText}
        </button>
        {isDropdownOpen && (
          <ul ref={this.setNodeToDropdown} className="dropdown__menu">
            {this.props.children}
          </ul>
        )}
      </div>
    );
  }
}

export default DropdownMenu;
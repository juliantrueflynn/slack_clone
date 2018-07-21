import React from 'react';

class Dropdown extends React.Component {
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

  setNodeToDropdown(node) {
    this.wrapperRef = node;
  }

  handleDropdownToggle() {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  handleDropdownClickOut(e) {
    const ref = this.wrapperRef;

    if (ref && !ref.contains(e.target) && !this.state.isDropdownOpen) {
      this.setState({ isDropdownOpen: false });
    }
  }

  render() {
    const { isDropdownOpen } = this.state;
    const { togglerText } = this.props;

    return (
      <div className="dropdown">
        <button
          className="btn btn__dropdown"
          onClick={this.handleDropdownToggle}
        >
          {togglerText}
        </button>
        {isDropdownOpen && (
          <div ref={this.setNodeToDropdown} className="dropdown__content">
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;

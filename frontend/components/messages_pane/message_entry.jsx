import React from 'react';

class MessageEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isMouseOver: false };

    this.handleMouseEnterHover = this.handleMouseEnterHover.bind(this);
    this.handleMouseLeaveHover = this.handleMouseLeaveHover.bind(this);
  }

  handleMouseEnterHover() {
    this.setState({ isMouseOver: true });
  }

  handleMouseLeaveHover() {
    this.setState({ isMouseOver: false });
  }

  render() {
    const { message } = this.props;

    return (
      <li
        className="message"
        onMouseEnter={ this.handleMouseEnterHover }
        onMouseLeave={ this.handleMouseLeaveHover }>
        {
          this.state.isMouseOver &&
          <div>
            <button>Start thread</button>
          </div>
        }
        { message.authorId }
        { message.body }
      </li>
    );
  }
}

export default MessageEntry;
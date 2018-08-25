import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

class DmChatMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMouseOver: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleHoverToggle = this.handleHoverToggle.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const { updateChannelSubRequest, channelId, userId } = this.props;
    const channelSub = { userId, channelId, inSidebar: false };
    updateChannelSubRequest(channelSub);
  }

  handleHoverToggle(isMouseOver) {
    return () => this.setState({ isMouseOver });
  }

  render() {
    const { label } = this.props;
    const { isMouseOver } = this.state;

    return (
      <span
        onMouseEnter={this.handleHoverToggle(true)}
        onMouseLeave={this.handleHoverToggle(false)}
      >
        {label}
        {isMouseOver && (
          <Button onClick={this.handleClick}>
            <FontAwesomeIcon icon="times-circle" />
          </Button>
        )}
      </span>
    );
  }
}

export default DmChatMenuItem;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import './DmChatMenuItem.css';

class DmChatMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const { updateChannelSubRequest, channelSubId } = this.props;
    updateChannelSubRequest(channelSubId);
  }

  render() {
    const { label } = this.props;

    return (
      <div className="DmChatMenuItem">
        {label}
        <Button unStyled onClick={this.handleClick}>
          <FontAwesomeIcon icon="times-circle" />
        </Button>
      </div>
    );
  }
}

export default DmChatMenuItem;

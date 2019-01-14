import React from 'react';

class MessageSubscriberText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayText: '' };
    this.handleDisplayText = this.handleDisplayText.bind(this);
  }

  componentDidMount() {
    this.handleDisplayText();
  }

  componentDidUpdate(prevProps) {
    const { sub } = this.props;

    if (sub.group.length !== prevProps.sub.group.length) {
      this.handleDisplayText();
    }
  }

  getParentText(entity) {
    const { sub } = this.props;
    const typeText = entity.entityType === 'sub_create' ? 'joined' : 'left';
    const isParent = sub.id === entity.id;

    let string = typeText;
    if (!isParent) {
      string = `${entity.username} ${typeText}`;
    }

    if (isParent) {
      string += ` ${entity.chatroomTitle}`;
    }

    if (isParent && sub.group.length) {
      return string;
    }

    return `${string}.`;
  }

  static getUniqueAuthorIds(parentAuthorId, group) {
    return group.map(item => item.authorId).filter((id, idx, self) => (
      id !== parentAuthorId && self.indexOf(id) === idx
    ));
  }

  static getSingleOrMultiText(parent, arr) {
    let string = '';

    if (parent && arr.length === 1) {
      if (parent.authorId !== arr[0].authorId) {
        string = ` along with ${arr[0].username}.`;
      }
    }

    if (parent && arr.length > 1) {
      const authorIds = MessageSubscriberText.getUniqueAuthorIds(parent.authorId, arr);

      if (authorIds.length) {
        string = ` along with ${authorIds.length} others.`;
      }
    }

    return string;
  }

  getDisplayText() {
    const { sub } = this.props;

    if (this.hasOneMessageType()) {
      return MessageSubscriberText.getSingleOrMultiText(sub, sub.group);
    }

    if (!this.hasOneMessageType()) {
      const bySubType1 = sub.group.filter(item => item.entityType === sub.entityType);
      const subsByType2 = sub.group.filter(item => item.entityType !== sub.entityType);
      const childSubsType2 = subsByType2.slice(1);

      let displayText = MessageSubscriberText.getSingleOrMultiText(sub, bySubType1);
      displayText += ` Also, ${this.getParentText(subsByType2[0])}`;
      displayText += MessageSubscriberText.getSingleOrMultiText(subsByType2[0], childSubsType2);

      return displayText;
    }

    return this.getParentText(sub);
  }

  hasOneMessageType() {
    const { sub } = this.props;

    return sub.group.every(item => item.entityType === sub.entityType);
  }

  handleDisplayText() {
    const displayText = this.getDisplayText();
    this.setState({ displayText });
  }

  render() {
    const { displayText } = this.state;
    const style = { color: '#636E72' };

    return <div className="MessageSubscriberText" style={style}>{displayText}</div>;
  }
}

export default MessageSubscriberText;

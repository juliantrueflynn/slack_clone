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

  static getEntityType(entity) {
    return entity.entityType === 'sub_create' ? 'joined' : 'left';
  }

  getParentText(groupParent) {
    const { sub } = this.props;

    if (groupParent) {
      return `${MessageSubscriberText.getEntityType(groupParent)}`;
    }

    if (!groupParent && sub.group.every(item => item.authorSlug === sub.authorSlug)) {
      return `${MessageSubscriberText.getEntityType(sub)} ${sub.chatroomTitle}.`;
    }

    return `${MessageSubscriberText.getEntityType(sub)} ${sub.chatroomTitle}`;
  }

  static getUniqueAuthorIds(parentAuthorId, group) {
    return group.map(item => item.authorId).filter((id, idx, self) => (
      id !== parentAuthorId && self.indexOf(id) === idx
    ));
  }

  static getMixedGroupText(parent, arr) {
    let string = '';

    if (!parent) {
      return string;
    }

    if (arr.length === 1 && parent.authorId !== arr[0].authorId) {
      string = ` along with ${arr[0].username}.`;
    }

    if (arr.length > 1) {
      const authorIds = MessageSubscriberText.getUniqueAuthorIds(parent.authorId, arr);

      if (authorIds.length) {
        string = ` along with ${authorIds.length} others.`;
      }
    }

    return string;
  }

  getDisplayText() {
    const { sub } = this.props;

    if (!this.isSingleEntityType()) {
      const bySubType1 = sub.group.filter(item => item.entityType === sub.entityType);
      const subsByType2 = sub.group.filter(item => item.entityType !== sub.entityType);
      const childSubsType2 = subsByType2.slice(1);

      const primaryParentTxt = this.getParentText();
      const secondaryParentTxt = this.getParentText(subsByType2[0]);

      if (this.isAllSameAuthor()) {
        return `${primaryParentTxt} Also, ${sub.username} ${secondaryParentTxt}.`;
      }

      return (`
        ${primaryParentTxt}
        ${MessageSubscriberText.getMixedGroupText(sub, bySubType1)}
        Also, ${sub.username} ${secondaryParentTxt}
        ${MessageSubscriberText.getMixedGroupText(subsByType2[0], childSubsType2)}
      `);
    }

    return `${this.getParentText()} ${MessageSubscriberText.getMixedGroupText(sub, sub.group)}`;
  }

  isAllSameAuthor() {
    const { sub } = this.props;

    return sub.group.every(item => item.authorSlug === sub.authorSlug);
  }

  isSingleEntityType() {
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

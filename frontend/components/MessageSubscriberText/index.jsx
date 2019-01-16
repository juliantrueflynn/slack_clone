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

  static getUniqueAuthorIds(parentAuthorId, group) {
    return group.map(item => item.authorId).filter((id, idx, self) => (
      id !== parentAuthorId && self.indexOf(id) === idx
    ));
  }

  getParentText(groupParent) {
    const { sub, chatroomTitle } = this.props;
    const parent = groupParent || sub;
    const entityType = parent.entityType === 'sub_create' ? 'joined' : 'left';

    if (groupParent) {
      return `${entityType}`;
    }

    const appendedPeriod = this.isAllSameAuthor() ? '.' : '';

    return `${entityType} ${chatroomTitle}${appendedPeriod}`;
  }

  getMixedGroupText(arr, groupParent) {
    const { sub } = this.props;
    const parent = groupParent || sub;
    let string = '';

    if (arr.length === 1 && parent.authorId !== arr[0].authorId) {
      string = ` along with ${arr[0].username}.`;
    }

    if (arr.length > 1) {
      const authorIds = MessageSubscriberText.getUniqueAuthorIds(parent.authorId, arr);
      const appendS = authorIds.length > 1 ? 's' : '';
      string = ` along with ${authorIds.length} other${appendS}.`;
    }

    return string;
  }

  getSecondaryGroup() {
    const { sub } = this.props;

    return sub.group.filter(item => item.entityType !== sub.entityType) || [];
  }

  getDisplayText() {
    const { sub } = this.props;

    if (this.hasMultipleEntityTypes() && this.isAllSameAuthor()) {
      return this.formatMixedGroupDisplayText('', '.');
    }

    if (this.hasMultipleEntityTypes()) {
      const primaryGroup = sub.group.filter(item => item.entityType === sub.entityType);
      const [secondaryParent] = this.getSecondaryGroup();
      const secondaryGroupChildren = this.getSecondaryGroup().slice(1);

      return this.formatMixedGroupDisplayText(
        this.getMixedGroupText(primaryGroup),
        ` ${this.getMixedGroupText(secondaryGroupChildren, secondaryParent)}`
      );
    }

    const primaryParentTxt = this.getParentText();
    const primaryGroupTxt = this.getMixedGroupText(sub.group);

    return `${primaryParentTxt} ${primaryGroupTxt}`;
  }

  formatMixedGroupDisplayText(prepend, append) {
    const { sub: { username } } = this.props;
    const parentTxt = this.getParentText();
    const [secondaryParent] = this.getSecondaryGroup();
    const secondaryParentTxt = this.getParentText(secondaryParent);

    return `${parentTxt} ${prepend} Also, ${username} ${secondaryParentTxt}${append}`;
  }

  isAllSameAuthor() {
    const { sub } = this.props;

    return sub.group.every(item => item.authorSlug === sub.authorSlug);
  }

  hasMultipleEntityTypes() {
    const { sub } = this.props;

    return !(sub.group.every(item => item.entityType === sub.entityType));
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

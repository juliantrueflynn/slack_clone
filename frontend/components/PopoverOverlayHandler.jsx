import React from 'react';
import onClickOutside from 'react-onclickoutside';

class PopoverOverlayHandler extends React.Component {
  componentDidMount() {
    PopoverOverlayHandler.setBodyClassList('add');
  }

  componentWillUnmount() {
    PopoverOverlayHandler.setBodyClassList('remove');
  }

  static setBodyClassList(addOrRemove) {
    const bodyEl = document.querySelector('body');
    bodyEl.classList[addOrRemove]('popover-open');
  }

  handleClickOutside(e) {
    const { onOverlayClick } = this.props;

    if (e.target.id === 'workspace' || e.target.dataset.popover === 'hidden') {
      onOverlayClick(e);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default onClickOutside(PopoverOverlayHandler);

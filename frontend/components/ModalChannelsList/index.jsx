import React from 'react';
import ScrollBar from '../ScrollBar';
import ModalChannelsListItem from '../ModalChannelsListItem';
import withWindowResize from '../../hoc/withWindowResize';
import ModalHeader from '../ModalHeader';
import './styles.css';

class ModalChannelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.scrollBarRef = React.createRef();
  }

  componentDidMount() {
    const { fetchChatroomsRequest, workspaceSlug } = this.props;
    fetchChatroomsRequest(workspaceSlug);
  }

  componentDidUpdate(prevProps) {
    const { windowHeight } = this.props;

    if (windowHeight !== prevProps.windowHeight) {
      this.updateHeight();
    }
  }

  updateHeight() {
    const { windowHeight } = this.props;
    const { top } = this.scrollBarRef.current.getBoundingClientRect();
    const height = windowHeight - top - 5;

    this.setState({ height });
  }

  render() {
    const {
      chatrooms,
      workspaceSlug,
      isLoading,
      close,
      chatPath,
    } = this.props;
    const { height } = this.state;

    return (
      <div className="ModalChannelsList">
        <ModalHeader modalTitle="Browse channels" close={close} />
        <div className="ModalChannelsList__body">
          <div className="ModalChannelsList__subhead">
            Channels you can join
          </div>
          <ScrollBar scrollBarRef={this.scrollBarRef} style={{ height }}>
            <div role="list" className="ModalChannelsList__list">
              {isLoading || chatrooms.filter(ch => chatPath !== ch.slug).map(ch => (
                <ModalChannelsListItem
                  key={ch.slug}
                  chatroom={ch}
                  workspaceSlug={workspaceSlug}
                  close={close}
                />
              ))}
            </div>
          </ScrollBar>
        </div>
      </div>
    );
  }
}

export default withWindowResize(ModalChannelsList);

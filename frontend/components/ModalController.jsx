import React from 'react';
import ReactModal from 'react-modal';
import ChannelFormModal from './ChannelFormModal';
import Modal from './Modal';
import ChatModal from './ChatModal';
import ProfileModal from './ProfileModal';
import ChannelsListModal from './ChannelsListModal';
import WorkspaceFormModal from './WorkspaceFormModal';
import SearchModal from './SearchModal';

class ModalController extends React.Component {
  componentDidMount() {
    ReactModal.setAppElement('#root');
  }

  render() {
    const {
      currModalOpen,
      modalProps,
      closeModal,
      channels,
      channelsMap,
      users,
      messages,
      searchQuery,
      isLoading,
      fetchChannelsRequest,
      fetchSearchRequest,
      destroySearch,
    } = this.props;

    const modals = [
      {
        type: 'MODAL_FORM_CHANNEL',
        component: ChannelFormModal,
        modalTitle: 'Update channel',
      },
      {
        type: 'MODAL_CHAT',
        component: ChatModal,
        modalTitle: 'Create a channel',
      },
      {
        type: 'MODAL_CHATS',
        component: ChannelsListModal,
        modalTitle: 'Browse channels',
        modalFor: 'chats',
        fetchChannelsRequest,
        channels,
      },
      {
        type: 'MODAL_PROFILE',
        component: ProfileModal,
        modalTitle: 'Edit your profile',
      },
      {
        type: 'MODAL_FORM_WORKSPACE',
        component: WorkspaceFormModal,
        modalTitle: 'Create a workspace',
      },
      {
        type: 'MODAL_SEARCH',
        component: SearchModal,
        isLoading,
        searchQuery,
        channelsMap,
        users,
        messages,
        fetchSearchRequest,
        destroySearch,
      }
    ];

    return modals.filter(modal => modal.type === currModalOpen)
      .map(({ component: Component, props, ...modal }) => (
        <Modal key={modal.type} isOpen close={closeModal} {...modal} {...modalProps}>
          <Component {...modal} close={closeModal} {...modalProps} />
        </Modal>
      ));
  }
}

export default ModalController;

import React from 'react';
import ReactModal from 'react-modal';
import Modal from './Modal';
import ModalChannelForm from './ModalChannelForm';
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
      channelFormRequest,
      updateUserRequest,
      updatePasswordRequest,
      createWorkspaceRequest,
      fetchSearchRequest,
      destroySearch,
    } = this.props;

    const props = modalProps || {};

    const modals = [
      {
        type: 'MODAL_FORM_CHANNEL',
        component: ModalChannelForm,
        modalTitle: props.channel ? 'Update channel' : 'Create a channel',
        channelFormRequest,
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
        updateUserRequest,
        updatePasswordRequest,
      },
      {
        type: 'MODAL_FORM_WORKSPACE',
        component: WorkspaceFormModal,
        modalTitle: 'Create a workspace',
        createWorkspaceRequest,
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
      .map(({ component: Component, ...modal }) => (
        <Modal key={modal.type} isOpen close={closeModal} {...modal} {...props}>
          <Component {...modal} close={closeModal} {...props} />
        </Modal>
      ));
  }
}

export default ModalController;

import React from 'react';
import ReactModal from 'react-modal';
import Modal from './Modal';
import ModalChannelForm from './ModalChannelForm';
import ModalProfile from './ModalProfile';
import ModalChannelsList from './ModalChannelsList';
import ModalWorkspaceForm from './ModalWorkspaceForm';
import ModalSearch from './ModalSearch';

class ModalController extends React.Component {
  componentDidMount() {
    ReactModal.setAppElement('#root');
  }

  render() {
    const {
      currModalOpen,
      modalProps,
      close,
      user,
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
        component: ModalChannelsList,
        modalTitle: 'Browse channels',
        modalFor: 'chats',
        unStyled: true,
        fetchChannelsRequest,
        channels,
      },
      {
        type: 'MODAL_PROFILE',
        component: ModalProfile,
        modalTitle: 'Edit your profile',
        user,
        updateUserRequest,
        updatePasswordRequest,
      },
      {
        type: 'MODAL_FORM_WORKSPACE',
        component: ModalWorkspaceForm,
        modalTitle: 'Create a workspace',
        createWorkspaceRequest,
      },
      {
        type: 'MODAL_SEARCH',
        component: ModalSearch,
        modalFor: 'search',
        unStyled: true,
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
        <Modal key={modal.type} isOpen close={close} {...modal} {...props}>
          <Component {...modal} close={close} {...props} />
        </Modal>
      ));
  }
}

export default ModalController;

import React from 'react';
import SearchBar from './SearchBar';
import MessageContainer from './MessageContainer';
import withModal from './withModal';

class SearchModal extends React.Component {
  render() {
    const {
      messages,
      users,
      fetchSearchRequest,
      query,
    } = this.props;
    const searchEntries = messages.filter(msg => msg.isInSearch);

    return (
      <div className="SearchModal">
        <SearchBar fetchSearchRequest={fetchSearchRequest} searchQuery={query} />

        {searchEntries.map(message => (
          <MessageContainer key={message.id} message={message} users={users} />
        ))}
      </div>
    );
  }
}

const modalProps = { modalType: 'MODAL_SEARCH' };

export default withModal(modalProps)(SearchModal);

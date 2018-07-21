import React from 'react';
import { NavLink } from 'react-router-dom';
import UsersMenu from './UsersMenu';
import ChannelsMenu from './Channel/ChannelsMenu';
import NewChannelModal from './NewChannelModal';
import PreferencesModal from './PreferencesModal';
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  handleModalOpen() {
    this.props.modalOpen('NEW_CHANNEL_MODAL');
  }

  render() {
    const {
      subbedChannels,
      workspaceSlug,
      currentUser,
      members,
      ...props
    } = this.props;

    return (
      <aside className="sidebar sidebar__left">
        <UsersMenu
          workspaceSlug={workspaceSlug}
          channelSlug={props.channelSlug}
          userSlug={props.userSlug}
          workspaces={props.workspaces}
          modalOpen={props.modalOpen}
          modalClose={props.modalClose}
        />

        <ul className="menu menu__quicklinks">
          <li className="menu__item menu__item-unreads">
            <NavLink to={`/${workspaceSlug}/unreads`} className="menu__link">
              All Unreads
            </NavLink>
          </li>
          <li className="menu__item menu__item-threads">
            <NavLink to={`/${workspaceSlug}/threads`} className="menu__link">
              All Threads
            </NavLink>
          </li>
        </ul>

        <div className="sidebar-widget">
          <header className="widget__header">
            <span className="widget__title">Channels</span>
            <button className="btn btn__channels" onClick={this.handleModalOpen}>+</button>
          </header>
          {subbedChannels && (
            <ChannelsMenu subbedChannels={subbedChannels} workspaceSlug={workspaceSlug} />
          )}
        </div>

        <div className="sidebar-widget">
          <header className="widget__header">
            <span className="widget__title">Direct Messages</span>
            <button className="btn btn__channels" onClick={this.handleModalOpen}>+</button>
          </header>

          <ul className="menu">
            {props.dmChats && props.dmChats.map(({ slug: chSlug, memberSlugs }) => (
              <li className="menu__item" key={chSlug}>
                <NavLink className="menu__link" to={`/${workspaceSlug}/${chSlug}`}>
                  {memberSlugs.filter(slug => slug !== currentUser.slug).map(slug => (
                    <span key={slug}>{members[slug].username}</span>
                  ))}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <NewChannelModal
          workspaceId={props.workspaceId}
          isModalOpen={props.isChannelModalOpen}
          modalClose={props.modalClose}
          createChannelRequest={props.createChannelRequest}
        />

        <PreferencesModal
          workspaceSlug={workspaceSlug}
          modalClose={props.modalClose}
          isModalOpen={props.isSettingsModalOpen}
        />
      </aside>
    );
  }
}

export default LeftSidebar;

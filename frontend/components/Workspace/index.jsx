import React from 'react';
import { faSpinner, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import sampleWisdomQuote from '../../util/wisdomQuotesUtil';
import EmptyDisplay from '../EmptyDisplay';
import LeftSidebarContainer from '../../containers/LeftSidebarContainer';
import { PageRoutes } from '../../util/routeUtil';
import './styles.css';

class Workspace extends React.Component {
  componentDidMount() {
    const { workspaces, fetchWorkspacesRequest, fetchWorkspaceRequest } = this.props;

    fetchWorkspaceRequest();

    if (!workspaces || !workspaces.length) {
      fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      history,
      workspaces,
      isLoading,
      chatroomSlug,
      chatroom,
      workspace,
      workspaceSlug,
      fetchWorkspaceRequest,
      fetchWorkspacesRequest,
    } = this.props;

    if (workspaceSlug !== prevProps.workspaceSlug) {
      fetchWorkspaceRequest();
    }

    if (!isLoading && prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      fetchWorkspacesRequest();
    }

    if (match.isExact && chatroom && chatroom.workspaceSlug === workspace.slug) {
      history.replace(`/${workspaceSlug}/messages/${chatroomSlug}`);
    }
  }

  render() {
    const { isLoading, routes, chatroom } = this.props;
    const { quoteText, quoteBy } = sampleWisdomQuote;
    const hasLoaded = !isLoading && chatroom;

    if (!hasLoaded) {
      return (
        <div className="Workspace Workspace--loading">
          <EmptyDisplay topIcon={faQuoteLeft} loadingIcon={faSpinner} pulse>
            <blockquote className="Workspace__quote">
              {quoteText}
              <footer>{`— ${quoteBy}`}</footer>
            </blockquote>
          </EmptyDisplay>
        </div>
      );
    }

    return (
      <div className="Workspace">
        {hasLoaded && <LeftSidebarContainer />}
        {hasLoaded && <PageRoutes routes={routes} />}
      </div>
    );
  }
}

export default Workspace;

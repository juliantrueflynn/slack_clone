import React from 'react';

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { channelSlug } = this.props.match.params;
    this.props.loadChannelPage(channelSlug);
  }

  componentWillReceiveProps(nextProps) {
    const { channelSlug } = this.props.match.params;
    const nextChannelSlug = nextProps.match.params.channelSlug;
    if(channelSlug !== nextChannelSlug) {
      this.props.loadChannelPage(nextChannelSlug);
    }
  }

  render() {
    const { channelSlug } = this.props.match.params;

    return (
      <div>
        <h1>Channel Page Working! #{ channelSlug }</h1>
      </div>
    );
  }
}

export default ChannelPage;
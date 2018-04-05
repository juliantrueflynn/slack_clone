# React & Rails Slack Clone

Creating a [Slack](https://slack.com/) clone, trying to complete as many features as possible in 12 days.

#### Working Dates

Start date is 4/4/18, end date is 4/16/18.

## Features

- Create new channels or join a channel
- Invite people to their Slacks and or channels
- User can switch between signed in Slack chats
- Add details to channel and set topics
- User can view all channel members and search list
- Search messages and "jump to" dates
- User can reply to or start new message thread
- User can favorite messages and view list of their favorited messages
- User can "mention" other users which notifies mentioned user
- User can view all their activity with other users
- Add "reactions" to messages (i.e. emojis)
- Users can privately direct message each other
- User can edit or delete their own comment
- User can edit settings per Slack or per channel
- Bonus: user can set their public online status per Slack
- Bonus: messages allow markdown formatting
- Bonus: extra tags for "mention" like "@channel" and "@all"

## State Shape

Before building app, here is the planned state shape:

```JSON
{
  entities: {
    channels: {
      1: {
        title: "#examplechannelone",
        subscribed: true,
        members: 7,
        description: "Blah blah blah",
      },
      2: {
        title: "#exchanneltwo",
        subscribed: false,
      },
    },
    messages: {
      1: {
        id: 1,
        body: "Welcome to examplechannelone everyone",
        authorId: 3,
        parentCommentId: null,
        channelId: 1,
        reactionIds: [1, 4],
      },
      2: {
        id: 2,
        body: "What a nice clone of Slack!",
        authorId: 2,
        parentCommentId: null,
        channelId: 1,
        reactionIds: [],
      },
      3: {
        id: 3,
        body: "this is soo cool",
        authorId: 2,
        parentCommentId: 2,
        channelId: 1,
        reactionIds: [],
      }
    },
    reactions: {
      2: {
        id: 1,
        type: 'thumbs_up',
        userId: 1,
        messageId: 1
      },
      13: {
        id: 13,
        type: 'thumbs_up',
        userId: 2,
        messageId: 1
      },
    }
  },
  ui: {
    loading: false,
    displayChannelId: 1,
    displayMessageId: 2,
  },
  errors: {
    session: [],
    messageForm: [],
  },
  session: {
    id: 5,
    username: "joe_schmoe",
    email: "hello@example.com"
    img_url: "https://example.com/avatar.jpg"
  }
}
```
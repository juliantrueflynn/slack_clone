# React & Rails Slack Clone

Slack clone powered by Rails, React, and Redux. [View live demo](https://slack-clone-julian.herokuapp.com/)

![Slack Clone preview](https://user-images.githubusercontent.com/2691129/51093288-1e155000-1770-11e9-9340-6404999b711e.png)

## Table of Contents

1. [Features](#features)
2. [How to Use](#how-to-use)
3. [Technologies](#technologies)

## Features

- Responsive design
- Create new workspaces and channels, or join ones already created
- Edit the channel topic, and channel creators can edit the title
- Send other users in workspace a direct message
- Search all messages in workspace for channels you're subscribed to
- Edit or delete your messages
- Start message threads or join a conversation
- Favorite messages and view list of favorited messages
- Pin messages to channel
- Add reactions to messages
- Add emojis to messages by typing (ex. ```:smile:```) or selecting from dropdown
- View channel details, pinned messages, or subscribers
- Search channels you're not subscribed to
- Be notified of unread channels or conversations you've joined
- View all unread messages
- View all conversations you're present in

## How to Use

Steps below are used to set the project locally. You could also review the app by visting the [live demo](https://slack-clone-julian.herokuapp.com/)

```
# clone the project
git clone https://github.com/juliantrueflynn/slack_clone.git

# change directory to where the project was downloaded
cd slack_clone

# install all necessary gems
bundle install

# install all node dependencies
npm install

# create PostgreSQL database, migrate schema, and seed database
rails db:setup

# start the server, then open your browser to: http://localhost:3000
rake start
```

## Technologies

- Rails
- React
- ElasticSearch
- Action Cable
- React Router
- Redux
- Redux Saga
- Draft JS

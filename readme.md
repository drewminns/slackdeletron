# Slack Deletron 📁␡

V3.0

[![Build Status](https://travis-ci.org/drewminns/slackdeletron.svg?branch=master)](https://travis-ci.org/drewminns/slackdeletron)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

## What the?

Slack Deletron is a service that helps users of Slack manage files and storage on their workspaces. The site is a UI wrapper over the [Slack API Web Methods](https://api.slack.com/methods) available to all users.

I do not work for Slack (although I would 😘), so this is purely a fun side project to help out the community.

The API has it's limits so this project tries to work it's best within them, but of course, not all features are possible.

**Mostly, I wanted to build this to help others learn and contribute to the project**

## Whoa, V2 had a bulk delete button!! Where'd that go bro?!

So Yes, you used to be able to bulk delete files in older versions. However, Slack has applied [rate limits](https://api.slack.com/docs/rate-limits) to it's API to limit concurrent requests to their server. Totally fair, the old versions of this app would hammer them. You see, the only way to delete a file is to send off a request with the file ID. To do bulk deletion, the app would make a large number of individual requests to the endpoint for each file ID, which could lead to other async issues aside.

Instead of setting up a queueing system to manage bulk deletion requests, handling different services and servers, and creating a notification system; I decided to put the focus on managing the files and **finally** addressing the features that people tweet, email and leave in the Github issues.

## FAQ

**How does this work?**

This app uses the [Slack Web API Methods](https://api.slack.com/methods) that are open to all users. You define the type of files you want to search for, this app helps you navigate them, and the API handles the deletion.

**Is this made by Slack?**

Nope, but I would LOVE to work for Slack ;).

**Is this thing safe?**

I store nothing. The only information needed to log you in is stored in your browser as a cookie and a service work. There are no databases, no caching (except on your own machine), anything.

## Support

If there's any issues or questions about the tool, add an issue to [repo](https://github.com/drewminns/slackdeletron/issues/new).

## Built with

Client Side:

* [React](https://reactjs.org/) (Using the new Context API - [Read about it here](https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b))
* [React Dates](http://airbnb.io/react-dates/)

Server Side:

* [Express](https://expressjs.com/)
* [Passport](http://www.passportjs.org/)
* [Cookie Session](https://github.com/expressjs/cookie-session)
* [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware)
* [Webpack Hot Middleware](https://github.com/webpack-contrib/webpack-hot-middleware)

Testing/Utility:

* [Enzyme](https://webpack.js.org/)
* [Jest](https://facebook.github.io/jest/)
* [Axios](https://github.com/axios/axios)
* [Husky](https://github.com/typicode/husky)
* [Travis CI](https://travis-ci.org/)

## License

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

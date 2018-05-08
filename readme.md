# Slack Deletron 📁␡

V3.0

[![Build Status](https://travis-ci.org/drewminns/slackdeletron.svg?branch=master)](https://travis-ci.org/drewminns/slackdeletron)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

[slackdeletron.com](https://slackdeletron.com)

## What the?

Slack Deletron is a service that helps users of Slack manage files and storage on their workspaces. The site is a UI wrapper over the [Slack API Web Methods](https://api.slack.com/methods) available to all users.

I do not work for Slack (although I would 😘 - Call me: [drewminns.com](http://drewminns.com) ) , so this is purely a fun side project to help out the community.

The API has it's limits so this project tries to work it's best within them, but of course, not all features are possible.

**Mostly, I wanted to build this to help others learn and contribute to the project**

## Whoa, V2 had a bulk delete button!! Where'd that go bro?!

So Yes, you used to be able to bulk delete files in older versions. However, Slack has applied [rate limits](https://api.slack.com/docs/rate-limits) to it's API to limit concurrent requests to their server. Totally fair, the old versions of this app would hammer them. You see, the only way to delete a file is to send off a request with the file ID. To do bulk deletion, the app would make a large number of individual requests to the endpoint for each file ID, which could lead to other async issues aside.

Instead of setting up a queueing system to manage bulk deletion requests, handling different services and servers, and creating a notification system; I decided to put the focus on managing the files and **finally** addressing the features that people tweet, email and leave in the Github issues.

## Running Locally

1.  Clone the Repo locally

`git clone git@github.com:drewminns/slackdeletron.git`

2.  Install the dependencies

`npm i`

3.  Create a new Slack App for local development at [https://api.slack.com/apps](https://api.slack.com/apps). You'll need to give it a name and assign to a Slack Workspace. In the App Credentials section, grab the Client ID and the Client Secret values.

4.  Create a `dev.js` file in the `config/keys` directory to hold your local configuration.

```
module.exports = {
  slackClientID: <Client ID>,
  slackClientSecret: <Client Secret>,
  cookieKey: <Random string>,
}
```

5.  Run the app

`npm run dev`

## Contribution

I'm thrilled that you want to add a feature, fix a bug or improve the code! Pull the code down, create a feature branch and get to it.

You can find some issues [here](https://github.com/drewminns/slackdeletron/issues) that need love!

All branches are run through CI for testing and require myself to merge it in!

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
* [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware)
* [Webpack Hot Middleware](https://github.com/webpack-contrib/webpack-hot-middleware)

Testing/Utility:

* [Enzyme](https://webpack.js.org/)
* [Jest](https://facebook.github.io/jest/)
* [Axios](https://github.com/axios/axios)
* [Husky](https://github.com/typicode/husky)
* [Travis CI](https://travis-ci.org/)

## Privacy

This tool does not share personal information with third parties other than Slack, nor do we store any information about your visit to this site other than to analyze and optimize your experience through the use of cookies.

You can turn off the use of cookies at anytime by changing your specific browser settings.

This privacy policy is subject to change without notice. If you have any questions feel free to contact me directly here: dminns@gmail.com.

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

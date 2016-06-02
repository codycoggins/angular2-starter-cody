# Nielsen Watson POC User Interface
Based on [Angular 2/TypeScript/Webpack Starter](https://github.com/rangle/rangle-starter/issues)

## Getting Started
To run the development environment, you need node.js version 4.x (I’m on 4.3)
Node installation also installs npm (I’m on version 2.15.1)
https://nodejs.org/en/ - “v4.4.5 LTS recommended for most users”

## SOURCE and ENVIRONMENT
Then, use git to clone the code to your local environment.

There are no ties to a specific editor/IDE, so use your favorite (I’m currently using Atom).

I sent invites for the git repository, hosted on IBM’s devops hub.jazz.net site.  Use your IBM accounts.

You can see the code repository in the browser here:
https://hub.jazz.net/project/codycoggins/watson-nielsen-ui/overview

The version of the URL to use with git is:
https://hub.jazz.net/git/codycoggins/watson-nielsen-ui

Then, things are easy because npm handles almost everything.  see the readme for detailed instructions.  The biggest ones are:
1.	npm install to download all the supporting libraries
2.	npm run dev to run in a development mode (most types of changes refresh without restarting browser
3.	npm start to run locally in production mode.  This mode requires stopping and running npm install again after each change/

## BLUEMIX DEPLOYMENT
I’m using the CloudFoundry command line tool “cf” to deploy to BlueMix.
http://docs.cloudfoundry.org/cf-cli/install-go-cli.html
There is a manifest file with settings so “cf push” is sufficient.
Communicate if you are going to push anything to BlueMix so we don’t step on each other.  We may want multiple instances.

## KEY TECHNOLOGIES

These include:
•	Angular 2 JS framework (TypeScript version)
•	WebPack for deployment
•	D3 library as a foundation for charts and visualizations
•	NVD3 for charts (bar charts, etc)
•	D3 with TopoJSON for maps
•	CSS whenever possible for styling and layout and light graphical tasks. Basscss class library used where applicable
•	Responsive approach to layout, meaning that the goal is to expand for large displays and shrink for narrow ones like mobile.

I’m using chrome browser for primary testing but this is not intended to be browser specific.

--------------------------

## npm scripts

> To see all available scripts:
```bash
$ npm run
```

### Dev
```bash
$ npm run dev
```

This runs a development mode server with live reload etc.

Open `http://localhost:3000` in your browser.

### Production

```bash
$ npm install
$ npm start
```

This runs a production-ready express server that serves up a bundled and
minified version of the client.

Open `http://localhost:3000` in your browser.

### Tests

(Tests not implemented for this Watson project yet.)

#### Single Run (with linting and coverage)
```bash
$ npm test
# or
$ npm t
```

#### Watch Files
```bash
$ npm run test:watch
```

#### Coverage
```bash
$ npm run cover
```

#### Connecting to remote APIs

Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

Edit [this file](server/proxy-config.js) to mount such APIs at a given path.

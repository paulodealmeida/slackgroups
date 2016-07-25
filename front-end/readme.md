# slackgroups front-end

# Requirements
  - NodeJS [instructions here](https://nodejs.org)

# Instructions
To build the front-end, you'll need to instal gulp and jspm globally on your node installation:

```bash
$ npm install -g gulp jspm
```

After that, you must install all the npm and jspm dependencies on the project:
(Run these commands inside the 'front-end' directory) 
```bash
$ npm install
$ jspm install
```

Then, if you just want to install the project to run alongside the back-end, just run:
```bash
$ gulp build
```

If you're a developer, you can run a standalone server with Browser-sync (requires chrome for now):
```bash
$ gulp serve
```
And it will open the web browser with browser-sync enabled.

For more info on gulp tasks you can check the project gulpfile.
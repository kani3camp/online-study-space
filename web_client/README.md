# online-study-room

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deploy

This project is deployed to Firebase Hosting.

First, login to Firebase and check the projects.

```bash
$ firebase login
```

```bash
$ firebase projects:list
```

Select the project you want to deploy to.

```bash
$ firebase use <project-id>
```

Then, deploy the project.

```bash
$ npm run generate
```

```bash
$ firebase deploy
```

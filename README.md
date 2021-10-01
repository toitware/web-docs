# General Documentation

This repository contains the general documentation of toit served at
[docs.toit.io](https://docs.toit.io).

# Setup for development

## yarn

`yarn` is used in web projects. To install `yarn`, follow the guide [here](https://yarnpkg.com/lang/en/docs/install/#debian-stable).

Note! You don't need to setup your `PATH` env.var. as described in the guide.

If you haven't installed `node` yet, install `node` from [nodejs.org](https://nodejs.org/en/). Add the node bin directory to your `PATH` in `$HOME/.profile`

**⚠️ In order to be able to install packages from this repository on your machine,
you need to [authenticate with the GitHub
registry](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages).**

Here's a short summary of what you need to do:

1. [Create a personal access token](https://github.com/settings/tokens/new)
   1. Name it appropriately (I suggest something like: `<your machine name> GitHub npm registry`) 
   2. Check `write:packages` and `read:packages`
2. Copy the token
3. Add the token to your `~/.npmrc`:  
   `echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc`

## Linting and imports in VS Code

- Add the ESLint extension to VS Code to get linting directly in the code. https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint.
- To get the right indentation, etc. directly in the code, and on save add the Prettier extension to VS Code. https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode. 
- To get VS Code to automatically fix linting errors (if possible) and organize imports on save, add the following to your settings.json file:

        "editor.codeActionsOnSave": [
          "source.fixAll.eslint",
          "source.organizeImports",
        ],

  Be careful with `source.organizeImports` however since that can drastically reduce performance in vscode.

## Useful developer tools

- [React developer tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Redux developer tools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?Itemid=1027)

## Available Scripts

**⚠️ Make sure to run `yarn install` before any of these commands!**

In the project directory, you can run:

### `yarn develop`

Runs the app in the development mode.  
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

If you want to be able to access the development server from other computers,
use this: `yarn develop -H 0.0.0.0`

### `yarn build`

Builds the app for production to the `build` folder.<br />

### `yarn serve`

The same as `yarn develop` but it serves the **built** site.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Writing docs

All the documentation pages are in `docs/`. The folder and file hierarchy is
also used in the navigation.

The documentation pages are written in `.mdx` which are
[markdown](https://www.markdownguide.org/basic-syntax/) files that can also
import react components.

## Components

There are multiple components to make the content more engaging:

### `<Note />`

```html
<Note type="info">

Content here can be markdown

</Note>
```

The type can be `info` or `warning` for now.

### `<Tabs />`

```html
<Tabs>
<Tab label="Tab 1">

Content of tab 1

</Tab>
<Tab label="Tab 2">

Content of tab 2

</Tab>
</Tabs>
```

## Frontmatter

An `.mdx` file can start with something called a "frontmatter". This is a
special section inside markdown files, that allows you to define metadata in
your pages:

```md
---
title: Getting Started
order: 300
---

# How to get started

Rest of the content comes here.
```

## Titles

You can specify the title that should be used in the navigation by setting the
title property in the frontmatter. If no title is provided, then the first
header of your markdown document is chosen. So if the first headline in your
document is `Getting Started` then this will also be the text used in the
navigation.

## Ordering pages

In the navigation menu, pages are sorted alphabetically according to their
title, but you can set another order by specifying `order: 4` in the
frontmatter.

The order can be any number, not just an integer. So if you have two pages, with
`order: 1` and `order: 2` and you want to create a new page that is in between,
you can use `order: 1.5`.

If no `order` is provided, the page will always come *after* other pages that
have the order specified.

## Hiding pages from the menu

Use `hide: true` in the frontmatter.

## Adding or removing an Overview page of a folder

By default, the `index.mdx` in a folder is automatically the Overview page. If
you don't want an overview page, make sure there is no other content than the
frontmatter in the this file.

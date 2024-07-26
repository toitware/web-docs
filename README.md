# General Documentation

This repository contains the general documentation of toit served at
[docs.toit.io](https://docs.toit.io).

# Setup for development

## yarn

`yarn` is used in web projects. To install `yarn`, follow the guide [here](https://yarnpkg.com/lang/en/docs/install/#debian-stable).

Note! You don't need to setup your `PATH` env.var. as described in the guide.

If you haven't installed `node` yet, install `node` from [nodejs.org](https://nodejs.org/en/). Add the node bin directory to your `PATH` in `$HOME/.profile`

## Linting and imports in VS Code

- Add the ESLint extension to VS Code to get linting directly in the code. https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint.
- To get the right indentation, etc. directly in the code, and on save add the Prettier extension to VS Code. https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode.
- To get VS Code to automatically fix linting errors (if possible) and organize imports on save, add the following to your settings.json file:

        "editor.codeActionsOnSave": [
          "source.fixAll.eslint",
          "source.organizeImports",
        ],

  Be careful with `source.organizeImports` however since that can drastically reduce performance in VS Code.

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

# Menu

The sidebar navigation on the left is defined in `docs/menu.yaml`.

You can look at `src/@types/index.d.ts` for all valid properties.

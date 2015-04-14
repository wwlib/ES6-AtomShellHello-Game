# ES6-AtomShellHello-Game

This is a simple Hello World using ES6 running in atom-shell

The game classes illustrate simple inheritance.

To get it running:

```
# Install atom-shell globally in your $PATH
npm install atom-shell -g

# Install ES6-AtomShellHello-Game
npm install

# Build
gulp

# Run
atom-shell .
```

## Gulp
The included Gulp script will transpile the ES6 using Babel into the dist folder. It will also generate sourcemaps to make debugging easier (using Chrome's dev tools).

## Atom-Shell
Docs: https://github.com/atom/atom-shell/tree/master/docs

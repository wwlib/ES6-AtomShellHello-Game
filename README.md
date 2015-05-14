# ES6-AtomShellHello-Game

This is a simple Hello World using ES6 running in Electron (formerly atom-shell).

The game classes illustrate simple ES6 inheritance and plymorphism. There is also a very basic WebAudio example that schedules a drum loop (4 bars of kick, hihat and snare).

To get it running:

```
# Install electron (formerly atom-shell) globally in your $PATH
npm install electron-prebuilt -g

# Install ES6-AtomShellHello-Game
npm install

# Build
gulp

# Run
electron .
```

## The Game
* LEFT and RIGHT arrows to move the ship
* SPACE - to shoot
* A - triggers a drum loop (WebAudio example) and warps the ship to the right edge of the canvas. 
* B - stops the drum loop

## Gulp
The included Gulp script will transpile the ES6 using Babel into the dist folder. It will also generate sourcemaps to make debugging easier (using Chrome's dev tools).

## Electron
https://github.com/atom/electron/tree/master/docs

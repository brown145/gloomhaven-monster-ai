# Useage

```
// requires yarn, node, ect...
yarn install
yarn dev
```

# TODO

x block out the layout
x app name
x scenrio picker
x hex details
x ai sequence: stepper & explainer
x color pallete
x app colors
x tile colors
x cut v1.0
x localstorage for scenrio and hex coord selections
x display focus and focus select text

- svg overlays for focus and path(s)
  -> √ move stroke/fill/width stuff out of CSS
  -> build animations and attatch to hex; call from react code
  ---> Misc: <StandeeLink> mouseover highlight effect
  ---> Misc: <HexLink> highlight effect
  ---> Preview: highlight M1
  ---> Focus: build main path
  ---> Focus: toggle for alt paths
  -> move hide/show logic from css?
- refactor render.js
- **_ target _**
- prevent rerenders for svg?
- include attack(s) (attack/range/targets) as part of scenrio
- display attack/targets/range info
- write unit tests for scenrios/ai
- gh-pages
- monster ai
  - find targets
  - select target
  - select attck hex
  - ...
- create more scenrios
- scenrio editor?
  - modify display attack/targets/range info
  - add flying
  - add/remove/move monsters and players
  - add/modify tile overlays
- scenrio share?

# Bugs

- use jss over index.css;
  - remove as much as possible;
  - should only be targeting body and such

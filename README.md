# Useage

```
// requires yarn, node, ect...
yarn install
yarn dev
```

# Development

## 🐛 Bugs

1. hexDetails is buggy
   1. mouseover hex causing entire app to re-render -> handler for hex details
   1. onmouseover/onmouseout race condidtion?

## V.Now

1. monster ai -> movement path
1. monster ai -> targets

## V.Next

1. Useability
   1. HTML \<title>
   1. create legend for hex tile colors, maker colors
   1. Revist app colors/gameColors
   1. render "paths" in sidebar not as arrays but in correct orientation
   1. next/previous arrows for scenrios
   1. scenerioStepper should have "next" option instead of "finish"
   1. Center SVG grid after evaluating width
   1. Alt Focus Paths: hide/show toggle
   1. gh-pages

## V.Future

1. Extend
   1. bring in more scenrios
   1. write unit tests for scenrios/ai
1. Editability
   1. Attack/Target/Movement make editable
   1. include attack(s) (attack/range/targets) as part of scenrio
   1. display attack/targets/range info
1. Pathfinding
   1. Difficult terrain
   1. Flying monsters
1. scenrio editor
   1. modify display attack/targets/range info
   1. modify monster attributes. ex: flying
   1. add/remove/move monsters and players
   1. add/modify tile overlays
   1. scenrio share link

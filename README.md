# app demo

Old school frontend app with mutable state

## develop

Start a local server

```
$ npm start
```

## some things this does

* client side routing
* use a virtual dom for the view via preact
* persistance with an api server

## structure

```
                        ┌───────────┐
                        │  Effects  │
                        └─▲───────┬─┘
                          │       │
                  ┌───────┴───────▼─────┐
         ┌───────▶│         Bus         │──────────┐
         │        └─────────────────────┘          │
         │                                         ▼
   ┌───────────┐        ┌───────────┐       ┌─────────────┐
   │    DOM    │◀───────│    view   │◀──────│    state    │
   └───────────┘        └───────────┘       └─────────────┘
```

### events

We are using a single event bus for everything. Complexity in event subscriptions is handled by namespacing event names with a tree structure. See [/src/EVENTS.js](/src/EVENTS.js)

```js
namespace({
    foo: {
        bar: ['a', 'b', 'c']
    }
})

// => {
//     foo: {
//         bar: {
//             a: 'foo.bar.a',
//             b: 'foo.bar.b',
//             c: 'foo.bar.c'
//         }
//    }
// }
```

### effects

Effects are any kind of IO (anything async). They are factored separately from synchronous code.


### routing

Routes are functions that get called once when the app first loads. They return another function that gets called when the route matches, and returns a view. This is where you subscribe to events and fetch data that the route needs.


## some dependency choices

**virtual dom**

I like preact because it is interoperable with react, which means you have a large ecosystem of ready made components available. Also the api is familiar to many other people who have experience with react. But any virtual dom will work with this structure.

**css**

This has sass because it works and it's what I know. Other css processes are good too. I like this because it has a minimum of configuration and build setup, and is a kind of traditional css pattern that should be familiar to everyone.


## some design choices

**The code that deals with the dom is completely decoupled from everything else**

You can take the state machine for this application and drop it into a different app and it will still work the same way. This means you can require your implementation code in node to run tests without using a headless browser. Note that to do this we are keeping jsx in separate files from any application logic.

--------------------------

**The only place where things happen is within the route functions**

The only imperative code is within the route functions that get called when the current url matches. The code in `data` is class definitions -- it doesn't do anything unless it is told to do something. The code in `view` is functions that take state and return virtual doms and subscribe to dom events. It doesn't do anything until it is called. The route functions are the only place where we start doing things.


---------------------------


**require, not import**

Using `require` statements lets us run code in node without any transpiling. 


## build

### javascript

Javascript is built with budo/browserify. During development we pass a flag to budo `--live` that makes it refresh the browser whenever you save a javascript file. I like to intentionally avoid "hot reloading" with javascript -- to me it is not worth the time it takes to configure. From another angle, we want our application to load quickly when we refresh the page, so instead of using a build tool hack, optimize the application so that it loads quickly. Now you have a quick feedback cycle during development, and also a quick application. 

### css 

The css changes are "hot reloaded" whenever you save a .scss file. This means the style is updated in the browser without having to refresh the page.


## tests

### git hooks

The dependency `husky` helps us by committing githook scripts to the repo so that they are shared by everyone who works on this. We're using a prepush hook in `test/githook/` that runs `npm test` whenever you push to master or dev branches.

### wslog

Since we are using a single event bus, this makes it easy to log every event and state change, then replay them through the application code. This is what's happening in `/test/counter-list/`. See [@nichoth/wslog](https://github.com/nichoth/wslog)







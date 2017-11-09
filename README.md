# app demo

Old school frontend app with mutable state


## some features

* client side routing
* use a virtual dom for the view via preact
* persistance with an api server


## some dependency choices

**virtual dom**

I like preact because it is interoperable with react, which means you have a large ecosystem of ready made components available. Also the api is familiar to many other people who have experience with react. But really, any virtual dom will work with this structure.

**css**

We're using sass because it works and it's stable and it's what I know. 


## some design choices

**The code that deals with the dom is completely decoupled from everything else**

You can take the state machine for this application and drop it into a different app and it will still work the same way. This means you can require your implementation code in node to run tests without using a headless browser. Note that to do this we are keeping jsx in separate files from any application logic.

--------------------------

**The only place where things happen is within the route functions**

The only impoerative code is within the route functions that get called when the current url matches. The code in `data` is class definitions -- it doesn't do anything unless it is told to do something. The code in `view` is functions that take state and return virtual doms and subscribe to dom events. It doesn't do anything until it is called. The route functions are the only place where we start doing things.


---------------------------


**`require`, not `import`**

Using `require` statements lets us easily run code in node, which doesn't have `import` currently, without any transpiling. Saving ourselves from a build step saves us development time that would have to be spent configuring another build process.


## build

### javascript

Javascript is built with budo/browserify. During development we pass a flag to budo `--live` that makes it refresh the browser whenever you save a javascript file. Don't go down the path of "hot reloading" with javascript -- it is not worth the time it takes to configure. If we look at it from another angle, we want our application to load quickly when we refresh the page, so instead of using a build tool hack, optimize the application so that it loads quickly. Now you have a quick feedback cycle during development, and also a quick application. 

### css

The css changes are "hot reloaded" whenever you save a .scss file. This means the style is updated in the browser without having to refresh the page.






# Reins!

#### Reins brings some convention over configuration to your Rails application's javascript.

[![wercker status](https://app.wercker.com/status/6ea31467d299403dc3bac9f6bd962d96/s/master "wercker status")](https://app.wercker.com/project/bykey/6ea31467d299403dc3bac9f6bd962d96)
[![Code Climate](https://codeclimate.com/github/weareredlight/reins/badges/gpa.svg)](https://codeclimate.com/github/weareredlight/reins)
[![Test Coverage](https://codeclimate.com/github/weareredlight/reins/badges/coverage.svg)](https://codeclimate.com/github/weareredlight/reins)
[![Gem Version](https://badge.fury.io/rb/reins.svg)](http://badge.fury.io/rb/reins)
![](http://ruby-gem-downloads-badge.herokuapp.com/reins)

### TL;DR
Reins provides an easy way to have separate jQuery ```$(document).ready``` and turbolinks ```page:load``` handlers for each of your controllers and actions. This will avoid weird initialization issues with conflicting selectors, and will help you know where JS initialization code for each page lives.

### Why reins?
Rails' convention over configuration approach to development is well known, however when it comes to javascript it is sorely lacking - every time you create a scaffold, resource, or controller, you get a new javascript file named after that controller, but that's it.
Then all your JS code is minified and aggregated into application.js by the assets pipeline with multiple ```$.ready``` callbacks that run on every page.

This means that you need to manually find a way to keep the global scope clean, avoid name collisions and define a common structure for your javascript code. If you're not very careful with your code's structure it's very easy to end up with a big unmaintainable mess as your application grows.


Reins is a ruby gem that automates the creation of jQuery ```$.ready``` and turbolinks ```page:load``` callbacks matching the structure of your rails controllers. It also creates a predefined structure for your javascript that helps you keep code for different controllers in separate namespaces.

Reins even works with javascript code that needs data from the server (which almost always ends up inside a script tag somewhere with erb thrown in the mix to include server-side data...).
You just have to define a special hash on the controller and this hash will be JSONified and passed to the reins javascript controller as a dictionary object. We'll take a look at this further down.

### How can I start using it?

Add reins to your Gemfile:

```ruby
gem 'reins'
```

Add reins.js to application.js:

```javascript
//= require reins
```

Add the reins script tag to your application layout, or any layout/view where you want reins to automatically call your javascript controllers.
I prefer just adding it to ```layouts/application.html.erb``` (and any other layouts I might have) right before closing the ```<body>``` tag:

```html
...
<body>
  ...
  <%= yield %>
  ...
  <%= reins_script_tag %>
</body>
...
```

### Ok, what now?

After reins in installed, every time you generate a new scaffold/resource/controller you will get a new javascript file inside app/assets/controllers/resource_name.js that will have a specific structure.

If the above steps went ok, now is the perfect time for an example:

Suppose we generate a HelloController and add the following code inside:

```ruby
class HelloController < ApplicationController

  def index
    @reins_params = {
      name: 'Lebowski'
    }
  end

end
```

Let's quickly create a controller and view by running:
```
$ rails g controller hello
$ touch app/views/hello/index.html.erb
```
Don't worry about the empty view for now, as it is irrelevant for reins to work :)
When you run the rails generator, reins will create a javascript file at
/app/assets/javascripts/controllers/cookies.js with some boilerplate code. After
changing a few lines it might look like this:

```javascript
/**
 * Anonymous self-running closure to avoid polluting the global namespace with
 * definitions that should be kept private.
 */
+function() {

  /**
   * Publicly accessible functions related to the hello rails
   * controller.
   * These can be called from anywhere like this:
   *   r.hello.function_name(arg1, arg2);
   *
   * You can declare your javascript controllers inside this namespace. They
   * should have the same name as your rails actions, but starting with an
   * underscore (so for the show action, the corresponding function would be
   * named _show).
   *
   * They will be called automatically by reins every time the corresponding
   * action renders an HTML view, or manually from a js.erb view by using the
   * call_reins_controller helper.
   */
  window.r.hello = {

    /**
     * Controller action corresponding to the #index rails action.
     *
     * This function is called on $.ready or page:load every time that the
     * "index" action renders an html view.
     */
    _index: function(params) {
      this.greet_user(params.name);
    },


    /**
     * You can also declare your own functions here.
     *
     * Call this one from anywhere like this:
     *   r.hello.greet_user('John Doe');
     * Or from inside this namespace with:
     *   this.greet_user('John Doe');
     */
    greet_user: function(name) {
      show_msg('Have a nice day ' + name + '!');
    }

  };


  ////////////////////////////////////////////////////////////////////////////
  // Anything below this but still inside the anonymous function is private //
  ////////////////////////////////////////////////////////////////////////////

  /**
   * This is a private function. It can be called by any function inside this
   * closure, including the controllers above, but it's invisible to the outside
   * world.
   *
   * It can be called from anywhere inside this closure like this:
   *   my_function2('Hi there!');
   * It cannot be called from anywhere else.
   */
  function show_msg(msg) {
    alert(msg);
  }

}();
```

Functions inside the window.r.hello namespace that start with an underscore and match the name of a rails action will be called automatically by reins when that action is rendered. You can declare a hash called @reins_params on the rails controller and it will be JSONified and passed to your javascript controller as an argument.
Most of the functionality is explained in the comments inside the javascript snippet above.

### More stuff

#### What if I'm rendering a js.erb view?

Reins will not be called automatically for these, as the whole idea of js.erb views is to give you fine tuned control.
However, to avoid repeating code, you can call your reins controller from js.erb views if you want. You just need to do this:
```
<%= call_reins_controller %>
```
This will call the matching controller and pass the @reins_params hash if it was defined in the controller.

#### Why do my controllers only get called on page:load when using turbolinks? I want page:change!

When using turbolinks, ```page:change``` can mean that we are rendering a page from the turbolinks cache with no server intervention at all. You shoud realize that calling the reins controller from this event will use the last params that were sent by the server, so it's probably not what you want.
To reiterate, this could mean that if you are going back to a page that was cached by turbolinks, the controller could be called with params from another controller/action, which is probably not what you want.

Just add this to your application.js:
```javascript
$(document).off('page:load').on('page:change', r.call_js_controller);
```
THIS WILL REMOVE any page:load event handlers that you may have attached to $(document), so be warned!




Reins is licenced under the MIT License. Please see the file MIT-LICENSE for details.

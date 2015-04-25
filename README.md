# Reins [![Code Climate](https://codeclimate.com/github/weareredlight/reins/badges/gpa.svg)](https://codeclimate.com/github/weareredlight/reins) [![wercker status](https://app.wercker.com/status/6ea31467d299403dc3bac9f6bd962d96/s/master "wercker status")](https://app.wercker.com/project/bykey/6ea31467d299403dc3bac9f6bd962d96) [![Gem Version](https://badge.fury.io/rb/reins.svg)](http://badge.fury.io/rb/reins) ![](http://ruby-gem-downloads-badge.herokuapp.com/reins)

Reins is a ruby gem that automates the creation of javascript controllers that match the structure of your rails controllers.
It enables you to keep javascript code out of your views by defining namespaced functions that get called automatically for each rails controller action that runs.

This even works in the case of javascript code that needs data from the server (which almost always ends up inside a <script> tag somewhere with <%%> tags...).
You just have to define the @reins_params hash on the controller and this hash will be JSONified and passed to the javascript controller as a dictionary object.

Reins can be used with or without turbolinks.


To start using it:

add to your gemfile:

  gem 'reins'


add to application.js:

  //= require reins


add to layouts/*.html.erb, right before </body> closing tag:

  <%= reins_script_tag %>



Reins is licenced under the MIT License. Please see the file MIT-LICENSE for more details.

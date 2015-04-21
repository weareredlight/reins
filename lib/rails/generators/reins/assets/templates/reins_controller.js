/**
 * Anonymous self-running function to keep us from polluting the global namespace
 * with definitions that should be kept private.
 */
+function() {

  /**
   * Publicly accessible functions related to <%= file_name %>.
   * These can be called from anywhere as r.<%= file_name %>.function_name(arg1, arg2);
   *
   * This scope includes the JS controller action functions corresponding to the
   * rails <%= file_name %> controller, so keep in mind that funcions
   * that match the names of the actions will be called automatically by rails.
   */
  window.r.<%= file_name %> = {

    /**
     * Controller action corresponding to the #new rails action.
     * This code is run everytime that the new.html format is rendered by rails.
     */
    // _new: function() {
    // },


    /**
     * Controller action corresponding to the #create rails action.
     * This code is run everytime that the create.html format is rendered by rails.
     */
    // _create: function(params) {
    // },


    /**
     * Controller action corresponding to the #index rails action.
     * This code is run everytime that the create.html format is rendered by rails.
     */
    // _index: function(params) {
    // },


    /**
     * Controller action corresponding to the #show rails action.
     * This code is run everytime that the create.html format is rendered by rails.
     */
    // _show: function(params) {
    // },


    /**
     * Controller action corresponding to the #update rails action.
     * This code is run everytime that the create.html format is rendered by rails.
     */
    // _update: function(params) {
    // },


    /**
     * Controller action corresponding to the #destroy rails action.
     * This code is run everytime that the create.html format is rendered by rails.
     */
    // _destroy: function(params) {
    // },


    /**
     * You can also declare your own functions here.
     *
     * Call this one from anywhere like this:
     *   r.<%= file_name %>.my_function('John Doe');
     */
    // my_function: function(name) {
    //   alert('Have a nice day ' + name + '!');
    // }

  };



  ////////////////////////////////////////////////////////////////////////////
  // Anything below this but still inside the anonymous function is private //
  ////////////////////////////////////////////////////////////////////////////

  /**
   * This is a private function. It can be called by any function inside this
   * closure, including the controllers above, but it's invisible to the outside
   * world.
   */
  // function my_function2() {
  //   // do stuff...
  // }



}();

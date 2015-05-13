/**
 * Anonymous self-running closure to avoid polluting the global namespace with
 * definitions that should be kept private.
 */
+function() {

  /**
   * Publicly accessible functions related to the <%= file_name %> rails
   * controller.
   * These can be called from anywhere like this:
   *   r.<%= file_name %>.function_name(arg1, arg2);
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
  window.r.<%= file_name %> = {

    /**
     * Controller action corresponding to the #new rails action.
     *
     * This function is called on $.ready or page:load every time that the
     * "new" action renders an html view.
     */
    // _new: function() {
    // },


    /**
     * Controller action corresponding to the #show rails action.
     *
     * This function is called on $.ready or page:load every time that the
     * "show" action renders an html view.
     */
    // _show: function(params) {
    //   this.my_function(params.name);
    // },


    /**
     * You can also declare your own functions here.
     *
     * Call this one from anywhere like this:
     *   r.<%= file_name %>.my_function('John Doe');
     * Or from inside this namespace with:
     *   this.my_function('John Doe');
     */
    // my_function: function(name) {
    //   my_function2('Have a nice day ' + name + '!');
    // }

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
  // function my_function2(msg) {
  //   alert(msg);
  // }



}();

/**
 * Implementation of JavaScript controllers that match the rails controllers
 * and get called automatically upon rendering of html.erb views.
 *
 * "r" is the main namespace where all JS controllers related code will be
 * nested in.
 */
var r = {

  /**
   * Varible where current rails controller name is stored for easy access.
   */
  controller: '',


  /**
   * Varible where current rails action name is stored for easy access.
   */
  action: '',


  /**
   * Varible where the @reins_params that were set on the server controller get
   * stored.
   */
  params: null,


  /**
   * Calls the current JS controller that corresponds to the rendered rails
   * controller#action (if it exists).
   */
  call_js_controller: function() {
    var reins_controller = r.controller.replace(/\//gi, '_');
    if (r[reins_controller] != null) {
      var func = r[reins_controller]['_' + r.action];
      if (typeof func == 'function')
        func.call(r[reins_controller], r.params);
    }
  }

};



/**
 * When page is ready, run javascript controller#action that corresponds to
 * current rails controller#action.
 */
$(document).on('page:load ready', r.call_js_controller);
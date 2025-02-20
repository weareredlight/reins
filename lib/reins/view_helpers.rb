module Reins
  module ViewHelpers

    # Helper that creates a <script> tag insertable into HTML templates to set the
    # reins controller and action to the current rails controller and action name.
    #
    # Returns:: The javascript code that will perform the necessary actions.
    def reins_script_tag(**html_attributes)
      attrs = html_attributes.map { |k, v| %(#{k}="#{v}") }.join(' ')

      "<script #{attrs}>#{ update_reins_controller }</script>".html_safe
    end


    # Helper that emits JS code to set the reins controller and action to the
    # current rails controller and action name.
    #
    # Returns:: The javascript code that will perform the necessary actions.
    def update_reins_controller
      "r.controller = '#{ params[:controller]   }';
       r.action     = '#{ params[:action]       }';
       r.params     =  #{ @reins_params.to_json };".html_safe
    end


    # Helper for use in js.erb templates to automatically call the reins
    # controller and action that matches the current rails controller and action
    # name.
    #
    # Returns:: The javascript code that will perform the necessary actions.
    def call_reins_controller
      "#{ update_reins_controller }r.call_js_controller();".html_safe
    end

  end
end

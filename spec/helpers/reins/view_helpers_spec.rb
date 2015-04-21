#require File.dirname(__FILE__) + '/../spec_helper'
require 'rails_helper'
require 'execjs'

describe Reins::ViewHelpers do

  before {
    helper.params[:controller] = 'test_controller'
    helper.params[:action]     = 'test_action'
    @reins_params              = { test_param: 'test_value' }
  }


  it '#reins_script_tag returns a <script> tag that updates reins variables on the browser' do
    tag = helper.reins_script_tag
    expect(tag).to start_with '<script>'
    expect(tag).to end_with   '</script>'
    expect(tag).to include helper.update_reins_controller
  end

  it '#update_reins_controller emits js code to update reins variables on the browser' do
    js = "r = {}
          #{ helper.update_reins_controller }
          return r;"
    ExecJS.exec js
  end

  it '#call_reins_controller emits js code that updates reins variables and calls the controller' do
    js = ("
          document = null; var $ = function(){ return {on: function(){}} };
          #{ File.read(File.dirname(__FILE__) + '/../../../vendor/assets/javascripts/reins.js') }
          r.test_controller = {
            _test_action: function(params) {
              test_result = params.test_param;
            }
          };
          #{ helper.call_reins_controller }
          return test_result;")

    expect(ExecJS.exec js).to eq('test_value')
  end

end

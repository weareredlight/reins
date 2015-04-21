require 'reins/view_helpers'

module Reins
  class Railtie < Rails::Railtie
    config.app_generators.javascript_engine :reins

    initializer 'reins.view_helpers' do
      ActionView::Base.send :include, ViewHelpers
    end
  end
end

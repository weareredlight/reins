require 'rails/generators/named_base'

module Reins
  module Generators
    class AssetsGenerator < ::Rails::Generators::NamedBase

      source_root File.expand_path("../templates", __FILE__)

      def create_reins_controller
        template(
          'reins_controller.js',
          File.join('app/assets/javascripts/controllers', class_path, "#{ file_name }.js")
        )
      end

    end
  end
end

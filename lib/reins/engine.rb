module Reins
  class Engine < ::Rails::Engine
    initializer 'reins.load_static_assets' do |app|
      app.middleware.use ::ActionDispatch::Static, "#{root}/vendor"
    end
  end
end

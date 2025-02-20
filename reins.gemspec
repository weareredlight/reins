$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'reins/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'reins'
  s.version     = Reins::VERSION
  s.authors     = ['Tony Goncalves']
  s.email       = ['tony@redlight.dev']
  s.homepage    = 'http://github.com/weareredlight/reins'
  s.summary     = 'Reins! Rein in your javascript'
  s.description = 'Reins is a ruby gem that automates the creation of javascript controllers that match the structure of your rails controllers. This includes passing custom data to the JS controllers from the server.'
  s.license     = 'MIT'

  s.files = Dir['{lib,vendor}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '>= 4.1'

  s.add_development_dependency 'rspec-rails', '~> 3.0'
  s.add_development_dependency 'execjs',      '~> 2.5'
end

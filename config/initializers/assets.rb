# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( public.css public.js
                                                  public/agrofor/theme.css public/fuelfor/theme.css public/woodfor/theme.css
                                                  fill.css fill.js
                                                  companies/woodfor.css companies/woodfor.js companies/agrofor.css companies/agrofor.js companies/fuelfor.css companies/fuelfor.js
                                                  mailers/agrofor.css mailers/fuelfor.css mailers/woodfor.css mailers.css
                                                  metrics/agrofor.js metrics/woodfor.js metrics/fuelfor.js
                                                  oxymoron/i18n/angular-locale_ru.js
                                                )
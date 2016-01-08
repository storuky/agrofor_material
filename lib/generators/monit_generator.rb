class MonitGenerator < Rails::Generators::Base
  source_root Rails.root.join('config', 'monit')

  argument :current, type: :string, default: Rails.root
  argument :environment, type: :string, default: Rails.env.to_s
  argument :app, type: :string, default: Rails.application.class.parent_name.to_s

  def generate_sphinx
    generate_task 'th'
  end

  def generate_delayed_job
    generate_task 'dj'
  end 



private
  def generate_task mod
    @environment = environment
    @taskname = "#{app}_#{@environment}_#{mod}"
    @current = current

    template "#{mod}.conf.erb", Rails.root.join("#{@taskname}.conf")

    create_file Rails.root.join("monit_#{@taskname}.sh"), <<-FILE
#!/bin/sh 

ln -sf #{Rails.root.join("#{@taskname}.conf")} /etc/monit/conf.d
monit reload
monit restart #{@taskname}

FILE
  end

end
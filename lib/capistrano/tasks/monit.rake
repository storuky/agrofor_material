namespace :monit do


  def remote_file_exists?(full_path)
    'true' ==  capture("if [ -e \"#{full_path}\" ]; then echo \"true\"; fi").strip
  end

  desc "Создать файл конфигурации monit"
  task :configure do
    on roles(:app) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          current = fetch(:current_path) || current_path
          env = fetch(:rails_env) || rails_env
          app = fetch(:application) || application
          result = capture(:bundle, :exec, :rails, :g, :monit, current, env, app, '--force')
          files = result.strip.split("\n").map{|line| line.strip.split(" ").last}

          files.each do |file|
            file = "#{current}/#{file}"

            if remote_file_exists?(file)
              shared = fetch(:shared_path) || shared_path
              execute :cp, '-f', file, "#{shared}/config/"
            else
              error result
              exit 1
            end
          end
        end
      end
    end
  end

 
end

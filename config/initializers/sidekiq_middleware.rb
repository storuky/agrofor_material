module Sidekiq::Middleware::DefaultUrlOptions
  class Client
    def call(worker_class, msg, queue, redis_pool)
      msg['default_url_options'] = ActionMailer::Base.default_url_options
      yield
    end
  end

  class Server
    def call(worker, msg, queue)
      if default_url_options = msg['default_url_options']
        ActionMailer::Base.default_url_options = default_url_options.symbolize_keys
        yield
      else
        yield
      end
    end
  end
end

Sidekiq.configure_client do |config|
  config.client_middleware do |chain|
    chain.add Sidekiq::Middleware::DefaultUrlOptions::Client
  end
end

Sidekiq.configure_server do |config|
  config.client_middleware do |chain|
    chain.add Sidekiq::Middleware::DefaultUrlOptions::Client
  end
  config.server_middleware do |chain|
    chain.add Sidekiq::Middleware::DefaultUrlOptions::Server
  end
end
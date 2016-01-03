class Documentable < ActiveRecord::Base
  belongs_to :document
  belongs_to :documentable, polymorphic: true
end

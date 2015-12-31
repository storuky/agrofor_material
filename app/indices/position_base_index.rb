config =  {
            :with => :active_record,
            :delta => true
          }

ThinkingSphinx::Index.define :position_base, config do
  indexes index_field
  where "type = 'Position'"
end
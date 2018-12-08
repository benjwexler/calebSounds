class TemporaryCart < ApplicationRecord
    def initialize(session)
        @session = session
      end

      def add_item
        # ... other item adding logic
        @session[:temporary_cart][:num_items] += 1
      end
end
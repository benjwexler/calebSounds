class Transaction < ApplicationRecord
    def initialize(session)
        @session = session
      end

      def add_item
        # ... other item adding logic
        
        @session[:temporary_cart] = 1
        p @session[:temporary_cart]
        p @session[:cookies]
        p @session.values
      end
end

class Sound < ApplicationRecord
    has_one_attached :soundfile
    has_many :sound_and_kits
    has_many :kits, through: :sound_and_kits

    # def initialize(session)
    #     @session = session
    #   end

    #   def add_item
    #     # ... other item adding logic
    #     @session[:temporary_cart][:num_items] += 1
    #   end
end

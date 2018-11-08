class Kit < ApplicationRecord
    has_many :sounds, through: :sound_and_kits
end

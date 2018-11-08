class Kit < ApplicationRecord
    has_many :sound_and_kits
    has_many :sounds, through: :sound_and_kits
end

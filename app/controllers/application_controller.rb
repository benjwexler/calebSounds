class ApplicationController < ActionController::Base

    def not_admin
        if  !current_user || current_user.isAdmin != true
            redirect_to root_url
        end 
    end 
end

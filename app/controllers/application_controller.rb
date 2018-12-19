class ApplicationController < ActionController::Base

    # def after_sign_in_path_for(users)
    #     'https://www.espn.com'
    #   end
    

    def not_admin
        if  !current_user || current_user.isAdmin != true
            redirect_to root_url
        end 
    end 
end

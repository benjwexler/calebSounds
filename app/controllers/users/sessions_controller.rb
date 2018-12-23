# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  respond_to :json

 

  # def new
  #   self.resource = resource_class.new(sign_in_params)
  #   clean_up_passwords(resource)
  #   # yield resource if block_given?
  #   p render :json => {
  #     'csrfParam' => request_forgery_protection_token,
  #     'csrfToken' => form_authenticity_token
  # }
  # end

  # GET /resource/sign_in
  # def new
  #   redirect_to root_path
  #   # redirect_to :root, id: 3, something: 'else'
  #   # super

   
  #     # render 'redirect_user.js.erb'
    
    
  #   p " hira"
  # end

  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    p render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token
    }
  end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  def destroy # Assumes only JSON requests
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    p render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token
    }
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end

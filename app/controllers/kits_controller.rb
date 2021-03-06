class KitsController < ApplicationController
  before_action :set_kit, only: [:show, :edit, :update, :destroy, :loadSounds]
  before_action :authenticate_user!, only: [:new, :edit, :update, :destroy ]
  before_action :not_admin, except: [:design, :loadSounds, :redirect_user]
  # skip_before_action :verify_authenticity_token
  # skip_before_action :set_kit, :only => [:bestsellers]

  # GET /kits
  # GET /kits.jsons
  def index
    @kits = Kit.all
    p "Hi"

    p params 
  end

  def redirect_user
    # redirect_to root_path

    # redirect_to root_path(:message => "wrongInfo")
    # redirect_to root_path(request.parameters)
    

    # render "redirect_user.js.erb"
    
  end 

  
  # Root Path
  def design

    p  "hoohah"
    p params[:message] 

    @wrong_info = false

    if params[:message] == "wrongInfo" 
      @wrong_info = true
    end 

    p performed?  
    
    
    

  

  
    p "hoohah"

   

      @kits = Kit.all
      if Sound.first
    @soundfile = Sound.first.soundfile
      end 
    @sounds = Sound.all.limit(16)
    @tracks = Track.order(release_date: :desc).limit(4)

    if(session[:temporary_cart])
      @items_in_cart = session[:temporary_cart].keys.length
    else
      @items_in_cart = 0 
    end
  
  
    
  
  end

  def bestsellers
    p "BESTSELLER"

    @kits = Kit.all.limit(2)
  end

  def getRequest

    render text: 'Thanks for sending a GET request with cURL!'

  end 

  # GET /kits/1
  # GET /kits/1.json
  def show

    @kit_id = @kit.id
    
    p @sounds = Kit.find(@kit_id).sounds
  
  end

  def loadSounds
    @kit_id = @kit.id
    @cover_art = @kit.cover_art
    @price = @kit.price
    
    p @sounds = Kit.find(@kit_id).sounds
    respond_to do |format|
      format.js {render :loadSounds}
    end 
  end

  

  # GET /kits/new
  def new
    @kit = Kit.new
    @kit.sounds.build
    
  end

  # GET /kits/1/edit
  def edit
  end

  # POST /kits
  # POST /kits.json
  def create
    p params 
    p soundfiles = params["kit"]["folder"]
    p  params["kit"]["name"]

   
    # @kit = Kit.new(:name => params["kit"]["name"], :description => params["kit"]["description"], :price => params["kit"]["price"], :quantity_sold => 0, :cover_art => params["kit"]["cover_art"])

    sound_attributes_array = []
    
    

#     params = { member: {
#   name: 'joe', posts_attributes: [
#     { title: 'Kari, the awesome Ruby documentation browser!' },
#     { title: 'The egalitarian assumption of the modern citizen' },
#     { title: '', _destroy: '1' } # this will be ignored
#   ]
# }}

# member = Member.create(params[:member])
    p @kit 

    i = 1

  

    soundfiles.each do |soundfile|
      # p soundfile

     

     soundfile_to_build = {
       name: params["kit"]["name"], 
      type_of_sound: params["kit"]["name"],
      description: params["kit"]["name"],
      key: params["kit"]["name"],
      tempo: i,
      soundfile: soundfile
    }

    # @new_sound = Sound.new(soundfile_to_build)

    sound_attributes_array.push(soundfile_to_build)

    # if @new_sound.save
      
    # end 

        

    # p @sound = Sound.new(:name => params["kit"]["name"], :type_of_sound => params["kit"]["name"] , :description => params["kit"]["name"], :key => params["kit"]["name"] , :tempo => i, :soundfile => soundfile)

  

    
      # @sound.save

    

      
      # i+=1
      # if Sound.last
      #   @last_sound = Sound.last.id
      # else 
      #   @last_sound = 1
      # end 
      #   @soundAndKit = SoundAndKit.new(:kit_id => @last_kit, :sound_id => @last_sound)
      #   @soundAndKit.save 
    end 

    new_kit_params = {
      kit: {
        name: params["kit"]["name"], 
        description: params["kit"]["description"], 
        price: params["kit"]["price"], 
        quantity_sold: 0,
        cover_art: params["kit"]["cover_art"],
        # sound_and_kits_attributes: [],
        sounds_attributes: sound_attributes_array
        # sounds_attributes: [{}]
        
      }
    }
    # p @kit = Kit.new()
    # @kit.sounds.build

    p sound_attributes_array
    p "sssth"
    p @kit = Kit.new(new_kit_params[:kit])

    p@kit.sounds
    

    

    # @kit.save

   

    respond_to do |format|
      if @kit.save
        format.html { redirect_to @kit, notice: 'Kit was successfully created.' }
        format.json { render :show, status: :created, location: @kit }
      else
        format.html { render :new }
        format.json { render json: @kit.errors, status: :unprocessable_entity }
      end
    end

   
    # if Kit.last
    #   p @last_kit = Kit.last.id
    # else 
    #   @last_kit = 1
    # end 

    

    

   p "hizzah"

  end

  # PATCH/PUT /kits/1
  # PATCH/PUT /kits/1.json
  def update
    respond_to do |format|
      if @kit.update(kit_params)
        format.html { redirect_to @kit, notice: 'Kit was successfully updated.' }
        format.json { render :show, status: :ok, location: @kit }
      else
        format.html { render :edit }
        format.json { render json: @kit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kits/1
  # DELETE /kits/1.json
  def destroy
    @kit.destroy
    respond_to do |format|
      format.html { redirect_to kits_url, notice: 'Kit was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_kit
   
        @kit = Kit.find(params[:id])


    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def kit_params
      
      params.require(:kit).permit(:name, :description, :price, :quantity_sold, sound_and_kits_attributes: [:sound_id, :kit_id], sounds_attributes: [:name, :type_of_sound, :description, :key, :tempo, :soundfile])
      
    end
end

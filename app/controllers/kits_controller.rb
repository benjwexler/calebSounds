class KitsController < ApplicationController
  before_action :set_kit, only: [:show, :edit, :update, :destroy, :loadSounds]
  before_action :authenticate_user!, only: [:new, :show, :edit, :update, :destroy, :loadSounds]
  # skip_before_action :set_kit, :only => [:bestsellers]

  # GET /kits
  # GET /kits.json
  def index
    @kits = Kit.all
    p "Hi"

    p params 
  end

  def design

      @kits = Kit.all
    @soundfile = Sound.first.soundfile
    @sounds = Sound.all.limit(16)
    @tracks = Track.order(release_date: :desc).limit(4)
    

    
  
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
    @kit = Kit.new(:name => params["kit"]["name"], :description => params["kit"]["description"], :price => params["kit"]["price"], :quantity_sold => 0, :cover_art => params["kit"]["cover_art"])

    respond_to do |format|
      if @kit.save
        format.html { redirect_to @kit, notice: 'Kit was successfully created.' }
        format.json { render :show, status: :created, location: @kit }
      else
        format.html { render :new }
        format.json { render json: @kit.errors, status: :unprocessable_entity }
      end
    end

    i = 1
    if Kit.last
      p @last_kit = Kit.last.id
    else 
      @last_kit = 1
    end 

    soundfiles.each do |soundfile|
      p soundfile
      @sound = Sound.new(:name => params["kit"]["name"], :type_of_sound => params["kit"]["name"] , :description => params["kit"]["name"], :key => params["kit"]["name"] , :tempo => i, :soundfile => soundfile)
      @sound.save
      i+=1
      if Sound.last
        @last_sound = Sound.last.id
      else 
        @last_sound = 1
      end 
        @soundAndKit = SoundAndKit.new(:kit_id => @last_kit, :sound_id => @last_sound)
        @soundAndKit.save 
    end 
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

class SoundsController < ApplicationController
  before_action :set_sound, only: [:show, :edit, :update, :destroy]

  # GET /sounds
  # GET /sounds.json
  def index
    @sounds = Sound.all

   
  end

  # GET /sounds/1
  # GET /sounds/1.json
  def show
  end

  # GET /sounds/new
  def new
    @sound = Sound.new
 
    @kits = Kit.all
  
  end

  # GET /sounds/1/edit
  def edit
  end

  # POST /sounds
  # POST /sounds.json
  def create
    @sound = Sound.new(sound_params)
    # @sound = Sound.new(:name => params["sound"]["name"], :type_of_sound => params["sound"]["type_of_sound"], :description => params["sound"]["description"] , :key => params["sound"]["key"], :tempo => params["sound"]["tempo"], :soundfile => params["sound"]["soundfile"])
    p params["sound"]
    p "_______dfggffsgsffffsf"
    #Accesses which kit the sound belongs to
    p @whichKit = params["sound"]["kit"]
   
    p "f dfinfdidffd fo  fdfd___________"

    # @kit = Kit.new

    respond_to do |format|
      if @sound.save
        p new_sound = Sound.last.id
        @sound_and_kit = SoundAndKit.new(:kit_id => @whichKit, :sound_id => new_sound)
        @sound_and_kit.save
        format.html { redirect_to @sound, notice: 'Sound was successfully created.' }
        format.json { render :show, status: :created, location: @sound }

      else
        format.html { render :new }
        format.json { render json: @sound.errors, status: :unprocessable_entity }
      end
    end
  end



  # PATCH/PUT /sounds/1
  # PATCH/PUT /sounds/1.json
  def update
    respond_to do |format|
      if @sound.update(sound_params)
        format.html { redirect_to @sound, notice: 'Sound was successfully updated.' }
        format.json { render :show, status: :ok, location: @sound }
      else
        format.html { render :edit }
        format.json { render json: @sound.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sounds/1
  # DELETE /sounds/1.json
  def destroy
    @sound.destroy
    respond_to do |format|
      format.html { redirect_to sounds_url, notice: 'Sound was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sound
      @sound = Sound.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sound_params
      params.require(:sound).permit(:name, :type_of_sound, :description, :key, :tempo, :soundfile)
    end
end

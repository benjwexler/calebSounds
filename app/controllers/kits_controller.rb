class KitsController < ApplicationController
  before_action :set_kit, only: [:show, :edit, :update, :destroy]
  # skip_before_action :set_kit, :only => [:bestsellers]

  # GET /kits
  # GET /kits.json
  def index
    @kits = Kit.all
  end

  def bestsellers
    p "BESTSELLER"

    @kits = Kit.all.limit(2)
  end

  # GET /kits/1
  # GET /kits/1.json
  def show

    @kit_id = @kit.id
    
    @sounds = Kit.find(@kit_id).sounds
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
    p params["kit"]["name"]
    # p params["name"]
    # p params["type_of_sound"]

    p "_________________________________"
    @kit = Kit.new(kit_params)
    # :name, :description, :price, :quantity_sold
    # @kit = Kit.new(:name => params["name"], :description => params["description"], :price => params["price"], :quantity_sold => 0)
    # p kit_params["name"]
    # p kit_params
    p Kit.last.id
    p Sound.last.id
    p "_________________________________"

    respond_to do |format|
      if @kit.save
        p Kit.last.id
        p Sound.last.id
        # SoundAndKit.new(:kit_id => Kit.last.id, :sound_id => Sound.last.id)
        format.html { redirect_to @kit, notice: 'Kit was successfully created.' }
        format.json { render :show, status: :created, location: @kit }
      else
        format.html { render :new }
        format.json { render json: @kit.errors, status: :unprocessable_entity }
      end
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

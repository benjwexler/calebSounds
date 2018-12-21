class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:show, :edit, :update, :destroy]

  # GET /transactions
  # GET /transactions.json
  def index
    @transactions = Transaction.all
    Transaction.new(session).add_item
    p @session
    
  end

  # GET /transactions/1
  # GET /transactions/1.json
  def show
  end

  def addToCart
   
    # Transaction.new(session).add_item
    if session[:temporary_cart] == nil
      p "???"
      session[:temporary_cart] = {}
    end 

    p kit_id = params[:kitId]
    # kit_id = "Kit#{kit_id}"

    if session[:temporary_cart][kit_id] == nil
      session[:temporary_cart][kit_id] = {
        quantity: 1,
        pic: params[:coverArtPic],
        timestamp: Time.now.to_i,
        price: params[:price],
        name: params[:name]
      }
      p "wtf"
    else 
      p new_amount = session[:temporary_cart][kit_id]["quantity"]
      new_amount +=1
      p "supposed to add"
      p session[:temporary_cart][kit_id][:quantity] = new_amount
    end 
    p session[:temporary_cart]
    request.session[:temporary_cart].each {|key, value| puts key.to_s + " --> " + value.to_s }

    respond_to do |format|
      format.json do
        render json: session[:temporary_cart].to_json
      end
    end

    # render json: session[:temporary_cart][kit_id]
    # render json: {name: 15}

  end 

  def subtractFromCart
    p "subtracted"
    p kit_id = params[:kitId]
    p new_amount = session[:temporary_cart][kit_id]["quantity"]
      if new_amount < 2
        session[:temporary_cart].delete(kit_id)
      else
      new_amount -=1
      p session[:temporary_cart][kit_id][:quantity] = new_amount
      end

      respond_to do |format|
        format.json do
          render json: session[:temporary_cart].to_json
        end
      end

      
  
  end 

  def deleteFromCart
    p kit_id = params[:kitId]
    # p session[:temporary_cart]
    session[:temporary_cart].delete(kit_id)
    # session[:temporary_cart][kit_id][:quantity] = 7
    p request.session[:temporary_cart].each {|key, value| puts key.to_s + " --> " + value.to_s }
    
    respond_to do |format|
      format.json do
        render json: session[:temporary_cart].to_json
      end
    end 

  end 

  def clearCart
    session[:temporary_cart] = {}

    respond_to do |format|
      format.json do
        render json: session[:temporary_cart].to_json
      end
    end 
    
  end

  def currentCart
    require 'json'

    p "currentCart"
    p session[:temporary_cart]

    current_cart = session[:temporary_cart]["Kit3"]

    render json: current_cart
    # p current_cart.instance_of?
    # respond_to do |format|
    #   format.js {render :loadSounds}
    # end 
  
  end 

  # GET /transactions/new
  def new
    @transaction = Transaction.new
  end

  # GET /transactions/1/edit
  def edit
  end

  # POST /transactions
  # POST /transactions.json
  def create
    @transaction = Transaction.new(transaction_params)

    respond_to do |format|
      if @transaction.save
        format.html { redirect_to @transaction, notice: 'Transaction was successfully created.' }
        format.json { render :show, status: :created, location: @transaction }
      else
        format.html { render :new }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /transactions/1
  # PATCH/PUT /transactions/1.json
  def update
    respond_to do |format|
      if @transaction.update(transaction_params)
        format.html { redirect_to @transaction, notice: 'Transaction was successfully updated.' }
        format.json { render :show, status: :ok, location: @transaction }
      else
        format.html { render :edit }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /transactions/1
  # DELETE /transactions/1.json
  def destroy
    @transaction.destroy
    respond_to do |format|
      format.html { redirect_to transactions_url, notice: 'Transaction was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_transaction
      @transaction = Transaction.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def transaction_params
      params.require(:transaction).permit(:user_id, :kit_id, :price)
    end
end

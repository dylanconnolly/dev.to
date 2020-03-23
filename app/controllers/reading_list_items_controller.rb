class ReadingListItemsController < ApplicationController
  def index
    # sets variable to true
    @reading_list_items_index = true
    # invokes helper method set_view and sets an attribute for the @view instance variable
    set_view
    # invokes helper method to send information to Algolia and be returned a key
    # algolia key is stored in instance variable @secured_algolia_key
    generate_algolia_search_key
  end

  def update
    @reaction = Reaction.find(params[:id])
    not_authorized if @reaction.user_id != session_current_user_id

    @reaction.status = params[:current_status] == "archived" ? "valid" : "archived"
    @reaction.save
    head :ok
  end

  private

  def generate_algolia_search_key
    # creates a variable that sets a hash with a key filters pointing to a string containing the current user's id
    params = { filters: "viewable_by:#{session_current_user_id}" }
    # calls Algolia gem specific method to send our registered Algolia search key and the user_id to Algolia
    @secured_algolia_key = Algolia.generate_secured_api_key(
      ApplicationConfig["ALGOLIASEARCH_SEARCH_ONLY_KEY"], params
    )
  end

  def set_view
    # if there is a params key pointing to 'archive' @view will be equal to 'archived', else it will equal valid
    @view = if params[:view] == "archive"
              "archived"
            else
              "valid"
            end
  end
end

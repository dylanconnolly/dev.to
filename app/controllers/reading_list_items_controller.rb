class ReadingListItemsController < ApplicationController
  def index
    # not sure what the below line means yet
    @reading_list_items_index = true
    # calls on set_view helper method
    set_view
    # calls on generate_algolia_search_key method
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
    # Algolia API includes built-in filters params. Here, we're passing in the id of the current user so that the secure API key is only viewable by the current user.
    params = { filters: "viewable_by:#{session_current_user_id}" }
    # This line is setting a secured_algolia_key instance variable equal to the key that's returned when we call on the generate_secured_api_key method in the AlgoliaSearch service
    @secured_algolia_key = Algolia.generate_secured_api_key(
      # When we generate an algolia search key to the AlgoliaSearch service, we pass it the ALGOLIA_SEARCH_ONLY_KEY that Algolia gave us and have it return a key based on the params we pass it – in this case, params that make it only viewable for the current user
      ApplicationConfig["ALGOLIASEARCH_SEARCH_ONLY_KEY"], params
    )
  end

  def set_view
    # this method sets the view if params contains the type of view. If params[:view] is equal to a string of archive, it displays "archived"
    @view = if params[:view] == "archive"
              "archived"
            else
              # if params[:view] does not equal a string of archive, it displays a string of "valid"
              "valid"
            end
  end
end

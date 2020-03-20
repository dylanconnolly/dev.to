class Collection < ApplicationRecord
  # a collection has many articles
  has_many :articles
  # a collection belongs to a user
  belongs_to :user
  # a collection can belong to an organization (optional)
  belongs_to :organization, optional: true

  # a collection must have a user_id
  validates :user_id, presence: true
  # a collection must have a unique slug (for each user? limits uniqueness check to the scope of a user)
  validates :slug, presence: true, uniqueness: { scope: :user_id }

  # callbacks are hooks into the life cycle of an Active Record object that allow you to trigger logic before or after an alteration of the object state
  # the after_touch callback is triggered after an article is touched (see touch_articles method)
  after_touch :touch_articles

  # this is a class method to find or create a a collection based on the slug and user we pass it
  def self.find_series(slug, user)
    Collection.find_or_create_by(slug: slug, user: user)
  end

  # this method updates one instance of a collection (all the articles within one collection) based on updated_at time – in this case, this is triggered by someone updating a collection at Time.now (only the collection that was clicked to update at the current time)
  def touch_articles
    # saves the record with the updated_at/on attributes set to the current time or the time specified, which in this case is the current time
    articles.update_all(updated_at: Time.zone.now)
  end
end

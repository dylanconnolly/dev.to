# this must be really old ... docs place this at rails 3.2~4.0
# It’s worth noting that Observers have been removed from Rails core as of 4.0. Callback support remains. from quora
class ArticleObserver < ApplicationObserver
  def after_save(article)
    return if Rails.env.development?

    ping_new_article(article)
  rescue StandardError => e
    Rails.logger.error(e)
  end

  def ping_new_article(article)
    return unless article.published && article.published_at > 30.seconds.ago

    # this must make a message ?? 
    SlackBotPingWorker.perform_async(
      message: "New Article Published: #{article.title}\nhttps://dev.to#{article.path}",
      channel: "activity",
      username: "article_bot",
      icon_emoji: ":writing_hand:",
    )
  end
end

module ApplicationHelper
  def markdown(text)
    render_options = {
      filter_html: false
    }
    renderer = Redcarpet::Render::HTML.new(render_options)

    extensions = {
      fenced_code_blocks: true
    }
    Redcarpet::Markdown.new(renderer, extensions).render(text).html_safe
  end

  def script_tag
    if Rails.env.production? 
      return 'build'
    else
      return 'main'
    end
  end

  def user_authorized?
    logged_in? && current_user.admin
  end

  end

class Post < ActiveRecord::Base
  validates :title, :presence => true
  validates :body, :presence => true
  validates :slug, :presence => true, format: {
                                        with: /\A[a-zA-Z\-\d]+\z/,
                                        message: 'does not allow special characters'}

  belongs_to :user
  has_many :tag_relationships, :foreign_key => "reference_id"
  has_many :tags, :through => :tag_relationships

  default_scope { order('created_at DESC') }
  

  def self.find(input)
    input.to_i == 0 ? find_by_slug(input) : super
  end

end

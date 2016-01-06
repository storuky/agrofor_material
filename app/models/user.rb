class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  include Cacheable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # mount_uploader :avatar, AvatarUploader

  has_many :position_bases, class_name: PositionBase
  has_many :positions
  has_many :offers
  has_many :images
  has_many :documents
  has_many :templates

  has_many :feedbacks

  belongs_to :currency
  belongs_to :role

  has_many :favorite_positions
  has_many :favorites, through: :favorite_positions, source: :position

  has_many :user_interests
  has_many :interests, through: :user_interests, source: :category


  validates_presence_of :first_name, :last_name, :phones

  # def offers
  #   self.positions.joins("INNER JOIN positions_offers ON positions_offers.offer_id = positions.id").distinct
  # end

  def info
    self.as_json(only: [:id, :fullname, :avatar, :phones, :city, :address, :lat, :lng, :company, :additional], include: [:currency], methods: [:favorite_ids])
  end

  def fullname
    "#{first_name} #{last_name}"
  end

  def favorite_ids
    Rails.cache.fetch("User.favorite_ids(#{id})") do
      super
    end
  end

  def correspondences
    Correspondence.where("messages_count > 0 AND user_ids @> ARRAY[?]::integer[]", [id])
  end

  def new_messages_count
    correspondences.pluck(:new_messages).map {|el| el[id.to_s]}.flatten.length
  end

  class << self

    def templates_from_cache id, params = {}
      Rails.cache.fetch("User.templates_from_cache(#{id}, #{params})_#{I18n.locale}") do
        ActiveModel::ArraySerializer.new(User.find(id).templates.order("updated_at DESC"), each_serializer: PositionSerializer, root: false).as_json
      end
    end

    def positions_from_cache id, params = {}
      Rails.cache.fetch("User.positions_from_cache(#{id}, #{params})_#{I18n.locale}") do
        ActiveModel::ArraySerializer.new(User.find(id).positions.where(params).order("updated_at DESC"), each_serializer: PositionWithOffersSerializer, root: false).as_json
      end
    end

    def offers_from_cache id, params = {}
      Rails.cache.fetch("User.offers_from_cache(#{id}, #{params})_#{I18n.locale}") do
        ActiveModel::ArraySerializer.new(User.find(id).offers.where(params).order("updated_at DESC"), each_serializer: OfferWithPositionSerializer, root: false).as_json
      end
    end

    def feedbacks_from_cache id, params = {}
      Rails.cache.fetch("User.feedbacks_from_cache(#{id}, #{params})_#{I18n.locale}") do
        ActiveModel::ArraySerializer.new(User.find(id).feedbacks.order("updated_at DESC"), each_serializer: FeedbackSerializer, root: false).as_json
      end
    end
  end


end

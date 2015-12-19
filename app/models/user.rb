class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  include Cacheable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # mount_uploader :avatar, AvatarUploader

  has_many :positions
  has_many :images
  has_many :documents
  has_many :templates

  has_many :feedbacks

  belongs_to :currency
  belongs_to :role

  has_many :correspondence_users
  has_many :correspondences, through: :correspondence_users

  has_many :favorite_positions
  has_many :favorites, through: :favorite_positions, source: :position

  has_many :user_interests
  has_many :interests, through: :user_interests, source: :category


  validates_presence_of :first_name, :last_name, :phones

  def offers
    self.positions.joins("INNER JOIN positions_offers ON positions_offers.offer_id = positions.id")
  end

  def info
    self.as_json(only: [:id, :fullname, :avatar, :phones, :city, :address, :lat, :lng, :company, :additional], include: [:currency])
  end

  def fullname
    "#{first_name} #{last_name}"
  end

  def language
    "Русский"
  end
end

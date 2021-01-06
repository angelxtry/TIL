# Section6-Associations-and-Authentication-Systems

test_app_6에서 scaffold로 User를 생성한다.

```rb
rails generate scaffold User username:string
```

migrate를 통해 table을 생성한다.

```rb
rails db:migrate
```

rails c를 실행한다.

```rb
2.6.3 :001 > User.all
   (0.7ms)  SELECT sqlite_version(*)
  User Load (0.1ms)  SELECT "users".* FROM "users" LIMIT ?  [["LIMIT", 11]]
 => #<ActiveRecord::Relation []>
2.6.3 :002 > User
 => User(id: integer, username: string, created_at: datetime, updated_at: datetime)
```

User 만 입력하면 테이블 구조를 확인할 수 있다.

`.create` 메서드로 User를 생성한다.

```rb
2.6.3 :004 > User.create(username: 'suho')
   (0.1ms)  begin transaction
  User Create (0.9ms)  INSERT INTO "users" ("username", "created_at", "updated_at") VALUES (?, ?, ?)  [["username", "suho"], ["created_at", "2020-09-16 07:51:22.160317"], ["updated_at", "2020-09-16 07:51:22.160317"]]
   (0.8ms)  commit transaction
 => #<User id: 1, username: "suho", created_at: "2020-09-16 07:51:22", updated_at: "2020-09-16 07:51:22">
2.6.3 :005 > User.create(username: 'won')
   (0.1ms)  begin transaction
  User Create (0.3ms)  INSERT INTO "users" ("username", "created_at", "updated_at") VALUES (?, ?, ?)  [["username", "won"], ["created_at", "2020-09-16 07:51:33.472665"], ["updated_at", "2020-09-16 07:51:33.472665"]]
   (0.9ms)  commit transaction
 => #<User id: 2, username: "won", created_at: "2020-09-16 07:51:33", updated_at: "2020-09-16 07:51:33">
```

User와 Article의 association을 만들기 위해 migrate 파일을 생성한다.

```rb
rails generate migration add_user_id_to_articles
```

위 명령을 실행하면 `db/migrate/20200916075310_add_user_id_to_articles.rb` 파일이 생성된다.

위 파일을 다음처럼 수정한다.

```rb
class AddUserIdToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :user_id, :integer
  end
end
```

migrate 파일 수정을 완료했다면 migrate를 실행하여 DB에 반영한다.

```rb
rails db:migrate
```

Article 테이블을 확인해보자.

```rb
2.6.3 :010 > Article
 => Article(id: integer, title: string, description: text, created_at: datetime, updated_at: datetime, user_id: integer)
2.6.3 :011 > Article.all
  Article Load (0.2ms)  SELECT "articles".* FROM "articles" LIMIT ?  [["LIMIT", 11]]
 => #<ActiveRecord::Relation [#<Article id: 1, title: "first article", description: "description of first article", created_at: "2020-09-16 08:04:29", updated_at: "2020-09-16 08:04:29", user_id: nil>, #<Article id: 2, title: "second article", description: "description of second article", created_at: "2020-09-16 08:07:18", updated_at: "2020-09-16 08:07:18", user_id: nil>, #<Article id: 3, title: "third article", description: "description of third article", created_at: "2020-09-16 08:08:25", updated_at: "2020-09-16 08:08:25", user_id: nil>]>
```

user_id가 추가된 것을 확인할 수 있다.

User와 Article의 연관관계를 추가해보자.

app/models/user.rb

```rb
class User < ApplicationRecord
  has_many :articles
end
```

app/models/article.rb

```rb
class Article < ApplicationRecord
  belongs_to :user
end
```

이렇게 설정하면 User와 Article은 `1:N`의 관계가 된다.

rails console에서 확인해볼 수 있다.

```rb
2.6.3 :017 > user_1 = User.first
  User Load (0.1ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
 => #<User id: 1, username: "suho", created_at: "2020-09-16 07:51:22", updated_at: "2020-09-16 07:51:22">
2.6.3 :018 > user_1.articles
  Article Load (0.2ms)  SELECT "articles".* FROM "articles" WHERE "articles"."user_id" = ? LIMIT ?  [["user_id", 1], ["LIMIT", 11]]
 => #<ActiveRecord::Associations::CollectionProxy []>
```

rails console을 통해 데이터를 저장해보자.

```rb
2.6.3 :024 > Article.create(title: "User1's Article 1", description: "User1's Description", user_id: user_1.id)
   (0.1ms)  begin transaction
  Article Create (0.4ms)  INSERT INTO "articles" ("title", "description", "created_at", "updated_at", "user_id") VALUES (?, ?, ?, ?, ?)  [["title", "User1's Article 1"], ["description", "User1's Description"], ["created_at", "2020-09-16 08:19:10.240846"], ["updated_at", "2020-09-16 08:19:10.240846"], ["user_id", 1]]
   (0.7ms)  commit transaction
 => #<Article id: 4, title: "User1's Article 1", description: "User1's Description", created_at: "2020-09-16 08:19:10", updated_at: "2020-09-16 08:19:10", user_id: 1>
```

이제 user_1로 연관된 Article을 조회할 수 있다.

```rb
2.6.3 :026 > user_1.articles
  Article Load (0.1ms)  SELECT "articles".* FROM "articles" WHERE "articles"."user_id" = ? LIMIT ?  [["user_id", 1], ["LIMIT", 11]]
 => #<ActiveRecord::Associations::CollectionProxy [#<Article id: 4, title: "User1's Article 1", description: "User1's Description", created_at: "2020-09-16 08:19:10", updated_at: "2020-09-16 08:19:10", user_id: 1>]>
```

user_id가 아니라 user instance를 그대로 사용해도 된다.

```rb
2.6.3 :003 > Article.create(title: "User1's Article 2", description: "User1's Description", user: user_1)
   (0.1ms)  begin transaction
  Article Create (0.4ms)  INSERT INTO "articles" ("title", "description", "created_at", "updated_at", "user_id") VALUES (?, ?, ?, ?, ?)  [["title", "User1's Article 2"], ["description", "User1's Description"], ["created_at", "2020-09-16 08:23:25.994378"], ["updated_at", "2020-09-16 08:23:25.994378"], ["user_id", 1]]
   (0.6ms)  commit transaction
 => #<Article id: 5, title: "User1's Article 2", description: "User1's Description", created_at: "2020-09-16 08:23:25", updated_at: "2020-09-16 08:23:25", user_id: 1>
```

user_1을 기준으로 article을 생성하여 저장할 수도 있다.

```rb
2.6.3 :010 > user_1.articles.build(title: 'new article 1', description: 'new description')
 => #<Article id: nil, title: "new article 1", description: "new description", created_at: nil, updated_at: nil, user_id: 1>
2.6.3 :011 > article = _
 => #<Article id: nil, title: "new article 1", description: "new description", created_at: nil, updated_at: nil, user_id: 1>
2.6.3 :012 > article.save
   (0.1ms)  begin transaction
  Article Create (0.7ms)  INSERT INTO "articles" ("title", "description", "created_at", "updated_at", "user_id") VALUES (?, ?, ?, ?, ?)  [["title", "new article 1"], ["description", "new description"], ["created_at", "2020-09-16 08:27:04.557011"], ["updated_at", "2020-09-16 08:27:04.557011"], ["user_id", 1]]
   (0.7ms)  commit transaction
 => true
```

이미 만들어진 article에 user_id를 입력해보자.

```rb
2.6.3 :017 > article = Article.first
  Article Load (0.2ms)  SELECT "articles".* FROM "articles" ORDER BY "articles"."id" ASC LIMIT ?  [["LIMIT", 1]]
 => #<Article id: 1, title: "first article", description: "description of first article", created_at: "2020-09-16 08:04:29", updated_at: "2020-09-16 08:04:29", user_id: nil>
2.6.3 :018 >
2.6.3 :019 > user_2 = User.last
  User Load (0.2ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" DESC LIMIT ?  [["LIMIT", 1]]
 => #<User id: 2, username: "won", created_at: "2020-09-16 07:51:33", updated_at: "2020-09-16 07:51:33">
2.6.3 :020 > user_2.articles << article
   (0.1ms)  begin transaction
  Article Update (0.3ms)  UPDATE "articles" SET "updated_at" = ?, "user_id" = ? WHERE "articles"."id" = ?  [["updated_at", "2020-09-16 08:30:15.940647"], ["user_id", 2], ["id", 1]]
   (1.3ms)  commit transaction
  Article Load (0.2ms)  SELECT "articles".* FROM "articles" WHERE "articles"."user_id" = ? LIMIT ?  [["user_id", 2], ["LIMIT", 11]]
 => #<ActiveRecord::Associations::CollectionProxy [#<Article id: 1, title: "first article", description: "description of first article", created_at: "2020-09-16 08:04:29", updated_at: "2020-09-16 08:30:15", user_id: 2>]>
2.6.3 :021 > user_2.articles
  Article Load (0.2ms)  SELECT "articles".* FROM "articles" WHERE "articles"."user_id" = ? LIMIT ?  [["user_id", 2], ["LIMIT", 11]]
 => #<ActiveRecord::Associations::CollectionProxy [#<Article id: 1, title: "first article", description: "description of first article", created_at: "2020-09-16 08:04:29", updated_at: "2020-09-16 08:30:15", user_id: 2>]>
 ```

---

## Alpha Blog

alpah-blog에서 migrate 파일을 생성한다.

```rb
rails generate migration create_users
```


db/migrate/20200916083542_create_users.rb 파일이 생성된다.

이 파일을 수정한다.

```rb
class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.timestamps
    end
  end
end
```

`rails db:migrate`로 migration 파일을 적용한다.

migrate가 성공하면 `models/user.rb` 파일을 생성한다.

```rb
class User < ApplicationRecord

end
```

여기까지 작성하면 rails console에서 User를 확인할 수 있다.

## User validation 추가

```rb
class User < ApplicationRecord
  validates :username, presence: true,
                       uniqueness: { case_sensitive: false },
                       length: { minimum: 3, maximum: 25 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true,
                    length: { maximum: 105 },
                    format: { with: VALID_EMAIL_REGEX }
end
```

## User, Article association

article에 user_id를 추가하기 위해 migration 파일을 만든다.

```rb
rails generate migration add_user_id_to_articles
```

`db/migrate/20200916093257_add_user_id_to_articles.rb` 파일을 수정한다.

```rb
class AddUserIdToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :user_id, :integer
  end
end
```

rails db:migrate로 적용한다.

user, article models 파일을 수정하여 association을 설정한다.

```rb
class User < ApplicationRecord
  has_many :articles

  validates :username, presence: true,
                       uniqueness: { case_sensitive: false },
                       length: { minimum: 3, maximum: 25 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true,
                    length: { maximum: 105 },
                    format: { with: VALID_EMAIL_REGEX }
end
```

```rb
class Article < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { minimum: 6, maximum: 100 }
  validates :description, presence: true, length: { minimum: 10, maximum: 100 }
end
```

rails c를 이용하여 association을 확인해보자.

```rb
2.6.3 :013 > user = User.first
  User Load (0.2ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
 => #<User id: 1, username: "suho", email: "suho@gmail.com", created_at: "2020-09-16 09:16:56", updated_at: "2020-09-16 09:16:56">
2.6.3 :014 > article = Article.first
  Article Load (0.2ms)  SELECT "articles".* FROM "articles" ORDER BY "articles"."id" ASC LIMIT ?  [["LIMIT", 1]]
 => #<Article id: 2, title: "second article", description: "update success!", created_at: "2020-09-14 05:46:49", updated_at: "2020-09-16 05:13:07", user_id: nil>
2.6.3 :015 > user.articles << article
   (0.1ms)  begin transaction
  Article Update (0.4ms)  UPDATE "articles" SET "updated_at" = ?, "user_id" = ? WHERE "articles"."id" = ?  [["updated_at", "2020-09-16 09:41:47.050805"], ["user_id", 1], ["id", 2]]
   (0.8ms)  commit transaction
  Article Load (0.2ms)  SELECT "articles".* FROM "articles" WHERE "articles"."user_id" = ? LIMIT ?  [["user_id", 1], ["LIMIT", 11]]
 => #<ActiveRecord::Associations::CollectionProxy [#<Article id: 2, title: "second article", description: "update success!", created_at: "2020-09-14 05:46:49", updated_at: "2020-09-16 09:41:47", user_id: 1>]>
2.6.3 :016 > article
 => #<Article id: 2, title: "second article", description: "update success!", created_at: "2020-09-14 05:46:49", updated_at: "2020-09-16 09:41:47", user_id: 1>
2.6.3 :018 > article.user.username
 => "suho"
```

rails s를 실행하여 신규 article을 작성하면 User must exist error가 발생한다.

app/controllers/articles_controller.rb 파일을 수정한다.

```rb
def create
  @article = Article.new(article_params)
  @article.user = User.first
  if @article.save
    flash[:notice] = 'Article was created successfully.'
    redirect_to article_path(@article)
  else
    render 'new'
  end
end
```

신규 article이 정상적으로 저장된다.

```rb
<h2 class="text-center mt-4"> <%= @article.title %> </h2>
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col-8 mt-4">
      <div class="card text-center shadow mb-5 bg-white rounded">
        <div class="card-header font-italic">by <%= @article.user.username if @article.user %></div>
        <div class="card-body">
          <div class="card-text text-left"><%= simple_format(@article.description) %></div>
          <%= link_to 'Edit', edit_article_path(@article), class: "btn btn-outline-info" %>
          <%= link_to 'Delete', article_path(@article), class: "btn btn-outline-danger", method: :delete, data: {confirm: "Are you sure?"} %>
        </div>
        <div class="card-footer text-muted">
          <small>Created <%= time_ago_in_words(@article.created_at) %> ago,
            edited <%= time_ago_in_words(@article.updated_at) %> ago</small>
        </div>
      </div>
    </div>
  </div>
</div>
```

`@article.user.username if @article.user` article에 user_id가 있는지 확인한 후 username을 출력한다.

---

## before_save

user.rb 파일에 before_save를 추가한다.

```rb
class User < ApplicationRecord
  before_save { self.email = email.downcase }
  has_many :articles

  validates :username, presence: true,
                       uniqueness: { case_sensitive: false },
                       length: { minimum: 3, maximum: 25 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true,
                    length: { maximum: 105 },
                    format: { with: VALID_EMAIL_REGEX }
end
```

rails c에서 테스트해보면 대소문자가 섞여있어도 소문자로 잘 저장된다.

```rb
2.6.3 :005 > User.create(username: 'ssu', email: 'SsU@gmail.com')
   (0.1ms)  begin transaction
  User Exists? (0.2ms)  SELECT 1 AS one FROM "users" WHERE LOWER("users"."username") = LOWER(?) LIMIT ?  [["username", "ssu"], ["LIMIT", 1]]
  User Create (0.7ms)  INSERT INTO "users" ("username", "email", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["username", "ssu"], ["email", "ssu@gmail.com"], ["created_at", "2020-09-17 08:47:19.259344"], ["updated_at", "2020-09-17 08:47:19.259344"]]
   (0.7ms)  commit transaction
 => #<User id: 2, username: "ssu", email: "ssu@gmail.com", created_at: "2020-09-17 08:47:19", updated_at: "2020-09-17 08:47:19">
 ```

---

## add secure password

bcrypt를 Gemfile에서 주석을 풀고 `bundle install`로 설치한다.

command로 migrate 파일을 생성한다.

```rb
rails generate migration add_password_digest_to_users
```

`db/migrate/20200917093506_add_password_digest_to_users.rb` 파일이 생성된다.

해당 파일을 다음과 같이 수정한다.

```rb
class AddPasswordDigestToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :password_digest, :string
  end
end
```

user.rb 파일에 `has_secure_password`를 추가한다.

```rb
class User < ApplicationRecord
  before_save { self.email = email.downcase }
  has_many :articles

  validates :username, presence: true,
                       uniqueness: { case_sensitive: false },
                       length: { minimum: 3, maximum: 25 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true,
                    length: { maximum: 105 },
                    format: { with: VALID_EMAIL_REGEX }

  has_secure_password
end
```

DB에 적용한다.

```rb
> rails db:migrate
The dependency tzinfo-data (>= 0) will be unused by any of the platforms Bundler is installing for. Bundler is installing for ruby but the dependency is only for x86-mingw32, x86-mswin32, x64-mingw32, java. To add those platforms to the bundle, run `bundle lock --add-platform x86-mingw32 x86-mswin32 x64-mingw32 java`.
== 20200917093506 AddPasswordDigestToUsers: migrating =========================
-- add_column(:users, :password_digest, :string)
   -> 0.0024s
== 20200917093506 AddPasswordDigestToUsers: migrated (0.0025s) ================
```

rails c로 확인해보자.

```rb
2.6.3 :001 > User.first
   (0.5ms)  SELECT sqlite_version(*)
  User Load (0.2ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
 => #<User id: 1, username: "suho", email: "suho@gmail.com", created_at: "2020-09-16 09:16:56", updated_at: "2020-09-16 09:16:56", password_digest: nil>
2.6.3 :002 > ap User
class User < ApplicationRecord {
                 :id => :integer,
           :username => :string,
              :email => :string,
         :created_at => :datetime,
         :updated_at => :datetime,
    :password_digest => :string
}
 => nil
```

password_digest가 추가된 것을 확인할 수 있다.

rails c로 확인해보자.

```rb
2.6.3 :003 > user = User.last
  User Load (0.2ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" DESC LIMIT ?  [["LIMIT", 1]]
 => #<User id: 2, username: "ssu", email: "ssu@gmail.com", created_at: "2020-09-17 08:47:19", updated_at: "2020-09-17 08:47:19", password_digest: nil>
2.6.3 :004 > user.password = "password123"
 => "password123"
2.6.3 :005 > user.save
   (0.1ms)  begin transaction
  User Exists? (0.2ms)  SELECT 1 AS one FROM "users" WHERE LOWER("users"."username") = LOWER(?) AND "users"."id" != ? LIMIT ?  [["username", "ssu"], ["id", 2], ["LIMIT", 1]]
  User Update (0.3ms)  UPDATE "users" SET "updated_at" = ?, "password_digest" = ? WHERE "users"."id" = ?  [["updated_at", "2020-09-17 09:45:19.026913"], ["password_digest", "$2a$12$cCj9Jx5h5CBZIVO27z70v.81EYJWaGO4uGRUpoHju1eBztifvQ6cq"], ["id", 2]]
   (0.8ms)  commit transaction
 => true
2.6.3 :006 > user
 => #<User id: 2, username: "ssu", email: "ssu@gmail.com", created_at: "2020-09-17 08:47:19", updated_at: "2020-09-17 09:45:19", password_digest: [FILTERED]>
```

password를 저장하면 자동으로 password_digest에 hash 값이 추가된다.

user를 다시 확인하면 password_digest에 FILTERED가 출력된다.

```rb
2.6.3 :007 > user.authenticate("wrongpassword")
 => false
2.6.3 :008 > user.authenticate("password123")
 => #<User id: 2, username: "ssu", email: "ssu@gmail.com", created_at: "2020-09-17 08:47:19", updated_at: "2020-09-17 09:45:19", password_digest: [FILTERED]>
```

`authenticate` 메서드를 이용하면 인증을 처리할 수 있다.

올바른 password가 입력되면 user정보를 return 한다.

---

routes.rb 파일에 경로를 추가한다.

```rb
Rails.application.routes.draw do
  root 'pages#home'
  get 'about', to: 'pages#about'
  resources :articles, only: %i[show index new create edit update destroy]
  get 'signup', to: 'users#new'
end
```

controller를 추가한다.

users_controller.rb

```rb
# frozen_string_literal: true

# User controller
class UsersController < ApplicationController
  def new
    @user = User.new
  end
end
```

view 파일을 추가한다. form은 partials로 추가한다.

```rb
<h1 class="text-center mt-4">Sign p for Alpha Blog</h1>
<%= render 'form' %>
```

_form.html.erb 파일을 추가한다.

```rb
<div class="container">
  <div class="row justify-content-center">
    <div class="col-10">
      <%= render 'shared/errors', obj: @user %>
      <%= form_with(model: @user, class: "shadow p-3 mb-5 bg-info rounded", local: true) do |f| %>
        <div class="form-group row">
          <%= f.label :username, class: "col-2 col-form-label text-light" %>
          <div class="col-10">
            <%= f.text_field :username, class: "form-control shadow rounded", placeholder: "Enter a username" %>
          </div>
        </div>

        <div class="form-group row">
          <%= f.label :email, class: "col-2 col-form-label text-white" %> <br>
          <div class="col-10">
            <%= f.email_field :email, class: "form-control shadow rounded", placeholder: "Enter your email" %>
          </div>
        </div>

        <div class="form-group row">
          <%= f.label :password, class: "col-2 col-form-label text-white" %> <br>
          <div class="col-10">
            <%= f.password_field :password, class: "form-control shadow rounded", placeholder: "Enter your password" %>
          </div>
        </div>

        <div class="form-group row justify-content-center">
          <%= f.submit class: "btn btn-outline-light btn-lg" %>
        </div>
      <% end %>
    </div>
    <div class="mb-3">
      <%= link_to 'Return to articles listing', articles_path, class: "text-info" %>
    </div>
  </div>
</div>
```

errors partial에 데이터를 전달할 수 있도록 _errors.html.erb 파일을 수정한다.

```rb
<% if obj.errors.any? %>
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <h4 class="alert-heading">The following errors prevented the article from being saved</h4>
    <ul>
      <% obj.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
    </ul>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
<% end %>
```

이 상태로 실행하면 다음과 같은 에러가 발생한다.

```cmd
NoMethodError in Users#new
```

```rb
<%= form_with(model: @user, class: "shadow p-3 mb-5 bg-info rounded", local: true) do |f| %>
...
```

이 에러를 해결하려면 router에 post 'users'가 필요하다.

```rb
Rails.application.routes.draw do
  root 'pages#home'
  get 'about', to: 'pages#about'
  resources :articles, only: %i[show index new create edit update destroy]
  get 'signup', to: 'users#new'
  post 'users', to: 'users#create'
end
```

이렇게 수정하면 `/signup`을 조회하면 form이 생성된다.

router를 좀 더 개선해보면 다음과 같다.

```rb
Rails.application.routes.draw do
  root 'pages#home'
  get 'about', to: 'pages#about'
  resources :articles, only: %i[show index new create edit update destroy]
  get 'signup', to: 'users#new'
  resources :users, except: [:new]
end
```

다시 `/signup`을 실행하고 form에 값을 입력하면 `http://localhost:3000/users`로 이동되고 `Unknown action`에러가 발생한다.

controller에 action을 추가한다.

```rb
# frozen_string_literal: true

# User controller
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    byebug
  end
end
```

create action을 만들고 byebug를 추가했다.

form을 다시 실행하여 값을 입력하고 submit 버튼을 클릭하면 console에서 params를 확인할 수 있다.

```rb
[3, 12] in /Users/gomidev/Project/RubyStudy/rails_6_projects/alpha-blog/app/controllers/users_controller.rb
    3: # User controller
    4: class UsersController < ApplicationController
    5:   def new
    6:     @user = User.new
    7:   end
    8:
    9:   def create
   10:     byebug
=> 11:   end
   12: end
(byebug) params
<ActionController::Parameters {"authenticity_token"=>"CC1fApiCBJ5XWpeOSY1xOOoTGY68DfdXJq5xFKGtJomsYDn7ncpu/HTA98kXGtyyOOLfKRZRthbxDwDLNw7QOA==", "user"=>{"username"=>"aaa", "email"=>"aaa@gmail.com", "password"=>""}, "commit"=>"Create User", "controller"=>"users", "action"=>"create"} permitted: false>
(byebug) continue
Completed 204 No Content in 169134ms (ActiveRecord: 0.0ms | Allocations: 185646)
```

create action을 완성한다.

```rb
# frozen_string_literal: true

# User controller
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = 'User created Successfully.'
      redirect_to articles_path
    else
      render 'new'
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
```

user 정보 변경을 추가하자.

user 정보 변경 form은 edit action, 변경 form의 submit을 클릭하면 update action을 호출하게 될 것이다.

`localhost:3000/users/3/edit`라고 입력하면 user 정보 변경 form이 출력되도록 해보자.

```rb
# frozen_string_literal: true

# User controller
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def update

  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = 'User created Successfully.'
      redirect_to articles_path
    else
      render 'new'
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
```

edit action은 user를 조회하여 view에 전달한다.

```rb
<h1 class="text-center mt-4">Edit your profile</h1>
<%= render 'form' %>
```

여기까지 작성하면 user 정보 변경 form이 출력된다.

버튼 text가 login에서 사용하던 Sign in으로 설정되어 있으므로 Update account로 변경되도록 수정하자.

변경 전

```rb
<div class="form-group row justify-content-center">
  <%= f.submit "Sign up", class: "btn btn-outline-light btn-lg" %>
</div>
```

변경 후

```rb
<div class="form-group row justify-content-center">
  <%= f.submit(@user.new_record? ? "Sign up" : "Update account", class: "btn btn-outline-light btn-lg") %>
</div>
```

edit action이 완성되었다.

이제 update action을 추가해야 한다.

```rb
# frozen_string_literal: true

# User controller
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      flash[:notice] = 'Your account information was successfully updated.'
      redirect_to articles_path
    else
      render 'edit'
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = 'User created Successfully.'
      redirect_to articles_path
    else
      render 'new'
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
```

테스트를 해보면 username, email은 데이터가 없으면 에러 메시지가 출력되지만 password는 데이터가 없어도 동작한다.

원인은? 좀 더 확인해봐야겠다.

---

user 정보 출력 (show)

브라우저에 `/users/:userId`를 입력하면 user profile과 해당 user가 작성한 글을 출력하도록 해보자.

controller 설정

```rb
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
...
```

view 생성

users/show.html.erb

```rb
<h1 class="text-center mt-4"><%= @user.username %>'s profile</h1>
<%= render 'form' %>
```

Gravatar 계정을 생성한 후 irb로 테스트 해보자.

```rb
> require 'digest/md5'
> email_address = "angelxtry@gmail.com"
> hash = Digest::MD5.hexdigest(email_address)
> hash
 => "3565ea63e70c39ffffd41396899e5170"
> image_src = "https://www.gravatar.com/avatar/#{hash}"
> image_src
 => "https://www.gravatar.com/avatar/3565ea63e70c39ffffd41396899e5170"
```

app/helpers/application_helper.rb 파일에 gravatar_for 함수를 추가한다.

```rb
module ApplicationHelper
  def gravatar_for(user, options = { size: 80 })
    email_address = user.email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    size = options[:size]
    gravatar_url = "https://www.gravatar.com/avatar/#{hash}?s=#{size}"
    image_tag(gravatar_url, alt: user.username, class: 'rounded mx-auto d-block')
  end
end
```

show.html.erb는 다음과 같이 작성한다.

```rb
<h1 class="text-center mt-4"><%= @user.username %>'s profile</h1>
<%= gravatar_for @user, size: 200 %>
```

rails c를 이용하여 특정 계정을 gravatar에 가입한 email로 변경한다.

```rb
2.6.3 :001 > user = User.find(2)
   (0.9ms)  SELECT sqlite_version(*)
  User Load (0.2ms)  SELECT "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 2], ["LIMIT", 1]]
 => #<User id: 2, username: "ssu", email: "ssu@gmail.com", created_at: "2020-09-17 08:47:19", updated_at: "2020-09-17 09:45:19", password_digest: [FILTERED]>
2.6.3 :002 > user.email = "angelxtry@gmail.com"
 => "angelxtry@gmail.com"
2.6.3 :003 > user
 => #<User id: 2, username: "ssu", email: "angelxtry@gmail.com", created_at: "2020-09-17 08:47:19", updated_at: "2020-09-17 09:45:19", password_digest: [FILTERED]>
2.6.3 :004 > user.save()
   (0.1ms)  begin transaction
  User Exists? (0.2ms)  SELECT 1 AS one FROM "users" WHERE LOWER("users"."username") = LOWER(?) AND "users"."id" != ? LIMIT ?  [["username", "ssu"], ["id", 2], ["LIMIT", 1]]
  User Update (0.4ms)  UPDATE "users" SET "email" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["email", "angelxtry@gmail.com"], ["updated_at", "2020-09-22 04:54:36.672477"], ["id", 2]]
   (1.0ms)  commit transaction
 => true
 ```

app/views/articles/index.html.erb 파일에서 card 관련 코드를 _article.html.erb 파일로 분리한다.

app/views/articles/index.html.erb

```rb
<h1 class="text-center mt-4">Articles</h1>
<%= render 'article' %>
```

_article.html.erb

```rb
<div class="container">
  <% @articles.each do |article| %>
    <div class="row justify-content-md-center">
      <div class="col-8 mt-4">
        <div class="card text-center shadow mb-5 bg-white rounded">
          <div class="card-header font-italic">
            by <%= article.user.username if article.user %>
          </div>
          <div class="card-body">
            <h5 class="card-title"><%= link_to article.title, article_path(article), class: "text-success" %></h5>
            <p class="card-text"><%= truncate(article.description, length: 10) %></p>
            <%= link_to 'View', article_path(article), class: "btn btn-outline-success" %>
            <%= link_to 'Edit', edit_article_path(article), class: "btn btn-outline-info" %>
            <%= link_to 'Delete', article_path(article), class: "btn btn-outline-danger", method: :delete, data: {confirm: "Are you sure?"} %>
          </div>
          <div class="card-footer text-muted">
            <small>Created <%= time_ago_in_words(article.created_at) %> ago,
              edited <%= time_ago_in_words(article.updated_at) %> ago</small>
          </div>
        </div>
      </div>
    </div>
  <% end %>
</div>
```

_article.html.erb 파일을 users에서도 사용한다.

app/views/users/show.html.erb

```rb
<h1 class="text-center mt-4"><%= @user.username %>'s profile</h1>
<%= gravatar_for @user, size: 200 %>

<h3 class="text-center mt-4">Articles</h3>
<%= render 'articles/article' %>
```

이렇게 하면 user 정보를 조회하는 `/users/:userId` url로 user profile과 articles를 조회할 수 있다.

---

users 를 추가한다.

users url을 선택하면 user 정보와 article 
require 'rails_helper'
require 'support/requests_spec_helper'

RSpec.describe "Posts", :type => :request do
  include RequestsSpecHelper
  
  describe "requests" do
    before do
      @guest = FactoryGirl.create(:user)
      @admin = FactoryGirl.create(:user, { email: 'admin@test.com', admin: true })
      @post = FactoryGirl.create(:post, { user_id: @admin.id })
    end


    ###############
    # NOT LOGGED IN
    ###############
    context "when not logged in" do
      describe "accessing the post index page" do
        before { visit '/blog' }
        it "should allow access" do
          expect(page.current_path).to eq('/blog')
        end
      end

      describe "accessing a post creation page" do
        before { visit '/posts/new' }
        it "should redirect to the login page" do
          expect(page.current_path).to eq('/login')
        end
      end
   
      describe "accessing a post edit page" do
        before do
          visit edit_post_path(@post)
        end

        it 'should redirect to the login page' do
          expect(page.current_path).to eq('/login')
        end

      end

      describe "accessing a post show page" do
        before do
          visit post_path(@post)
        end

        it "should allow access" do
          expect(page.current_path).to eq(post_path(@post))
        end

        it "should not have an edit link" do
          expect(page).to_not have_content('Edit')
        end
      end
    end

    ###############
    # LOGGED IN AS GUEST
    ###############
    context "when logged in as guest" do
      before do
        login_user("test@test.com", "foobar85")
        visit post_path(@post)
      end

      describe "listing the edit link on a post page" do
        it "should not display an edit link on a post page" do
          expect(page).to_not have_content('Edit')
        end
      end

      describe "creating posts" do 
        before do
          visit new_post_path
        end

        it "should not allow for post creation" do
          fill_in "Title", with: "My Title"
          fill_in "Body", with: "My Body"
          fill_in "Slug", with: "My-Slug"
          fill_in "Excerpt", with: "My Excerpt"
          expect{ click_button "Create Post" }.not_to change(Post, :count)
        end
      end

      describe "editing a post" do
        before do
          visit edit_post_path(@post)
          fill_in "Title", with: "My new title"
          click_on "Update Post"
        end
        it "should not allow editing of the post" do
          expect(@post.title).to eq('MyString')
        end
      end

    end

    ###############
    # LOGGED IN AS ADMIN
    ###############
    context "when logged in and admin" do
       before do
         login_user('admin@test.com', 'foobar85')
         visit post_path(@post)
       end

       describe "the edit link on a post" do
         it "should be display" do
           expect(page).to have_content('Edit')
         end
       end

       describe "post creation" do
         before do
           visit new_post_path
         end
         it "should be allowed" do
           fill_in "Title", with: "My Title"
           fill_in "Body", with: "My Body"
           fill_in "Slug", with: "My-Slug"
           fill_in "Excerpt", with: "My Excerpt"
           expect{ click_button "Create Post" }.to change(Post, :count).by(1)
         end
       end

       describe "post updating" do
         before do
           visit edit_post_path(@post)
           fill_in "Title", with: "My new Title"
           click_on "Update Post"
         end
         it "should be allowed" do
           expect(page).to have_content('My new Title')
         end
       end

    end
  
    ###############
    # OTHER
    ###############
    describe "the posts index page" do
      before do
        visit posts_path
      end
      it "should display post excerpts" do
        expect(page).to have_content(@post.excerpt)
      end
    end
  end
end

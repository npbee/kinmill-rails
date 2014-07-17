require 'rails_helper'

RSpec.describe "projects/edit", :type => :view do
  before(:each) do
    @project = assign(:project, Project.create!(
      :name => "MyString",
      :role => "MyString",
      :url => "MyString",
      :body => "MyText",
      :logo => "MyString",
      :thumbnail => "MyString",
      :small_screen => "MyString",
      :medium_screen => "MyString",
      :large_screen => "MyString"
    ))
  end

  it "renders the edit project form" do
    render

    assert_select "form[action=?][method=?]", project_path(@project), "post" do

      assert_select "input#project_name[name=?]", "project[name]"

      assert_select "input#project_role[name=?]", "project[role]"

      assert_select "input#project_url[name=?]", "project[url]"

      assert_select "textarea#project_body[name=?]", "project[body]"

      assert_select "input#project_logo[name=?]", "project[logo]"

      assert_select "input#project_thumbnail[name=?]", "project[thumbnail]"

      assert_select "input#project_small_screen[name=?]", "project[small_screen]"

      assert_select "input#project_medium_screen[name=?]", "project[medium_screen]"

      assert_select "input#project_large_screen[name=?]", "project[large_screen]"
    end
  end
end

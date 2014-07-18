KINMILL
----

**Dependencies**

* Vagrant
* Vagrant Plugins:
    Vagrant berkshelf
    Vagrant omnibus
* Berkshelf

**Backend Stack**

* Ruby 2.1.2
* Rails 4.1.1
* Postgresql

**Frontend Stack**

* SASS
  Inuit CSS
  Bourbon / Bourbon Neat
* RequireJS
* Gulp for build system

**Development**

* Start the server with vagrant up
* Start frontend build with gulp

If you need to make changes to the server, update the Berksfile with the
appropriate cookbooks.

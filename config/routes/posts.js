var React = require('react');
var App = require('../../components/App.react');
var render = require('../../lib/render');
var _ = require('lodash');
var checkit = require('checkit');
var validations = require('../validations');
var knex = require('../../lib/db');
var normalize = require('../routeHelpers/normalizeAPIResponse');
var Promise = require('bluebird');

// Post index
// Show all posts
exports.index = function *() {
    var posts = yield knex('posts')
                            .select('title', 'excerpt', 'slug', 'id');
    

    var data = yield normalize({
        posts: posts,
        path: '/posts',
        req: this
    });

    if (this.request.isClient) {
        this.body = yield data;
        return;
    }

    var markup = React.renderToString(
            <App data={data} history="true" path="/posts" />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Show an individual post
exports.show = function*() {
    var slug = this.params.slug;
    
    // Detect if the param passed is a number so that we can look up a post
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var _post = yield knex('posts').where(_id, slug);
    var post = _post[0];

    var subquery = knex('tag_relationships')
                        .where('reference_type', 'post')
                        .andWhere('reference_id', post.id).select('tag_id');

    var tags = yield knex('tags').where('id', 'in', subquery);

    post.tags = tags;

    var data = yield normalize({
        posts: post,
        path: '/posts/' + slug,
        req: this
    });

    if (this.request.isClient) {
        this.body = data;
        return;
    }

    var markup = React.renderToString(
            <App data={data} history="true" path={"/posts/" + slug} />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Show the new post form
exports.new = function*() {

    var data = yield normalize({
        path: '/posts/new',
        req: this
    });

    var markup = React.renderToString(
            <App data={data} history="true" path="/posts/new" />
            );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });
};

// Create a post
exports.create = function*() {
    var body = this.request.body;
    var error;
    var postId;
    var tags = [];

    if (body.tags.length) {
        body.tags.split(',').map(function(tag) { return tags.push(tag.trim()); });
    }

    // Validations
    try {
        yield checkit(validations.post.new).run(body);
    } catch(err) {
        error = err;
    }

    try {
        yield knex.transaction(function(trx) {
            return trx('posts').insert({
                title: body.title,
                body: body.body,
                slug: body.slug,
                excerpt: body.excerpt,
                published: body.published,
                created_at: new Date(),
                updated_at: new Date()
            }, 'id').then(function(id) {
                postId = id[0];
                return Promise.map(tags, function(tag) {
                    return trx('tags').insert({
                        name: tag,
                        created_at: new Date(),
                        updated_at: new Date()
                    }, 'id');
                });
            }).then(function(tagIds) {
                return Promise.map(tagIds, function(tagId) {
                    return trx('tag_relationships').insert({
                        reference_id: postId,
                        reference_type: 'post',
                        tag_id: tagId[0],
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                });
            });
        });
    } catch(err) {
        error = err;
    }

    if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };
    } else {
        this.body = {
            success: true,
            post_id: postId
        };
    }

};

// Show the edit post form
exports.edit = function* () {

    var slug = this.params.slug;

    // Detect if the param passed is a number so that we can look up a post
    // by id or by slug
    var _id = isNaN(Number(slug)) ? 'slug' : 'id';
    var _post = yield knex('posts').where(_id, slug);
    var post = _post[0];

    var subquery = knex('tag_relationships')
                        .where('reference_type', 'post')
                        .andWhere('reference_id', post.id).select('tag_id');

    var tags = yield knex('tags').where('id', 'in', subquery);

    post.tags = tags;

    var data = yield normalize({
        posts: post,
        path: '/posts/' + slug + '/edit',
        req: this
    });

    if (this.request.isClient) {
        this.body = data;
        return;
    }

    var markup = React.renderToString(
        <App data={data} history="true" path={"/posts/" + slug + "/edit"} />
            );

    this.body = yield render('default', { 
        markup: markup,
        state: JSON.stringify(data)
    });

};



// Update a post
exports.put = function* () {
    var body = this.request.body;
    var id = body.id;
    var error;
    var tags = body.tags;

    try {
        yield knex.transaction(function(trx) {
            return trx('posts').where('id', id).update({
                title: body.title,
                body: body.body,
                slug: body.slug,
                excerpt: body.excerpt,
                published: body.published,
                created_at: new Date(),
                updated_at: new Date()
            }, 'id').then(function(id) {
                return Promise.map(tags, function(tag) {
                    // If the tag object has an ID, look it up and return it
                    return new Promise(function(resolve, reject) {
                        // If the tag has an ID, it already exists in the db
                        if (tag.id) {
                            resolve(tag);
                        } else {
                            return trx('tags').insert({
                                name: tag.name,
                                created_at: new Date(),
                                updated_at: new Date()
                            }, 'id').then(resolve);
                        }
                    });
                });
            }).then(function(tagIds) {

                 //The knex functions return an array, so we flatten everything
                 //down.  
                var flattened = _.flatten(tagIds, true);

                // Filter out the tag relationships to delete
                var tagsToAdd = flattened.filter(function(tag) {
                    return !tag._delete;
                });

                var tagsToDelete = flattened.filter(function(tag) {
                    return tag._delete;
                });

                 //If we've return a tag that already exists, it will be an
                 //object, so we need to flatten again with just the id.
                var preppedTagsToAdd = tagsToAdd.map(function(tag) {
                    if (tag.id) {
                        return tag.id;
                    } else {
                        return tag;
                    }
                });

                var preppedTagsToDelete = tagsToDelete.map(function(tag) {
                    return tag.id;
                });

                return Promise.map(preppedTagsToAdd, function(tagId) {
                    return new Promise(function(resolve, reject) {
                        trx('tag_relationships')
                        .where('tag_id', tagId)
                        .andWhere('reference_id', id)
                        .then(function(relationships) {
                            if (relationships.length) {
                                resolve();
                            } else {
                                trx('tag_relationships').insert({
                                    reference_id: id,
                                    reference_type: 'post',
                                    tag_id: tagId,
                                    created_at: new Date(),
                                    updated_at: new Date()
                                }).then(resolve);
                            }
                        });
                    }).then(function() {
                        return Promise.map(preppedTagsToDelete, function(tagId) {
                            return trx('tag_relationships')
                            .where('tag_id', tagId)
                            .andWhere('reference_id', id)
                            .del();
                        });
                    });
                });
            });
        });
    } catch(err) {
        error = err;
    }

    if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };
    } else {
        this.body = {
            success: true,
            post_id: id
        };
    }

        //var update = yield knex('posts')
            //.where('id', id)
            //.update({
            //title: body.title,
            //body: body.body,
            //slug: body.slug,
            //excerpt: body.excerpt,
            //published: body.published,
            //updated_at: new Date()
        //}, 'id');
        //this.body = {
            //success: true,
            //post_id: update[0]
        //};
    //}

};


// Delete a post
exports.del = function* () {
    var body = this.request.body;
    var id = body.id;

    var deletion = yield knex('posts')
                    .where('id', id)
                    .del();
    
    this.body = {
        success: true,
        affected_rows: deletion
    };
};

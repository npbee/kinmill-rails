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

    var tags = yield knex('tags as t')
        .join('tag_relationships as tr', 't.id', '=', 'tr.tag_id')
        .where('tr.reference_type', 'post')
        .andWhere('tr.reference_id', post.id);

    post.tags = tags.map(function(tag) {
        return tag.name;
    }).join(', ');

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

    // Validations
    try {
        yield checkit(validations.post.new).run(body);
    } catch(err) {
        error = err;
    }

    var tags = body.tags.split(',').map(function(tag) { return tag.trim(); });

    if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };

    } else {
        var postId;
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

        this.body = {
            success: true,
            post_id: postId
        };
    }

};


// Show the edit post form
exports.edit = function* () {

    var id = this.params.id;

    var data = yield normalize({
        path: '/posts/' + id +'/edit',
        req: this
    });

    var markup = React.renderToString(
            <App data={data} history="true" path={"/posts/" + id + "/edit"} />
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

    // Validations
    try {
        yield checkit(validations.post.update).run(body);
    } catch(err) {
        error = err;
    }

     if (error) {
        this.body = {
            success: false,
            errors: JSON.stringify(error)
        };

    } else {
        var update = yield knex('posts')
            .where('id', id)
            .update({
            title: body.title,
            body: body.body,
            slug: body.slug,
            excerpt: body.excerpt,
            published: body.published,
            updated_at: new Date()
        }, 'id');
        this.body = {
            success: true,
            post_id: update[0]
        };
    }

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

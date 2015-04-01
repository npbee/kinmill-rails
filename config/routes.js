var React = require('react');
var render = require('../lib/render');
var App = require('../components/App.react');
var db = require('../lib/db');
var normalize = require('./routeHelpers/normalizeAPIResponse');

exports.posts = require('./routes/posts');
exports.projects = require('./routes/projects');
exports.admin = require('./routes/admin');
exports.auth = require('./routes/auth');
exports.tags = require('./routes/tags');

exports.index = function *() {
    var isClient = this.request.query.isClient;

    var latestPost = yield db('posts')
                                    .select('title', 'slug')
                                    .orderBy('created_at', 'desc')
                                    .where('published', true)
                                    .limit(1);

    var latestProject = yield db('projects')
                                    .select('name', 'slug')
                                    .orderBy('created_at', 'desc')
                                    .where('published', true)
                                    .limit(1);


    var data = yield normalize({
        posts: latestPost[0],
        projects: latestProject[0],
        req: this,
        path: '/'
    });

    if (isClient) {
        this.body = yield data;
        return;
    }

    var markup = React.renderToString(
            <App data={data} history="true" path="/" />
            );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });
};

exports.connect = function *() {
    var isClient = this.request.query.isClient;

    var data = yield normalize({
        req: this,
        path: '/connect'
    });

    if (isClient) {
        this.body = yield data;
        return;
    }


    var markup = React.renderToString(
            <App data={data} history="true" path="/connect" />
            );

    this.body = yield render('default', {
        markup: markup,
        state: JSON.stringify(data)
    });
};

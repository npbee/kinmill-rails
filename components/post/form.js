var React = require('react');
var request = require('superagent');
var navigate = require('react-mini-router').navigate;
var Tabs = require('../shared/tabs/Tabs');
var marked = require('../../lib/marked');
var _ = require('lodash');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            errors: {},
            previewText: '',
            tags: this.props.post.tags || []
        }
    },

    componentDidMount: function() {
        
    },

    handleBefore: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
        var html = marked(this.props.post.body) || '';
        this.setState({
            previewText: html
        });
    },

    addTag: function(e) {
        if (e.key === 'Enter') {
            var tags = this.refs.tags.getDOMNode().value.trim();
            var newTags = this.state.tags.concat({
                name: tags
            });

            this.setState({
                tags: newTags
            });

            // Stop the form from submitting
            e.preventDefault();
        }
    },

    render: function() {

        return (
            <section>
            <form 
                action={this.props.action} 
                method={this.props.method} 
                onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <label htmlFor="title">Title</label>
                    <input type="text" 
                        name="title"
                        ref="title" 
                        value={this.props.post.title} 
                        onChange={this.props.onChange}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="body">Body</label>
                    <Tabs
                        onBeforeChange={this.handleBefore}>
                        <Tabs.Panel title="Markdown">
                            <textarea 
                                name="body" 
                                ref="body"
                                value={this.props.post.body}
                                onChange={this.props.onChange}></textarea>
                        </Tabs.Panel>
                        <Tabs.Panel title="Preview">
                            <article dangerouslySetInnerHTML = {{__html: this.state.previewText }}></article>
                        </Tabs.Panel>
                    </Tabs>
                </div>

                <div className="form-row">
                    <label htmlFor="slug">Slug</label>
                    <input 
                        type="text" 
                        name="slug" 
                        ref="slug"
                        value={this.props.post.slug}
                        onChange={this.props.onChange} />
                </div>

                <div className="form-row">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" ref="tags" 
                        onKeyDown={this.addTag} />
                    {this.state.tags.map(function(tag, index) {
                        return <a onClick={this.flagTagForDelete.bind(this, index)} key={index}>{tag.name}</a>;
                    }, this)}
                </div>

                <div className="form-row">
                    <label htmlFor="excerpt">Excerpt</label>
                    <input 
                        type="text" 
                        name="excerpt" 
                        ref="excerpt"
                        value={this.props.post.excerpt}
                        onChange={this.props.onChange} />
                </div>

                <div className="form-row">
                    <div className="checkbox">
                        <input type="checkbox" name="published" ref="published" />
                        <label htmlFor="published">Published?</label>
                    </div>
                </div>

                <div className="form-row">
                    <button type="submit">Submit</button>
                </div>

                <pre>{this.state.errors}</pre>
                </form>
                <a id="delete" onClick={this.handleDelete} >Delete</a>
                </section>
        );
    },

    flagTagForDelete: function(i) {
        var tag = this.state.tags[i];
        _.extend(tag, { _delete: true });
    },

    handleSubmit: function(e) {
        var self = this;

        e.preventDefault();
        var id = this.props.post.id || null;
        var title = this.refs.title.getDOMNode().value.trim();
        var body = this.refs.body.getDOMNode().value.trim();
        var slug = this.refs.slug.getDOMNode().value.trim();
        var tags = this.state.tags;
        var excerpt = this.refs.excerpt.getDOMNode().value.trim();
        var published = this.refs.published.getDOMNode().value.trim();

        request[this.props.method](this.props.action)
            .send({
                id: id,
                title: title,
                body: body,
                slug: slug,
                tags: tags,
                excerpt: excerpt,
                published: published
            })
            .end(function(res) {
                var response = JSON.parse(res.text);
                if (response.success) {
                    navigate('/posts');
                } else {
                    self.setState({
                        errors: response.errors
                    });
                }
            });
    },

    handleDelete: function(e) {
        var self = this;

        e.preventDefault();
        var id = this.props.post.id;
        
        request.del(this.props.action)
            .send({
                id: id
            })
            .end(function(res) {
                var response = JSON.parse(res.text);
                if (response.success) {
                    navigate('/posts');
                } else {
                    self.setState({
                        errors: response.errors
                    });
                }
            });
    }

});

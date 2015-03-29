var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            post: this.props.post || {},
            project: this.props.project || {}
        }
    },

    componentDidMount: function() {
       var self = this;

       if (!Object.keys(this.state.project).length) {
           request.get('/')
            .query({
                isClient: true
            })
            .end(function(res) {
                var data = JSON.parse(res.text);
                self.setState({
                    project: data.project,
                    post: data.post
                });
            });
       }
    },

    render: function(){

        var postSnippet;
        var projSnippet;

        if (this.state.post) {
            postSnippet = <Snippet title={this.state.post.title} tagline="Latest Post" url={'posts/' + this.state.post.slug} />
        }

        if (this.state.project) {
            projSnippet = <Snippet title={this.state.project.name} tagline="Latest Project" url={'projects/' + this.state.project.slug} />
        }

        return (
            <section className="home skinny">
                <div className="grid grid--centered">
                    <div className="avatar grid--1-2 grid--left">
                        <img className="avatar__image" src="/static/images/me_alt.jpeg" />
                        <div className="avatar__summary">
                            <p className="avatar__summary__item">
                            Nick Ball
                            </p>
                            <p className="avatar__summary__position avatar__summary__item">
                                Jr. Software Engineer
                            </p>
                            <p className="avatar__summary__employer avatar__summary__item">
                                @ Loudr
                            </p>
                        </div>
                    </div>
                    <div className="tagline grid--1-2 grid--last">
                        <p className="tagline__item">Development +</p>
                        <p className="tagline__item">Design +</p>
                        <p className="tagline__item">Etc.</p>
                    </div>
                </div>
                <hr className="rule rule--small" />
                <div className="center">
                    {postSnippet}
                    {projSnippet}
                </div>
            </section>
            )

    }

});
//<Snippet title={this.state.post.title} tagline="Latest Post" url={'posts/' + this.state.post.slug} />
//<Snippet title={this.state.project.name} tagline="Latest Project" url={'projects/' + this.state.project.slug} />

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
                query: 'isReact'
            })
            .end(function(res) {
                var data = JSON.parse(res.text);
                self.setState({
                    project: data.latestProject,
                    post: data.latestPost
                });
            });
       }
    },

    render: function(){

        return (
            <section className="home skinny">
                <div className="grid">
                    <div className="avatar grid--one-quarter grid--push-one-quarter">
                        <img className="avatar__image" src="/static/images/me.png" />
                        <div className="avatar__summary">
                            <p className="avatar__summary__position">
                                Jr. Software Engineer
                            </p>
                            <p className="avatar__summary__employer">
                                @ Loudr
                            </p>
                        </div>
                    </div>
                    <div className="tagline grid--one-half-last">
                        <p className="tagline__item">Development +</p>
                        <p className="tagline__item">Design +</p>
                        <p className="tagline__item">Me</p>
                    </div>
                </div>
                    <Snippet title={this.state.post.title} tagline="Latest Post" url={'posts/' + this.state.post.slug} />
                <Snippet title={this.state.project.name} tagline="Latest Project" url={'projects/' + this.state.project.slug} />
            </section>
            )

    }

});

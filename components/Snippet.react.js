var React = require('react');

module.exports = React.createClass({
    render: function() {
        var title = this.props.title;
        var excerpt = this.props.excerpt;
        var slug = this.props.url;
        
        return (
            <a href={slug} className="snippet grid grid--centered">
                <h2 className="snippet__tagline grid--1-4 grid--push-1-4 grid--left">{this.props.tagline}</h2>
                <span className="snippet__item grid--1-2 grid--last">
                    <span>{title}</span>
                    <span>{excerpt}</span>
                </span>
            </a>
            )
    }
});

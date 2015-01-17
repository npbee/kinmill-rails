var React = require('react');
var NavItem = require('./NavItem.react');
var NavActions = require('../../actions/NavActions');
var NavStore = require('../../stores/NavStore');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      selected: 'home',
      items: ['projects', 'posts', 'connect'],
      isOpen: NavStore.isOpen(),
      isClosed: true,
      isFirstLoad: true
    }
  },

  componentDidMount: function() {
      NavStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
      NavStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var selected = this.props.selected || this.state.selected;
    var self = this;
    var isAuthenticated = this.props.isAuthenticated;

    return (
      <nav className='main-nav' >
          <a href="/" className="site-logo"><img className="icon" src="/static/images/logo.svg" /></a>
          <a href="#" className="site-logo main-nav__toggle" onClick={this._onClick}><img className="icon" src="/static/images/logo.svg" /></a>
          <div className="main-nav__menu">
              {this.state.items.map(function(result) {
                  var className = result === selected ? 'active' : '';
                  return <NavItem 
                      key={result} 
                      data={result} 
                      className={className} 
                      navigate={self._onNavigate} />;
              })}
          </div>
          <div className="main-nav__social main-nav__break-right">
              <a className="main-nav__break-right"><img className="icon" src="/static/images/icons/icomoon/twitter.svg" /></a>
              <a className=""><img className="icon" src="/static/images/icons/icomoon/mail.svg" /></a>
              <a className=""><img className="icon" src="/static/images/icons/github/mark.svg" /></a>
          </div>
          {isAuthenticated ? <a href='/logout'>Logout</a> : ''}
      </nav>
      )
  },

  _onClick: function(e) {
      e.preventDefault();
      NavActions.toggle();
  },

  _onNavigate: function() {
      NavActions.close();
  },

  _onChange: function() {
  }
});

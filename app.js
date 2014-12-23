var React = require('react');
var App = require('./components/App.react');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

React.render(
    <App data={initialState} history="true" path={initialState.path} />,
    document.getElementsByTagName('body')[0]
    );

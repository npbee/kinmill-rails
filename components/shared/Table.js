var React = require('react/addons');
var request = require('superagent');
var _ = require('lodash');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var _ = require('lodash');

module.exports = React.createClass({

    getInitialState: function() {
        var hasId = this.props.data.every(function(item) {
            return item['id'] !== null;
        });

        if (!hasId) {
            console.error("An admin table must supply id's for each row.");
        }

        return {
            data: this.props.data || [],
            name: this.props.name || null,
            admin: this.props.admin || false
        }
    },

    componentWillReceiveProps: function(newProps) {
        this.setState(newProps);
    },

    componentDidMount: function() {
        //AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        //AppStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var self = this;
        var columns = this.generateColumns(this.props.data);
        var rows = this.props.data.map(function(row, index) {
            return (
               <tr key={row.id}>
                {columns.map(function(column, index) {
                    return <td key={row[column]}>{row[column].toString()}</td>
                    })}
                    {self.state.admin ?
                        <td>
                            <a href={self.state.name.toLowerCase() + '/' + row.id}>View</a>
                            /
                            <a href={self.state.name.toLowerCase() + '/' + row.id + '/edit'}>Edit</a>
                            /
                            <a data-id={row.id} onClick={self.handleDelete.bind(null, row.id)}>Delete</a>
                        </td> :
                            ''
                    }
                </tr>
            )
        }.bind(this));

        return <table>
            <caption>{this.props.name} <a className="button" href={`${this.props.name}/new`}>{'New ' + _.trimRight(this.props.name, 's')}</a></caption>
            <thead>
                <tr>
                    {columns.map(function(column) {
                        return <th key={column}><a onClick={this.props.onSort.bind(null, column)}>{column}</a></th>
                    }, this)}
                    {this.props.admin ? <th><a>Actions</a></th> : ''}
                </tr>
            </thead>
            <ReactCSSTransitionGroup transitionName="table-row" component="tbody">
                {rows}
            </ReactCSSTransitionGroup>
            {rows.length ? null : <tbody><tr><td>Nothing here...</td></tr></tbody>}
        </table>

    },

    generateColumns: function(data) {
        if (!data[0]) return [];
        var columns = Object.keys(data[0]);
        return columns;
    },

    handleDelete: function(id) {
        var self = this;

        // Create a copy of the data for undo
        var savedData = _.cloneDeep(self.state.data);

        var newData = self.state.data.filter(function(item) {
            return item.id !== id;
        });

        self.setState({
            data: newData
        });

        AppActions.undo(function() {
            self.setState({
                data: savedData
            });
        }, function() {
            self.realDelete(id);
        });

    },

    realDelete: function(id) {
        var self = this;

        var newData = self.state.data.filter(function(item) {
            return item.id !== id;
        });

        request.del('/' + self.state.name.toLowerCase())
        .send({
            id: id
        })
        .end(function(res) {
            var response = JSON.parse(res.text);
            if (response.success) {
                self.setState({
                    data: newData
                });
            } else {
                self.setState({
                    errors: response.errors
                });
            }
        });
    },

    _onChange: function() {
    }
});

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Filters extends Component {
  constructor(props){
    super(props)
  }
  handleFilterChange(event) {
    var value = event.target.value;
    this.props.updateFilter(value);
  }
  render() {
    return <input type="text" ref="filterInput" onChange={this.handleFilterChange.bind(this)} placeholder="Filter" />;
  }
}

class List extends Component {
  render() {
    var content;
    if (this.props.items.length > 0) {
      var items = this.props.items.map(function(item) {
        return <li>{item}</li>;
      });
      content = <ul>{items}</ul>
    } else {
      content = <p>No items matching this filter</p>;
    }
    return (
      <div className="results">
        <h4>Results</h4>
        {content}
      </div>
    );
  }
}

class ListContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      listItems: ['Chicago', 'New York', 'Tokyo', 'London', 'San Francisco', 'Amsterdam', 'Hong Kong'],
      nameFilter: ''
    }
  }
  handleFilterUpdate(filterValue) {
    this.setState({
      nameFilter: filterValue
    });
  }
  render() {
    var displayedItems = this.state.listItems.filter(function(item) {
      var match = item.toLowerCase().indexOf(this.state.nameFilter.toLowerCase());
      return (match !== -1);
    }.bind(this));

    return (
      <div>
        <Filters updateFilter={this.handleFilterUpdate.bind(this)} />
        <List items={displayedItems} />
      </div>
    );
  }
};

class App extends Component {
  render() {
    return (
      <ListContainer/>
    )
  }
}

/*
class App extends Component {

  constructor(){
    super()
    this.state = {
      searchFilter: '',
    }
  }

  render() {
    return (
      <div className="App">
        <SearchBar onChange=/>
        <Messages search={this.state.searchFilter}/>
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: props.search
    }
  }
  render() {
    return (
      <div className="searchBar">
        <input id="search" onChange={this.handleFilterChange}/>
      </div>
    );
  }
  handleFilterChange(event) {
    var value = event.value
    this.props.updateFilter(value);
  }
}

class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      filter: props.search
    }
  }
  componentDidMount(){
    fetch(`http://localhost:8082/api/messages?filter=${this.state.filter}`)
    .then(results => results.json())
    .then(data => {
      this.setState({messages: data})
    })
  }
  render() {
    console.log('Messages'  + this.props.search)
    const lines = this.state.messages.map((message, i) => (
        console.log(message)
      ))
    
    return (
      <div className="messages">
        {lines}
      </div>
    );
  }
}
*/

export default App;

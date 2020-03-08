import React, { Component } from 'react';
// import styled from 'styled-components';
import classes from '../containers/App.css';
import Persons from '../components/Persons/Persons';
import Validation from '../Validation/Validation';
import Char from '../Char/Char';
import Cockpits from '../components/Cockpits/Cockpits';
import Aux from '../hoc/Aux';
import withClass from '../hoc/WithClass';
import AuthContext from '../context/auth-context';
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] contructor');
    this.state = {
      persons: [
        {id: '1313', name: 'Nitesh', age: 24},
        {id: '1213', name: 'Virat', age: 31},
        {id: '1093', name: 'Rohit', age: 29}
      ],
      otherstate: 'some other value',
      showPerson: false,
      userInput: '',
      showCockpits: true,
      changeCounter: 0,
      authenticated: false
    }
  }

  // state = {
  //   persons: [
  //     {id: '1313', name: 'Nitesh', age: 24},
  //     {id: '1213', name: 'Virat', age: 31},
  //     {id: '1093', name: 'Rohit', age: 29}
  //   ],
  //   otherstate: 'some other value',
  //   showPerson: false,
  //   userInput: ''
  // }

  static getDrivedStateFromProps(props, state){
    console.log('[App.js] getDrivedStateFromProps', props);
    return state;
  }

  // componentWillMount(){
  //   console.log('[App.js] component will mount');
  // }
  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }
  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  deleteChar = (charIndex) => {
    const text = this.state.userInput.split('');
    text.splice(charIndex, 1);
    const updatedText = text.join('');
    this.setState({userInput: updatedText})
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return { 
        persons: persons, changeCounter: prevState.changeCounter + 1 
      }
    })
  }

  textLength = (event) => {
    this.setState({
      userInput: event.target.value
    });
  }
  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({showPerson: !doesShow});
  }

  loginInHandler = () => {
    this.setState({authenticated : true});
  }

  render() {
    console.log('[App.js] render');
    const charList = this.state.userInput.split('').map((char, index) => {
      return <Char 
      click= {() => this.deleteChar(index)}
      character={char} 
      key={index}/>
    });
    
    // const StyledButton = styled.button`
    //   background-color: ${props => props.alt ? 'red' : 'green'};
    //   color: white;
    //   font: inherit;
    //   border: 1px solid blue;
    //   padding: 8px;
    //   cursor: pointer;

    //   &:hover {
    //     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    //     color: black;
    //   }
    // `;

    // const style = {
    //   background-color: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     background-color: 'lightgreen',
    //     color: 'black'
    //   }
    // }

    let persons = null;
    let btnProp = '';
    if(this.state.showPerson){
      persons = <Persons 
          persons= {this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
      />;
          btnProp.split().push(classes.red);
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'lightred',
      //   color: 'black'
      // }
    }
    return (
      <Aux>
      <button onClick={() => {
        this.setState({ showCockpits: false });
      }}>
      Remove Cockpits
      </button>
      <AuthContext.Provider value={{ authenticated: this.state.authenticated, login: this.loginInHandler }}>
        { this.state.showCockpits ? (<Cockpits  
          showPersons = {this.state.showPersons} 
          personsLength={this.state.persons.length}
          clicked={this.togglePersonHandler}
          title={this.props.appTitle}
          />
        ) : null }
          {persons}
        </AuthContext.Provider>
        <input 
          type="text" 
          onChange={this.textLength} />
        <br/>
        <Validation inputLength={this.state.userInput.length}/>
        {this.state.userInput}
        {charList}
        </Aux>
    );

    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'using react app'))
  }
}

export default withClass(App, classes.App);

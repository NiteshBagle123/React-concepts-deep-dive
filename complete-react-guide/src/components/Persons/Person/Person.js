import React, { Component, Fragment } from 'react';
import Aux from '../../../hoc/Aux';
// import styled from 'styled-components';
import classes from './Person.css';
import withClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

// const StyledDiv = styled.div`
//                     width: 60%;
//                     margin: 16px auto;
//                     border: 1px solid #eee;
//                     box-shadow: 0 2px 3px #ccc;
//                     padding: 16px;
//                     text-align: center;

//                     @media(min-width: 500px){
//                     width: 450px
//                     }
//                     `
class Person extends Component {
    constructor(props){
        super(props)
        this.inputElementRef = React.createRef()
    }

    static contextType = AuthContext;
    componentDidMount(){
        // this.inputElement.focus();
       this.focusInput();
        console.log(this.context.authenticated);
    }

    focusInput(){
        this.inputElementRef.current.focus();
    }
    render(){
        console.log('[Person.js] rendering');
        return (
        <Aux>
            {this.context.authenticated ? <p>Authenticated</p> : <p>Please login</p>}
                <p key="i1" onClick={this.props.click}>myself {this.props.name} and I'm {this.props.age} old!</p>
                <p key="i2">{this.props.children}</p>
                <input 
                    key="i3" 
                    // ref={(inputEl) => { this.inputElement = inputEl }}
                    ref = {this.inputElementRef}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}
                />
        </Aux> )  
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.string,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);

import React, { Component,  PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props){
        super(props);
        this.lastPersonRef = React.createRef();
    }
    componentWillReceiveProps(props){
        console.log('[Persons.js] componentWillReceiveProps');
    }
    static getDerivedStateFromProps(props, state){
        console.log('[Persons.js] getDerivedStateFromProps');
        return state;
    }

    // Check for avoiding rendering of person component when nothing changed with shallow comparision
    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if(nextProps.persons !== this.props.persons 
    //         || nextProps.clicked !== this.props.clicked 
    //         || nextProps.changed !== this.props.changed){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'snapshot of component before update!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js] componentDidUpdate');
        console.log('Snapshot message', snapshot);
    }
    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount');
    }
    render(){
        console.log('[Persons.js] rendering');
        return (
        this.props.persons.map((person, index) => {
                return (
                    <Person
                        click={() => this.props.clicked(index)}
                        name={person.name} 
                        age={person.age}
                        ref={this.lastPersonRef}
                        changed={(event, id) => this.props.changed(event, person.id)} 
                    />
                );
            })
    );
    }
}

export default Persons;

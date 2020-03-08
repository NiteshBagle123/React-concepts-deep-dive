import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpits.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);
    useEffect(() => {
        console.log('[Cockpits.js] useEffect');
        // setTimeout(()=> { alert('Save data to cloud') }, 1000)
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpits.js] cleanup work');
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpits.js] 2 useEffect');
        return () => {
            console.log('[Cockpits.js] 2 cleanup work');
        }
    })
    const assignedClasses = [];
    let btnProp = '';

    if(props.showPersons){
        btnProp = classes.red;
    }
    if(props.personsLength <= 2){
    assignedClasses.push(classes.red);
    }

    if(props.personsLength <= 1){
    assignedClasses.push(classes.bold);
    }
    return(
        <div className={classes.cockpit}>
            <h1>{props.title}</h1>
            <h2 className={assignedClasses.join(' ')}>Added content in React App!</h2>
            <button ref={toggleBtnRef}className={btnProp}
                onClick={props.clicked}>
                Toggle Persons
            </button>
                <button onClick={authContext.login}>Login In</button>
        </div>
    );
};

export default React.memo(cockpit);

import React, { Component } from 'react';
// <----First way of creating higher order component------>
// const withClass = props => (
//     <div className={props.classes}>{props.children}</div>
// )

// const withClass = (WrappedComponent, className) => {
//     return props => (
//         <div className={className}>
//             <WrappedComponent {...props}/>
//         </div>
//     );
// }

const withClass = (WrappedComponent, className) => {
    return class extends Component {
        render(){
            return (
                <div className={className}>
                <WrappedComponent {...this.props}/>
            </div>
            )
        }
    }
}
export default withClass;
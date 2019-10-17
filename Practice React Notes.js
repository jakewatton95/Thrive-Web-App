/*

curly braces means: "interpret as javascript"

import App from App.js

const title = 'React with Webpack and Babel'

ReactDOM.render(
  <App title={title} />,
  document.getElementById('root')
);

App.js

import React from 'react';
const App = (props) =>
  <div>{props.title}</div>;
export default App;

OR

import React from 'react';
const App = ({title}) =>
  <div>{title}</div>;
export default App;

Notice that passing a parameter in curly braces is the equivalent of saying, 
some object with the title field was passed in, then use that title field 
in the div

--------------------------------------------
Always use className instead of class!


----------------------------------------------
using methods from class

class X extends Component {
  yourMethodHere(){
    ...
    ...  
  }
  
  render() {
    this.yourMethodHere() OR const Y = this.yourMethodHere()
    return (
      whateves
      ALSO WE HAVE TO USE THIS.PROPS in a class
    )
  }
}


Anytime you wawnt to use setstate, you have to bind 
  prevSstate is old version of state
  
  this.setState({key: value}) is end result so if you have a fct in there it 
  must return a key val object
  
  
  lifecycle methods:
    componentDidMount()
      not run on rerender
      used to get API call from external store after comp mounted
      
    componentWillReceiveProps(nextProps)
      every time it receives props this runs (including rerenders)
      check to see if incoming props are new? if not, ignore, if they are
      do some work
      deprecated, dont use!
      
    shouldComponentUpdate(nextProps, nextState)
      optimization to llow component to decide to update or naw
      body must return true or false (update or naw)
      false is more performant
      
    componentWillUnmount
      cleanup or teardown of anything you set up that could lead to clutter
      if you made a listener in componentDidMount, remove it here
      
    static getDerivedStateFromProps(props, state)
      returns new updated state based upon props
      react team wrote a blog about how you dont need this
      idea is for the rare cases where component needs to take incoming props 
      and set its own state based upon props 
      
    getSnapshotBeforeUpdate
      create a backup of way things are
      propbably an object with data , a snapshot
      
    use state for isloading 
    conditional rendering displays that you are loading c
    
    //use the following for reference when using input 
    handleChange(event) {
      this.setState({
        firstName: event.target.value 
      })
    }
    
    wrap strings from objects in square brackets
    [event.target.name]
    
    give the input a name prpoerty that matches a prpoperty in state
    
    best practice is to pull out of event.target before setting state 
*/
import React from 'react'
import axios from 'axios'

const WithClickTracking = (Component) => (props) => {

  //Accounts for Functional and Class Components
  let moduleName = Component.name || Component.constructor.name;

  function getClickData(e) {
    let timeOfClick = new Date().toString()
    let moduleClicked = e.currentTarget.id
    let elementClicked = e.target.tagName

    axios.post('/interactions', {
      element: elementClicked,
      widget: moduleClicked,
      time: timeOfClick
    })
    .then(results => {
      console.log(results.data)
    })
    .catch(err => {
      console.log(err)
    })

  }

  return (
    <div id={`${moduleName}`} onClick={getClickData}>
      <Component {...props}/>
    </div>
  )
}

export default WithClickTracking
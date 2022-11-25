import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component { 
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact:PropTypes.func.isRequired
  }

  state = {
    query: ''
  }
  
updateQuery = (query) => {
  this.setState ({query: query.trim()})
}


  render(){
    const {contacts,onDeleteContact} = this.props
    const {query} = this.state
let showingContacts 
if(query){
  // what below does is escaping all special characters and considering them as strings
const match = new RegExp(escapeRegExp(query), 'i')
showingContacts = contacts.filter((contact)=>match.test(contact.name))
}
else{
  showingContacts= contacts
}
showingContacts.sort(sortBy ('name'))
  return(
    <div>
    
        <div className='list-contacts'> 
        <div className='list-contacts-top'> </div>
        <input className='search-contacts' 
        type ='text'
        placeholder='search contacts'
        value={this.state.query}
        onChange = {(event)=> this.updateQuery(event.target.value)}
        ></input>
            </div>
    <ol className= 'contact-list'> 
    {this.props.contacts.map( (contact) => ( 
<li key={contact.id } className='contact-list-item'> 
{contact.name}
<div className='contact-avatar' 
style = {{
  backgroundImage: `url(${contact.avatarURL})`
}}
/>
<div className='contact-details'>
<p>{contact.name}</p>
<p>{contact.email}</p>
</div>

<button 
onClick={()=>onDeleteContact(contact)} 
className='contact-remove'> Remove </button>

</li>
    ) 
    )}
</ol>
</div>
  )
}
}

export default ListContacts


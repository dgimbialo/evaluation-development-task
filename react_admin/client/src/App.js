import React from 'react';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'

import UserList from './components/UserList.js'
import UserCreate from './components/UserCreate'
import UserEdit from './components/UserEdit'

function App() {
  return <Admin dataProvider={restProvider('http://localhost:3000')}>
    <Resource 
    name='users' 
    list={UserList}
    create={UserCreate}
    edit={UserEdit}
    />
  </Admin>
}

export default App
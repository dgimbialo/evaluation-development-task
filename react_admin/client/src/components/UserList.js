import React from 'react'
import { 
    List, 
    Datagrid, 
    TextField,
    EditButton, 
    DeleteButton
} 
from 'react-admin'

const UserList = (props) => {
    return <List {...props}>
    <Datagrid>
        <TextField source='id' />
        <TextField source='userId' />
        <TextField source='url' />
        <TextField source='at' />
        <EditButton basePath='/users'/>
        <DeleteButton basePath='/users'/>
    </Datagrid>
    </List>

}

export default UserList
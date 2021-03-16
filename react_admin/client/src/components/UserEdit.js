import React from 'react'
import { Edit, SimpleForm, TextInput} from 'react-admin'

const UserEdit= (props) => {
    return (
    <Edit title='EditUser' {...props}>
    <SimpleForm>
        <TextInput source='id' />
        <TextInput source='userId' />
        <TextInput source='url' />
    </SimpleForm>
    </Edit>
    )
}

export default UserEdit
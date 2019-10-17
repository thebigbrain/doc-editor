import React from 'react'
import {OfficialTemplate} from './OfficialTemplate'
import {UserTemplate} from './UserTemplate'

export default (props) => props.template.niceName ? (<OfficialTemplate {...props}/>) : (<UserTemplate {...props}/>);

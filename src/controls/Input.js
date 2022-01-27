import React from 'react'
import { TextField,  } from '@material-ui/core';

export default function Input(props) {

    const { name,file, label, value,error=null, onChange } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            file={file}
            {...(error && {error:true,helperText:error})}
        />
        
        
        
    )
}

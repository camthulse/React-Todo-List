import React from 'react'

const EditableField = (props) => {
    return (
        <div>
            {
                props.active ?
                <input type="text" onKeyDown={props.textChange} onBlur={props.onBlur} autoFocus={true} /> :
                <p className={props.status ? 'checked' : ''} onDoubleClick={props.doubleClick}>{props.value}</p>
            }
        </div>
    )
}

export default EditableField
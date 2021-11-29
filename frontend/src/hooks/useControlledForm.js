import React, { useState } from 'react'

const useControlledForm = ({initialState}) => {

    const [formState, setFormState] = useState(initialState)

    const formChangeHandler= (e) => { 
        const newState = {
            ...formState, 
            [e.target.id]: e.target.value
        }
        setFormState(newState)
    }

    return [formState, formChangeHandler]
}

export default useControlledForm

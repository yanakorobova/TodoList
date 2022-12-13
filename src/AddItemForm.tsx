import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string>('')

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim())
        } else setError('Title is required')
        setTitle('')
    }
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        e.key === 'Enter' && addItem()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value.trimStart())
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onEnter}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};


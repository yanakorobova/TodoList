import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type EditableSpanPropsType = {
    title: string,
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const change = () => title !== props.title && props.changeTitle(title)
    const activateEditModule = () => {
        setIsEditMode(!isEditMode)
        change()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value.trimStart())
    }
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            change()
            setIsEditMode(!isEditMode)
        }
    }
    return (
        isEditMode ?
            <input value={title}
                   onBlur={activateEditModule}
                   onChange={onChangeHandler}
                   onKeyDown={onEnter}
                   autoFocus/>
            : <span onDoubleClick={activateEditModule}>{title}</span>
    );
};


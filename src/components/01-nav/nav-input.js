import {useRef} from 'react';

export const NavInput = (props) => {

    const userNameInput = useRef();

    const submitHandler = () => {
        props.searchUser(userNameInput.current.value);
    }

    return (
        <>
            <input ref={userNameInput}/>
            <button onClick={submitHandler}>Submit</button>
        </>
    );
}
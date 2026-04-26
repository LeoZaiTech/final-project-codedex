import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function UserForm () {
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setName(inputName);
        navigate('/quiz');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">What's your name? </label>
            <input
            id="name"
            type="text"
            value={inputName}
            onChange={(e) =>setInputName(e.target.value)}
            placeholder="Enter your name"
            />
            <button type="submit">Start Quiz</button>
             </form>
    );
}
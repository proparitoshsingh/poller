import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/polls', {
                question,
                options,
            });
            alert('Poll created successfully!');
            setQuestion('');
            setOptions(['', '']);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <CreatePollContainer>
            <h2>Create a Poll</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                        required
                    />
                ))}
                <button type="button" onClick={() => setOptions([...options, ''])}>
                    Add Option
                </button>
                <button type="submit">Create Poll</button>
            </form>
        </CreatePollContainer>
    );
};

const CreatePollContainer = styled.div`
    background: #414045;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 2rem auto;

    @media (max-width: 600px) {
        padding: 1rem;
    }

    button {
        margin-right: 0.5rem;
    }
`;

export default CreatePoll;
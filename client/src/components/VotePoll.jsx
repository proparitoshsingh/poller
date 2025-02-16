import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const VotePoll = ({ pollId }) => {
    const [pollData, setPollData] = useState(null);

    useEffect(() => {
        const fetchOptions = async () => {
            const response = await axios.get(`http://localhost:3000/api/polls/${pollId}`);
            setPollData(response.data);
            console.log(response.data);
        };
        fetchOptions();
    }, [pollId]);

    const handleVote = async (optionId) => {
        try {
            await axios.put(`http://localhost:3000/api/polls/${pollId}/vote`, { optionId });
            const response = await axios.get(`http://localhost:3000/api/polls/${pollId}`);
            setPollData(response.data);
            alert('Vote recorded!');
        } catch (err) {
            console.error(err);
        }
    };

    if (!pollData) return <div>Loading...</div>;

    return (
        <VotePollContainer>
            <h2>{pollData.question}</h2>
            <h3>Vote Options:</h3>
            {pollData.options.map((option) => (
                <Option key={option.id}>
                    <span>{option.text}</span>
                    <button onClick={() => handleVote(option.id)}>Vote</button>
                </Option>
            ))}
        </VotePollContainer>
    );
};

const VotePollContainer = styled.div`
    background: #414045;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 2rem auto;

    @media (max-width: 600px) {
        padding: 1rem;
    }
`;

const Option = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #414045;

    button {
        background-color: #28a745;

        &:hover {
        background-color: #218838;
        }
    }
`;

export default VotePoll;
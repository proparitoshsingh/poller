import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PollResults = ({ pollId }) => {
    const [pollData, setPollData] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/polls/${pollId}`);
                setPollData(response.data);
            } catch (error) {
                console.error('Error fetching poll results:', error);
            }
        };

        fetchResults();
        const interval = setInterval(fetchResults, 5000);
        return () => clearInterval(interval);
    }, [pollId]);

    if (!pollData) return <div>Loading results...</div>;

    return (
        <ResultsContainer>
            <h2>Poll Results: {pollData.question}</h2>
            {pollData.options.map((option) => (
                <ResultItem key={option.id}>
                    <span>{option.text}</span> {/* Changed from option_text to text */}
                    <span>{option.votes} votes</span>
                </ResultItem>
            ))}
        </ResultsContainer>
    );
};

const ResultsContainer = styled.div`
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

const ResultItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #414045;
`;

export default PollResults;
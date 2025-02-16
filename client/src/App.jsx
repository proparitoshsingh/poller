import './App.css'
import CreatePoll from './components/CreatePoll';
import VotePoll from './components/VotePoll';
import PollResults from './components/PollResults';

const App = () => {
  const pollId = 3;

  return (
    <>
      <div className="container">
        <h1>The Poller</h1>
        <CreatePoll />
        <VotePoll pollId={pollId} />
        <PollResults pollId={pollId} />
      </div>
    </>
  );
};

export default App;

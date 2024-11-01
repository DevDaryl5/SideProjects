import "./App.css"
import CandidateCard from "./components/CandidateCard"
import Header from "./components/Header"
import Results from "./components/Results"
import Vote from "./components/Vote"
import { candidates, votes } from "./data/mockData"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


    const combinedData = votes.map(vote => {
        const candidate = candidates.find(candidate =>
            candidate.candidateId === vote.candidateId);
        return {
            ...vote,
            party: candidate?.party,
            name: candidate?.name
        };
    });

    const voteCounts = combinedData.reduce<Record<number, { candidateId: number; name: string | undefined; count: number }>>((acc, vote) => {
        const { candidateId, name } = vote;

        // Initialize the candidate in the accumulator if it doesn't exist
        if (!acc[candidateId]) {
            acc[candidateId] = { candidateId, name, count: 0 };
        }
        // Increment the vote count for the candidate
        acc[candidateId].count += 1;

        return acc;
    }, {});

    // Convert the result to an array and sort by `count` in descending order
    const result = Object.values(voteCounts)
        .sort((a, b) => b.count - a.count)
        .map(item => item.candidateId);
    //addes the totalValues field to the objects
    const candidatesWithVotes = [...candidates].map(candidate => ({
        ...candidate,
        totalVotes: voteCounts[candidate.candidateId].count || 0 // Add totalVotes based on voteCounts
    }));

    const maxVotes = Math.max(...candidatesWithVotes.map(candidate => candidate.totalVotes));
    const resultpage = candidatesWithVotes.map(candidate => ({
        ...candidate,
        isWinner: candidate.totalVotes === maxVotes
    }));

    const orderedCandidates = [...resultpage].sort((a, b) => {
        return result.indexOf(a.candidateId) - result.indexOf(b.candidateId)
    })

    return <>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly"
                    }}>
                        {candidates.map((candidate) => (
                            <CandidateCard key={candidate.candidateId} {...candidate} />
                        ))}
                    </div>} />
                <Route path="/results" element={
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly"
                    }}>

                        {orderedCandidates.map((candidate) => (
                            <Results key={candidate.candidateId} {...candidate} />
                        ))}
                    </div>
                } />
                <Route path="/votes" element={<Vote />} />
            </Routes>

            {/* <Vote /> */}
        </Router >
    </>
}

export default App

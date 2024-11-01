import { candidates, votes } from "../data/mockData"


import "./Vote.css"
const VoteComponent = ({ }) => {

    const combinedData = votes.map(vote => {
        const candidate = candidates.find(candidate => 
            candidate.candidateId === vote.candidateId);
        return {
            ...vote,
            party: candidate?.party,
            name: candidate?.name
        };
    });
    return (
            <div className="voteOuter" style={{
                width: "80vw",
                paddingLeft: "10%"
            }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Voter ID</th>
                            <th>Voter Name</th>
                            <th>Candidate ID</th>
                            <th>Candidate Name</th>
                            <th>Candidate Party</th>
                            <th>Vote Date</th>
                        </tr>
                    </thead>
                    {combinedData.map((voter) => (
                        <tbody key={voter.voterId}>
                            <td>{voter.voterId}</td>
                            <td>{voter.voterName}</td>
                            <td>{voter.candidateId}</td>
                            <td>{voter.name}</td>
                            <td>{voter.party}</td>
                            <td>{new Date(voter.voteDate).toLocaleString()}</td>
                        </tbody>
                    ))}
                </table>
            </div>
    )
}

export default VoteComponent
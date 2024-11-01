import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { votes } from "../data/mockData";
import "./Header.css"


function Nav() {
    const [selectedPage, setSelectedPage] = useState(() => {
        return localStorage.getItem("selectedPage");
      });
    const [header, setHeader] = useState ("Current Candidates")

    // Effect to set the initial state from localStorage on mount
  useEffect(() => {
    const savedPage = localStorage.getItem("selectedPage");
    if (savedPage) {
      setSelectedPage(savedPage);
      if (savedPage === "Election Results") {
        setHeader(` Total Voters: ${votes.length}`)
    } else {
        setHeader(savedPage)
    }
    }
  }, []);

    const handleSelectedPage = (page: string) => {
        localStorage.setItem("selectedPage", page); // Store the selected page
        setSelectedPage(page)
        if (page === "Election Results") {
            setHeader(` Total Voters: ${votes.length}`)
        } else {
            setHeader(page)
        }
    }
    return (
        <div>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1em",
                alignItems: "center"
            }}>
                <div>
                    <p>{selectedPage}</p>
                </div>
                <div className="nav-right" style={{
                    display: "flex",
                    gap: "3em"
                }}>
                    <Link to="/" className="link" onClick={() => handleSelectedPage("Current Candidates")}>View Candidates</Link>
                    <Link to="/results" className="link" onClick={() => handleSelectedPage("Election Results")}>View Results</Link>
                    <Link  to="/votes" className="link" onClick={() => handleSelectedPage("Voting Records")}>View Votes</Link>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <p style={{
                    marginBottom: "1em",
                    fontWeight: "bold",
                    fontSize: "24px"
                }}>{header}</p>
            </div>
        </div>
    )
}
export default Nav
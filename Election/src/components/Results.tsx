import { Modal, Box, LinearProgress } from "@mui/material";
import { useState } from "react";
import { votes, } from "../data/mockData";
import React from 'react';
import { ResultsType } from "../types/Results.type";
// import { Results } from "../types/Results.type";

const Results: React.FC<ResultsType> = ({ candidateId, description, name, party, pictureUrl, totalVotes, isWinner }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="card-outer" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            background: "#3b3b3b",
            width: "12em",
            height: "20em",
            paddingTop: "10px",
            gap: "10px",
            borderRadius: "10px",
            position: "relative"
        }} onClick={handleOpen}>
            {isWinner &&
                <div style={{
                    position: "absolute",
                    background: "red",
                    border: "2px solid white",
                    padding: "5px",
                    boxSizing: "border-box",
                    left: "-40px",
                    top: "-0",
                    fontSize: "15px",
                    borderRadius: "5px",
                    width: "5em",
                    textAlign: "center",
                }}>
                    Winner
                </div>
            }
            <div className="title" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "90%",
                paddingTop: "10px",
                paddingBottom: "10px",
                background: isWinner ? "#114611" : "#242424",
                borderRadius: "10px"
            }}>
                <span>{name}</span>
                <span>{party}</span>
            </div>
            <div className="picture" style={{
                display: "flex",
                justifyContent: 'center',
                position: "relative"
            }}>
                <img src={pictureUrl} alt="" style={{
                    width: "90%",
                    borderRadius: "10px",
                }} />
                <span style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "15px",
                    borderRadius: "50%",
                    background: "red",
                    border: "white solid 2px",
                    padding: "4px",
                    fontSize: "9px"
                }}>{candidateId}</span>
            </div>
            <div style={{
                width: "80%",
                marginTop: "10px",
                textAlign: "center"

            }}>
                <LinearProgress variant="determinate" value={totalVotes / votes.length * 100} />
                <p style={{
                    marginTop: "5px"
                }}>{totalVotes} / {votes.length}</p>
            </div>
            <Modal open={open} onClose={handleClose}
                onClick={(e) => e.stopPropagation()}>

                <Box sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '20%',
                    width: '60vw',
                    background: "#242424",
                    borderRadius: "10px"

                }}>
                    <span style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "1em",
                        paddingRight: "1em"
                    }}>
                        <span></span>
                        <button style={{
                        }} onClick={handleClose}>Close</button>
                    </span>
                    <div style={{
                        display: "flex",
                        height: "30vh"
                    }}>
                        <img src={pictureUrl} alt="" style={{
                            height: "90%",
                            borderRadius: "20px",
                            paddingLeft: "10px",
                            paddingRight: "10px"
                        }} />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",

                        }}>
                            <span style={{
                                fontSize: "30px",
                                fontWeight: "bold"
                            }}>{name}</span>
                            <span style={{ width: "100%" }}>{description}</span>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
export default Results
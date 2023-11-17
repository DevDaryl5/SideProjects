import CartCard from "./CartCard"
import Total from "./Total"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState } from "react";

const Cart = (props) => {

const { setCart, inCart, videos, setVideos, setInCart } = props
    const [state, setState] = useState({

        right: true,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, ["right"]: open });
        setCart(false)
    };

    return (
        <div style={{position: "relative"}}>
            <SwipeableDrawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}
                PaperProps={{
                    sx: { maxHeight: "50em", width: "30em", background: "gray" },
                }}
            >
                <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", gap: "30px", maxHeight: "75%", overflow: "auto" }} open={open}>
                    <h1>Cart</h1>
                    {videos
                        .filter(video => video.inCart)
                        .map(video => {
                            if (!inCart.includes(video)) {
                                inCart.push(video)
                                {
                                    return <div style={{ display: "flex", alignItems: "center" }}>
                                        <CartCard key={video.id} data={video} setVideos={setVideos} setInCart={setInCart} width={"350px"} height={"250px"} />
                                        <div style={{ height: "3em", marginLeft: "1em" }} onClick={() => {
                                            video.inCart = false
                                            const index = inCart.indexOf(video)
                                            inCart.splice(index)
                                            video.isFree = false
                                            setInCart(inCart.filter(video => !video.inCart))
                                        }

                                        }><DeleteForeverOutlinedIcon fontSize="large" style={{cursor: "pointer"}} /></div>
                                    </div>
                                }
                            }
                            else {
                                return <div style={{ display: "flex", alignItems: "center" }}>
                                    <CartCard key={video.id} data={video} setVideos={setVideos} setInCart={setInCart} width={"350px"} height={"250px"} />
                                    <div style={{ height: "3em", marginLeft: "0.5em", background: "none" }} onClick={() => {
                                        video.inCart = false
                                        const index = inCart.indexOf(video)
                                        inCart.splice(index)
                                        video.isFree = false
                                        setInCart(inCart.filter(video => !video.inCart))
                                    }
                                    }><DeleteForeverOutlinedIcon fontSize="large" style={{cursor: "pointer"}} /></div>
                                </div>
                            }
                        })}
                </div>
                <div style={{position: "absolute", right: "0px", padding: "2em"}}>
                    <CancelOutlinedIcon fontSize="large" style={{cursor: "pointer"}} onClick={() => setCart(false)}/>
                </div>
                <div style={{ maxHeight: "50em", position: "fixed", bottom: "13em", width: "100%" }}>
                    <hr style={{ width: "100%" }} />
                    <Total inCart={inCart} setInCart={setInCart} />
                </div>
            </SwipeableDrawer>
        </div>
    );

}

export default Cart


// 

// export default function SwipeableTemporaryDrawer(props) {
    
// }
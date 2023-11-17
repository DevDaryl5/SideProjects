import { useState } from "react"
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MovieCreationTwoToneIcon from '@mui/icons-material/MovieCreationTwoTone';

const Video = (props) => {
    const { data, setVideos, width, height, setTheaterMode, inCart, videos } = props
    const [cartVisible, setCartVisible] = useState(false)

    const handleLiked = (id) => {
        setVideos(prevVideos => {
            return prevVideos.map(video => {
                if (id === video.id) {
                    return { ...video, isLiked: !video.isLiked }
                } else {
                    return video
                }
            })
        })
    }

    const handleInCart = (id) => {
        setVideos(prevVidoes => {
            return prevVidoes.map(item => {
                if (id === item.id) {
                    return { ...item, isPurchased: true, isFree: true, inCart: true }
                } else {
                    return item
                }
            })
        })
    }

    const handleTheaterMode = (id) => {
        setTheaterMode(false)
        setVideos(prevVideos => {
            return prevVideos.map(video => {
                return {
                    ...video,
                    inTheater: false,
                }
            })
        })

        setVideos(prevVideos => {
            return prevVideos.map(video => {
                if (id === video.id) {
                    return {
                        ...video,
                        inTheater: true
                    }
                }
                return video
            })
        })
        setTheaterMode(true)
    }

    return (
        <div
            className={`video-card ${data.isFree ? "" : "hover"}`} onMouseEnter={() => setCartVisible(true)} onMouseLeave={() => setCartVisible(false)} style={{ padding: "0px", display: "flex", flexDirection: "row", boxSizing: "border-box" }}>
            <div style={{
                width: width,
                height: height,
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",

            }}>

                <div style={{ position: "relative", background: data.isFree ? "none" : "grey", paddingBottom: "8%", width: "100%", height: "88%", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" }}>
                    <video
                        style={{
                            width: width,
                            height: height,

                            opacity: data.isFree ? "1" : "0.2",

                        }} crossOrigin="anonymous"
                        controls={data.isFree}>
                        <source src={data.url} />
                    </video>
                    <div style={{
                        display: 'flex',
                        position: "absolute",
                        color: "green",
                        fontSize: "100px",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box"
                    }}>
                        <p style={{}}>{data.isFree ? "" : "$"}</p>

                    </div>
                    <div style={{
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        padding: ".5em",
                        visibility: cartVisible ? "visible" : "hidden"
                    }}>

                        <a style={{ fontSize: '40px', color: "white" }}> {!data.isFree ? "$" + data.price : ""} {!data.isFree ? (<Button onClick={() => { handleInCart(data.id) }}><AddShoppingCartIcon style={{ fontSize: '40px' }} color="action" /></Button>) : ""}</a>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <p style={{ margin: "0px" }}>{data.name}</p>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {data.isFree ? <Button onClick={() => { handleTheaterMode(data.id) }}><MovieCreationTwoToneIcon color="secondary"/></Button> : ""}
                        {data.isFree ? <Button onClick={() => { handleLiked(data.id) }}><FavoriteIcon color={data.isLiked ? "error" : "action"} /></Button> : ""}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Video
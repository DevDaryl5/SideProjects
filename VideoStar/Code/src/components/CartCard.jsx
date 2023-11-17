import { useState } from "react"

const Video = (props) => {
    const { data, width, height, } = props
    const [cartVisible, setCartVisible] = useState(false)

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

                            opacity: data.isFree ? "none" : "0.2",
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
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Video
import ShoppingBasketTwoToneIcon from '@mui/icons-material/ShoppingBasketTwoTone';

const NavBar = (props) => {
    const { setCart, cart } = props
    return (
        <div style={{
            boxSizing: "border-box",
            background: "#525E75",
            height: "4em",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "1em",
            justifyContent: "space-between",
            position: "sticky",
            zIndex: "100",
            top: "0",
        }}>
            <div style={{ padding: "1em" }}>

                <img src="src/assets/VideoStarLogo.png" style={{ width: "8em", display: "flex", alignItems: "center" }}></img>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1em", padding: "2em", boxSizing: "border-box" }}>
                <a onClick={() => { setCart(!cart) }}
                    className="hover"><ShoppingBasketTwoToneIcon fontSize='large' color={cart ? "info" : "action"} /></a>
            </div>
        </div>
    )
}

export default NavBar
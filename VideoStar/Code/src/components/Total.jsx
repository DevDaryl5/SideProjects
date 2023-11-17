const Total = (props) => {
    const { inCart } = props


    return (
        <div style={{ display: "flex", position: "absolue", marginBottom: "0px", paddingLeft: "10px", boxSizing: "border-box" }}>
                <h1>Total: ${((inCart.sort(function(a, b) {return b.id - a.id}).filter(function(item, pos) {
                    return !pos || item.id != inCart[pos - 1].id;
                })).reduce((acc, curr) => { return acc + curr.price }, 0)).toFixed(2)}</h1>
        </div>
    )
}

export default Total
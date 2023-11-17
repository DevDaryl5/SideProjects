
const Filter = (props) => {
    const { setIsFreeFilter, status, setIsPaidFilter, setIsFavoritesFilter, setLess15, setGreat15} = props

    const handleIsFreeFilter = (event) => {
        const { checked } = event.target
        setIsFreeFilter(checked)
    }

    const handeleIsPaidFilter = (event) => {
        const {checked} = event.target
        setIsPaidFilter(checked)
    }

    const handleIsFavoriteFilter = (event) => {
        const {checked} = event.target
        setIsFavoritesFilter(checked)
    }

    const handleIsGreat15 = (event) => {
        const {checked} = event.target
        setGreat15(checked)
    }

    const handleLess15 = (event) => {
        const {checked} = event.target
        setLess15(checked)
    }

    return (
        <div style={{ display: "flex" }}>
            <div className="filterOptions" style={{ textAlign: "center", width: "15em", zIndex: "50" }}>
                Favorites <input type="checkbox" onChange={handleIsFavoriteFilter} />
                Free <input type="checkbox" onChange={handleIsFreeFilter} />
                Paid <input type="checkbox" onChange={handeleIsPaidFilter} />
                <br />
                 <input type="checkbox" onChange={handleLess15} />
                &lt; 15s &gt; <input type="checkbox" onChange={(handleIsGreat15)} />
            </div>
        </div>
    )
}

export default Filter

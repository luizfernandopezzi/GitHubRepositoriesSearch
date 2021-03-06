const SearchBox = ({totalCount, pageCount, queryString, onQueryChange, onTotalChange, queryUser, onQueryUserChange, onChangeUserRepo}) => {
    return(
        <div className="d-flex align-items-center bg-light px-3 py-2 small rounded-3">
            <div className="d-flex align-items-center flex-grow-1">
                <label htmlFor="queryUser" className="me-2 fw-bold text-secondary">
                    User
                </label>
                <input
                    id="queryUser"
                    className="form-control form-control-sm me-2"
                    type="text"
                    value={queryUser}
                    onChange={(event)=>onQueryUserChange(event.target.value)}
                />
                <button
                    className="btn mx-1 me-2 btn-sm btn-primary bi bi-arrow-right"
                    onClick={() => (onChangeUserRepo(queryUser))}>
                </button>
            </div>
            <div className="d-flex align-items-center flex-grow-1">
                <label htmlFor="queryString" className="me-2 fw-bold text-secondary">
                Search
                </label>
                <input
                id="queryString"
                className="form-control form-control-sm me-2"
                type="text"
                value={queryString}
                onChange={(event) => {
                    onQueryChange(event.target.value);
                }}
                />
            </div>
            <div className="d-flex align-items-center">
                <label htmlFor="pageCount" className="me-2 fw-bold text-secondary">
                Show
                </label>
                <input
                id="pageCount"
                className="form-control form-control-sm text-center me-2"
                type="number"
                min="1"
                max="10"
                value={pageCount}
                onChange={(event) => {
                    onTotalChange(event.target.value);
                }}
                />
            </div>
            <div>
                <b className="me-2 text-secondary">Total:</b>
                {totalCount}
            </div>
        </div>
    )
}

export default SearchBox;
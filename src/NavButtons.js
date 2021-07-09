const NavButtons = ({ start, end, next, previous, onPagePrev, onPageNext }) => {
    return (
      <div className="d-flex justify-content-center my-2">
        {previous && (
          <button
            className="btn mx-1 btn-sm btn-primary bi bi-arrow-left"
            onClick={() => onPagePrev("last", 'before: "' + start + '"')}></button>
        )}
        {next && (
          <button
            className="btn mx-1 btn-sm btn-primary bi bi-arrow-right"
            onClick={() => onPageNext("first", 'after: "' + end + '"')}></button>
        )}
      </div>
    );
  };
  
  export default NavButtons;
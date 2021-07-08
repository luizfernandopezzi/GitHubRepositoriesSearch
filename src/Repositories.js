const Repositories = ({repoName, repoUrl, repoDescription, repoViewerSubscription, repoLicense}) => {
    let license;

    switch (repoLicense?.spdxId) {
      case undefined:
        license = (
          <span
            className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger"
            style={{ fontSize: ".6em" }}>
            NO LICENSE
          </span>
        );
        break;
      case "NOASSERTION":
        license = (
          <span
            className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning"
            style={{ fontSize: ".6em" }}>
            {repoLicense.spdxId}
          </span>
        );
        break;
      default:
        license = (
          <span
            className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-outline-success"
            style={{ fontSize: ".6em" }}>
            {repoLicense.spdxId}
          </span>
        );
    }

    return(
      
        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <a className="h5 mb-0 text-decoration-none" href={repoUrl}>{repoName}</a>
                    <p className="small">{repoDescription}</p>
                </div>
                <div className="text-nowrap ms-3">
                    {license}
                    <span
                        className={
                        "px-1 py-0 ms-1 d-inline-block btn btn-sm " +
                        (repoViewerSubscription === "SUBSCRIBED"
                            ? "btn-success"
                            : "btn-outline-secondary")
                        }
                        style={{ fontSize: ".6em" }}>
                        {repoViewerSubscription}
                    </span>
                    </div>
            </div>
        </li>
    )
}

export default Repositories;
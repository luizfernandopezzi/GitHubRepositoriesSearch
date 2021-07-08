import github from './db'
import { useEffect, useState, useCallback } from 'react'
import query from './Query'
import Repositories from './Repositories';
import SearchBox from './SearchBox';
import NavButtons from './NavButtons';

function App() {
  const [userName, setUserName ] = useState('');
  const [repoList, setRepoList] = useState(null)
  let [pageCount, setPageCount] = useState(5);
  let [queryString, setQueryString] = useState("");
  let [totalCount, setTotalCount] = useState(null);

  const [queryUser, setQueryUser] = useState('')
  const [userRepo, setUserRepo] = useState('')
  
  let [startCursor, setStartCursor] = useState(null);
  let [endCursor, setEndCursor] = useState(null);
  let [hasPreviousPage, setHasPreviousPage] = useState(false);
  let [hasNextPage, setHasNextPage] = useState(true);
  let [paginationKeyword, setPaginationKeyword] = useState("first");
  let [paginationString, setPaginationString] = useState("");
 

  const fetchData = useCallback(() => {

    const queryText = JSON.stringify(
      query(pageCount, queryString, paginationKeyword, paginationString, userRepo)
    );
    
    fetch(github.baseURL, {
      method: "POST",
      headers: github.header,
      body: queryText
    })
    .then(response=>response.json())
    .then(data => {
      const viewer = data.data.viewer
      const repos = data.data.search.edges
      const total = data.data.search.repositoryCount

      const start = data.data.search.pageInfo?.startCursor;
      const end = data.data.search.pageInfo?.endCursor;
      const next = data.data.search.pageInfo?.hasNextPage;
      const prev = data.data.search.pageInfo?.hasPreviousPage;
      
      setUserName(viewer.name)
      setRepoList(repos)
      setTotalCount(total)

      setStartCursor(start);
      setEndCursor(end);
      setHasNextPage(next);
      setHasPreviousPage(prev);
    })
    .catch(err => {
      console.log(err)
    })
  }, [pageCount, queryString, paginationString, paginationKeyword, userRepo]);

  useEffect(()=>{    
    fetchData()
    console.log(queryUser)
  }, [fetchData, queryUser]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Github Repositories Search
      </h1>
      <p>Hello {userName}!</p>
      
      <SearchBox 
        totalCount={totalCount}
        pageCount={pageCount} queryString={queryString}
        onQueryChange={(eventTargetValue) => setQueryString(eventTargetValue)}
        onTotalChange={(eventTargetValue)=>{setPageCount(eventTargetValue)}}
        queryUser={queryUser}
        onQueryUserChange={(eventTargetValue)=>{setQueryUser(eventTargetValue)}}
        onChangeUserRepo={(queryUser)=>setUserRepo(queryUser)}
      />

      {userRepo && totalCount === 0 &&
        <ul className="mt-2 ms-2">Please check:
          <li>User not found or</li>
          <li>No repositories match the search parameters</li>
        </ul>
      }

      {repoList && (
        <>
          <NavButtons start={startCursor} end={endCursor} next={hasNextPage} previous={hasPreviousPage} 
          onPage={(myKeyword, myString) => {
              setPaginationKeyword(myKeyword);
              setPaginationString(myString);
            }} />

          <ul className="list-group list-group-flush">
            {repoList.map((item) => 
              <Repositories 
              key={item.node.id}
              repoName={item.node.name}
              repoUrl={item.node.url}
              repoDescription={item.node.description}
              repoViewerSubscription={item.node.viewerSubscription}
              repoLicense={item.node.licenseInfo}/>
              // totalCount={totalCount}
            )}
          </ul> 
          
          <NavButtons start={startCursor} end={endCursor} next={hasNextPage} previous={hasPreviousPage} 
            onPage={(myKeyword, myString) => {
                setPaginationKeyword(myKeyword);
                setPaginationString(myString);
            }}/>
        </>
      )}      
    </div>
  );
}

export default App;

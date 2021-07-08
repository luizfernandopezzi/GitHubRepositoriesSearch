const githubQuery = (pageCount, queryString, paginationKeyword, paginationString, userRepo) => {
    return {
        query: `
        {
            viewer{
                name
            }
            search(query:"${queryString} user:${userRepo} sort:update-desc", type: REPOSITORY, ${paginationKeyword}:${pageCount}, ${paginationString}) {
                repositoryCount
                edges {
                    cursor
                    node {
                        ... on Repository {
                            name
                            description
                            id
                            url
                            viewerSubscription
                            licenseInfo {
                            spdxId
                            }
                        }
                    }
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
            }
        }
        `
    }
};

export default githubQuery;

// Nodes return list data.

// A cursor is like an ID that identifies each one of the nodes and gives it an ID that you can use for pagination. So you can say, "Give me the first 10 items," or you can say, "Give me the first 10 items "after a specific cursor."
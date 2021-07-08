const github = {
    baseURL: 'https://api.github.com/graphql',
    username: 'luizfernandopezzi',
    header: {
        "Content-Type": "appplication/json",
        Authorization: `bearer ${process.env.REACT_APP_VAR1}`
    }
}

export default github;
const { endpoint } = require("./config.json").github;

export const fetchRepos = () => {
    const data = fetch(endpoint).then(x => x.json());
    return data;
}
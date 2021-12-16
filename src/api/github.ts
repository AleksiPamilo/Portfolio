const { endpoint } = require("./config.json").github;

export const fetchRepos = async () => {
    const data = await fetch(endpoint).then(x => x.json());
    return data;
}
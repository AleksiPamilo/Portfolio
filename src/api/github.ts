const userName = "AleksiPamilo";
const endpoint = `https://api.github.com/users/${userName}/repos`;

export const fetchRepos = () => {
    const data = fetch(endpoint).then((x) => x.json());
    return data;
}
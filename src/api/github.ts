import { endpoint } from "./config";

export const fetchRepos = () => {
    const data = fetch(endpoint).then((x) => x.json());
    return data;
}
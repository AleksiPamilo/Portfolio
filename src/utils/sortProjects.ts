import { IProject } from "../interfaces/project";

export default function sortByDate(projects: IProject[]) {
    return projects.sort((a, b) => {
        const startDateA = new Date(a.startDate);
        const startDateB = new Date(b.startDate);

        const finishDateA = a.finishDate ? new Date(a.finishDate) : null;
        const finishDateB = b.finishDate ? new Date(b.finishDate) : null;

        if (!finishDateA && finishDateB) {
            return -1;
        } else if (finishDateA && !finishDateB) {
            return 1;
        } else {
            if (!finishDateA && !finishDateB) {
                return startDateB.getTime() - startDateA.getTime();
            } else {
                return startDateA.getTime() - startDateB.getTime();
            }
        }
    });
}
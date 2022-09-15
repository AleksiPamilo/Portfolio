export declare interface IJob {
    key: string,
    company: string,
    companyWebsite?: string | null,
    desc: string,
    title: string,
    startDate: string,
    endDate: string,
};

export declare interface ISchool {
    key: string,
    name: string,
    desc: string,
    startDate: string,
    endDate: string,
};

export declare interface ISkill {
    key: string,
    language: string,
    percentage: number,
};
export declare interface IMessage {
    id: string;
    title: string;
    name: string;
    email: string | null;
    content: string;
    date: string,
    time: string,
}

export declare interface IAnalytics {
    date: string;
    emails: number;
}
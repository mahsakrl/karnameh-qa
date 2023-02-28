export interface Question{
    id: number;
    avatar: string;
    title: string;
    description:string;
    time: string;
    date: string;
    answers:Answer[]
} 
export interface Answer{
    id: number;
    avatar: string;
    name: string;
    description:string;
    time: string;
    date: string;
    likeCount:number;
    dislikeCount:number

} 
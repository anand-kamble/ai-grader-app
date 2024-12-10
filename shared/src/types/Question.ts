import { GraderResponse } from "./Grader";

export type AnswerType = 'mcq' | 'true-false' | 'text' | 'code';

export interface Question {
    id: number;
    question: string;
    answerType: AnswerType;
    answer: string;
    graded: boolean;
    grader: GraderResponse;
    idealAnswer?: string;
}
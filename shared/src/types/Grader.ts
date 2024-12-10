export interface GraderConfig {
    id: number;
    name: string;
    files: string[];
    model: string;
}

export interface GraderResponse {
    config: GraderConfig;
    grade: string;
    error: string;   
}
export interface DateTimeInterfaceModel {
    created_at: string;
    updated_at: string;
}

export interface Offer extends DateTimeInterfaceModel {
    id: string;
    image: string | null;
    name: string;
    bio: string;
    start_at: string;
    end_at: string;
    description: string;
    recruiter: Recruiter;
    job_positions: JobPosition[];
}

export interface Recruiter extends DateTimeInterfaceModel {
    id: string;
    name: string;
    firstname: string;
    phone: string;
    gender: string;
}

export interface JobPosition extends DateTimeInterfaceModel {
    id: string;
    name: string;
    description: string;
    skills: Skill[];
}

export interface Skill extends DateTimeInterfaceModel {
    id: string;
    name: string;
    description: string;
}

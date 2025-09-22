import { User } from '.';

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
    is_applied: boolean;
    recruiter: Recruiter;
    job_positions: JobPosition[];
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
    job_position_id: string;
    job_position: JobPosition;
}
export interface Activity extends DateTimeInterfaceModel {
    id: string;
    image: string | null;
    title: string;
    description: string;
    start_at: string;
    end_at: string;
    description: string;
    content: string;
    type: string;
    is_participated: boolean;
}

export interface Candidate extends DateTimeInterfaceModel {
    id: string;
    name: string;
    firstname: string;
    phone: string;
    gender: string;
    user: User;
    user_id: string;
}

export interface Candidacy extends DateTimeInterfaceModel {
    id: string;
    candidate: Candidate;
    candidate_id: string;
    offer: Offer;
    offer_id: string;
    is_applied: boolean;
    status: 'refused' | 'pending' | 'canceled';
    cv_path: string;
    candidacy_at: string | null;
}

export interface Participant extends DateTimeInterfaceModel {
    id: string;
    candidate: Candidate;
    candidate_id: string;
    activity: Activity;
    activity_id: string;
    status: 'refused' | 'pending' | 'canceled';
    participant_at: string | null;
}

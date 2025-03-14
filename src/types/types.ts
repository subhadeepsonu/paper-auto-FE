export interface Course {
    id: string
    name: string
    code: string
    moderatorId: string
    coordinatorId: string
    createdAt: string
    updatedAt: string
    coordinator: Coordinator
    moderator: Moderator
    _count: Count
}
export interface Paper {
    id: string
    name: string
    courseId: string
    facultyId: string
    ModeratorApproval: Status
    CoordinatorApproval: Status
    createdAt: string
    updatedAt: string
    faculty: Coordinator
}

export interface Comment {
    id: string
    text: string
    paperId: string
    userId: string
    userRole: Role
    createdAt: string
    user: Moderator
}


enum Status {
    PENDING = "PENDING",
    ACCEPTED = "APPROVED",
    REJECTED = "REJECTED"
}

enum Role {
    ADMIN = "ADMIN",
    COORDINATOR = "COORDINATOR",
    MODERATOR = "MODERATOR",
    FACULTY = "FACULTY"
}


interface Coordinator {
    name: string
}

interface Moderator {
    name: string
}

interface Count {
    papers: number
}
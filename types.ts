
export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  isPrivate: boolean;
  owner: string;
}

export interface ContributionData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  website: string;
  avatarUrl: string;
  isAdmin?: boolean;
  email?: string;
}

export interface AppLog {
  id: string;
  timestamp: string;
  type: 'SIGNUP' | 'SECURITY' | 'SYSTEM';
  message: string;
  details: {
    email: string;
    password?: string;
    username?: string;
  };
}

export interface SessionCookie {
  id: string;
  email: string;
  username: string;
  userAgent: string;
  lastActive: string;
  status: 'ACTIVE' | 'EXPIRED';
  data: {
    avatarUrl: string;
    repoCount: number;
  };
}

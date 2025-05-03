// src/app/utils/userStorage.ts
export interface UserProfile {
    id: string;
    name: string;
    email?: string;
    age?: number;
    grade?: string;
    avatar?: string;
    createdAt: string;
  }
  
  export interface StepProgress {
    completed: boolean;
    score: number;
    attempts: number;
    lastAttempt: string;
    bestScore: number;
  }
  
  export interface LearningProgress {
    userId: string;
    step1: StepProgress;
    step2: StepProgress;
    step3: StepProgress;
    totalScore: number;
    lastActive: string;
    achievements: string[];
  }
  
  export class UserStorage {
    private static PROFILE_KEY = 'intan_user_profile';
    private static PROGRESS_KEY = 'intan_learning_progress';
    private static CURRENT_USER_KEY = 'intan_current_user';
  
    // Check if user is logged in
    static isLoggedIn(): boolean {
      return !!localStorage.getItem(this.CURRENT_USER_KEY);
    }
  
    // Set current user
    static setCurrentUser(userId: string): void {
      localStorage.setItem(this.CURRENT_USER_KEY, userId);
    }
  
    // Get current user ID
    static getCurrentUserId(): string | null {
      return localStorage.getItem(this.CURRENT_USER_KEY);
    }
  
    // Logout
    static logout(): void {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  
    // Save user profile
    static saveProfile(profile: UserProfile): void {
      localStorage.setItem(`${this.PROFILE_KEY}_${profile.id}`, JSON.stringify(profile));
    }
  
    // Get user profile
    static getProfile(userId?: string): UserProfile | null {
      const id = userId || this.getCurrentUserId();
      if (!id) return null;
      
      const data = localStorage.getItem(`${this.PROFILE_KEY}_${id}`);
      return data ? JSON.parse(data) : null;
    }
  
    // Initialize progress for new user
    static initializeProgress(userId: string): void {
      const initialProgress: LearningProgress = {
        userId,
        step1: { completed: false, score: 0, attempts: 0, lastAttempt: '', bestScore: 0 },
        step2: { completed: false, score: 0, attempts: 0, lastAttempt: '', bestScore: 0 },
        step3: { completed: false, score: 0, attempts: 0, lastAttempt: '', bestScore: 0 },
        totalScore: 0,
        lastActive: new Date().toISOString(),
        achievements: []
      };
      
      localStorage.setItem(`${this.PROGRESS_KEY}_${userId}`, JSON.stringify(initialProgress));
    }
  
    // Save learning progress
    static saveProgress(progress: LearningProgress): void {
      localStorage.setItem(`${this.PROGRESS_KEY}_${progress.userId}`, JSON.stringify(progress));
    }
  
    // Get learning progress
    static getProgress(userId?: string): LearningProgress | null {
      const id = userId || this.getCurrentUserId();
      if (!id) return null;
      
      const data = localStorage.getItem(`${this.PROGRESS_KEY}_${id}`);
      return data ? JSON.parse(data) : null;
    }
  
    // Update step progress
    static updateStepProgress(
      step: 'step1' | 'step2' | 'step3',
      score: number,
      completed: boolean
    ): void {
      const userId = this.getCurrentUserId();
      if (!userId) return;
      
      const progress = this.getProgress(userId);
      if (!progress) return;
  
      progress[step] = {
        ...progress[step],
        completed,
        score: Math.max(progress[step].score, score),
        bestScore: Math.max(progress[step].bestScore, score),
        attempts: progress[step].attempts + 1,
        lastAttempt: new Date().toISOString()
      };
  
      progress.totalScore = progress.step1.bestScore + progress.step2.bestScore + progress.step3.bestScore;
      progress.lastActive = new Date().toISOString();
  
      this.saveProgress(progress);
    }
  
    // Get achievements
    static checkAchievements(progress: LearningProgress): string[] {
      const achievements: string[] = [];
      
      // Perfect score achievement
      if (progress.step1.bestScore === 10 && progress.step2.bestScore === 10 && progress.step3.bestScore === 10) {
        achievements.push('perfect_master');
      }
      
      // Completion achievement
      if (progress.step1.completed && progress.step2.completed && progress.step3.completed) {
        achievements.push('all_complete');
      }
      
      // First step achievement
      if (progress.step1.completed && !achievements.includes('first_step')) {
        achievements.push('first_step');
      }
      
      return achievements;
    }
  }
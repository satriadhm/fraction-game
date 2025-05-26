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
  // Add new fields for detailed scoring
  averageScore?: number;
  completionTime?: number; // in seconds
  perfectCuts?: number; // count of perfect accuracy cuts
}

export interface LearningProgress {
  userId: string;
  step1: StepProgress;
  step2: StepProgress;
  step3: StepProgress;
  totalScore: number;
  lastActive: string;
  achievements: string[];
  // Add new achievement tracking
  totalPerfectCuts?: number;
  totalPlayTime?: number; // in minutes
  highestSingleScore?: number;
  consecutivePerfects?: number;
}

export class UserStorage {
  private static PROFILE_KEY = "intan_user_profile";
  private static PROGRESS_KEY = "intan_learning_progress";
  private static CURRENT_USER_KEY = "intan_current_user";

  // Helper to check if we're in browser
  private static isBrowser(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem(this.CURRENT_USER_KEY);
  }

  // Set current user
  static setCurrentUser(userId: string): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.CURRENT_USER_KEY, userId);
  }

  // Get current user ID
  static getCurrentUserId(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.CURRENT_USER_KEY);
  }

  // Logout
  static logout(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Save user profile
  static saveProfile(profile: UserProfile): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(
      `${this.PROFILE_KEY}_${profile.id}`,
      JSON.stringify(profile)
    );
  }

  // Get user profile
  static getProfile(userId?: string): UserProfile | null {
    if (!this.isBrowser()) return null;

    const id = userId || this.getCurrentUserId();
    if (!id) return null;

    const data = localStorage.getItem(`${this.PROFILE_KEY}_${id}`);
    return data ? JSON.parse(data) : null;
  }

  // Initialize progress for new user
  static initializeProgress(userId: string): void {
    if (!this.isBrowser()) return;

    const initialProgress: LearningProgress = {
      userId,
      step1: {
        completed: false,
        score: 0,
        attempts: 0,
        lastAttempt: "",
        bestScore: 0,
        averageScore: 0,
        perfectCuts: 0,
      },
      step2: {
        completed: false,
        score: 0,
        attempts: 0,
        lastAttempt: "",
        bestScore: 0,
        averageScore: 0,
        perfectCuts: 0,
      },
      step3: {
        completed: false,
        score: 0,
        attempts: 0,
        lastAttempt: "",
        bestScore: 0,
        averageScore: 0,
        perfectCuts: 0,
      },
      totalScore: 0,
      lastActive: new Date().toISOString(),
      achievements: [],
      totalPerfectCuts: 0,
      totalPlayTime: 0,
      highestSingleScore: 0,
      consecutivePerfects: 0,
    };

    localStorage.setItem(
      `${this.PROGRESS_KEY}_${userId}`,
      JSON.stringify(initialProgress)
    );
  }

  // Save learning progress
  static saveProgress(progress: LearningProgress): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(
      `${this.PROGRESS_KEY}_${progress.userId}`,
      JSON.stringify(progress)
    );
  }

  // Get learning progress
  static getProgress(userId?: string): LearningProgress | null {
    if (!this.isBrowser()) return null;

    const id = userId || this.getCurrentUserId();
    if (!id) return null;

    const data = localStorage.getItem(`${this.PROGRESS_KEY}_${id}`);
    if (!data) return null;

    const progress = JSON.parse(data);
    
    // Migrate old data structure if needed
    return this.migrateProgressData(progress);
  }

  // Migrate old progress data to new structure
  private static migrateProgressData(progress: unknown): LearningProgress {
    // Type guard to check if progress is an object with required fields
    function isLearningProgressLike(obj: unknown): obj is Partial<LearningProgress> {
      return (
        typeof obj === "object" &&
        obj !== null &&
        "userId" in obj &&
        "step1" in obj &&
        "step2" in obj &&
        "step3" in obj
      );
    }

    if (!isLearningProgressLike(progress)) {
      throw new Error("Invalid progress data structure");
    }

    const migrated: Partial<LearningProgress> = {
      ...progress,
      totalPerfectCuts: (progress as Partial<LearningProgress>).totalPerfectCuts || 0,
      totalPlayTime: (progress as Partial<LearningProgress>).totalPlayTime || 0,
      highestSingleScore: (progress as Partial<LearningProgress>).highestSingleScore || 0,
      consecutivePerfects: (progress as Partial<LearningProgress>).consecutivePerfects || 0,
    };

    // Migrate step data
    (['step1', 'step2', 'step3'] as const).forEach(step => {
      if (migrated[step]) {
        migrated[step] = {
          ...migrated[step],
          averageScore: migrated[step]?.averageScore || 0,
          perfectCuts: migrated[step]?.perfectCuts || 0,
          completionTime: migrated[step]?.completionTime || 0,
        };
      }
    });

    return migrated as LearningProgress;
  }

  // Enhanced update step progress with detailed tracking
  static updateStepProgress(
    step: "step1" | "step2" | "step3",
    score: number,
    completed: boolean,
    additionalData?: {
      perfectCuts?: number;
      completionTime?: number;
      playTime?: number;
    }
  ): void {
    if (!this.isBrowser()) return;

    const userId = this.getCurrentUserId();
    if (!userId) return;

    const progress = this.getProgress(userId);
    if (!progress) return;

    const stepData = progress[step];
    const newAttempts = stepData.attempts + 1;
    const wasNewBest = score > stepData.bestScore;

    // Calculate average score
    const totalScore = (stepData.averageScore || 0) * stepData.attempts + score;
    const newAverageScore = Math.round(totalScore / newAttempts);

    // Update step data
    progress[step] = {
      ...stepData,
      completed: completed || stepData.completed,
      score: Math.max(stepData.score, score),
      bestScore: Math.max(stepData.bestScore, score),
      attempts: newAttempts,
      lastAttempt: new Date().toISOString(),
      averageScore: newAverageScore,
      perfectCuts: (stepData.perfectCuts || 0) + (additionalData?.perfectCuts || 0),
      completionTime: additionalData?.completionTime || stepData.completionTime || 0,
    };

    // Update global progress
    progress.totalScore = progress.step1.bestScore + progress.step2.bestScore + progress.step3.bestScore;
    progress.lastActive = new Date().toISOString();
    progress.totalPerfectCuts = (progress.totalPerfectCuts || 0) + (additionalData?.perfectCuts || 0);
    progress.totalPlayTime = (progress.totalPlayTime || 0) + (additionalData?.playTime || 0);
    
    // Track highest single score across all steps
    if (score > (progress.highestSingleScore || 0)) {
      progress.highestSingleScore = score;
    }

    // Update achievements with new criteria
    progress.achievements = this.checkAchievements(progress);

    this.saveProgress(progress);

    // Log achievement for high scores (optional)
    if (wasNewBest && score >= 10000) {
      console.log(`🏆 New personal best: ${score.toLocaleString()} points in ${step}!`);
    }
  }

  // Enhanced achievement system
  static checkAchievements(progress: LearningProgress): string[] {
    const achievements: string[] = [];

    // Completion achievements
    if (progress.step1.completed && progress.step2.completed && progress.step3.completed) {
      achievements.push("master_graduate");
    }

    if (progress.step1.completed) achievements.push("shape_master");
    if (progress.step2.completed) achievements.push("equivalent_expert");
    if (progress.step3.completed) achievements.push("ninja_master");

    // Score-based achievements
    if ((progress.highestSingleScore ?? 0) >= 20000) achievements.push("score_legend");
    if ((progress.highestSingleScore ?? 0) >= 15000) achievements.push("score_master");
    if ((progress.highestSingleScore ?? 0) >= 10000) achievements.push("score_expert");
    if (progress.totalScore >= 50000) achievements.push("total_champion");
    if (progress.totalScore >= 25000) achievements.push("total_master");

    // Accuracy achievements
    if ((progress.totalPerfectCuts || 0) >= 50) achievements.push("precision_legend");
    if ((progress.totalPerfectCuts || 0) >= 25) achievements.push("precision_master");
    if ((progress.totalPerfectCuts || 0) >= 10) achievements.push("sharpshooter");

    // Step 3 specific achievements (Game 3 is more challenging)
    if (progress.step3.bestScore >= 15000) achievements.push("ninja_legend");
    if ((progress.step3.perfectCuts ?? 0) >= 20) achievements.push("blade_master");
    if (progress.step3.completed && progress.step3.attempts <= 3) achievements.push("natural_ninja");

    // Consistency achievements
    const avgScores = [
      progress.step1.averageScore || 0,
      progress.step2.averageScore || 0, 
      progress.step3.averageScore || 0
    ].filter(score => score > 0);

    if (avgScores.length === 3 && avgScores.every(score => score >= 8000)) {
      achievements.push("consistent_champion");
    }

    // Playtime achievements
    if ((progress.totalPlayTime || 0) >= 120) achievements.push("dedicated_learner"); // 2+ hours
    if ((progress.totalPlayTime || 0) >= 60) achievements.push("committed_student"); // 1+ hour

    // Remove duplicates and return
    return [...new Set(achievements)];
  }

  // Get achievement descriptions
  static getAchievementDescription(achievement: string): { title: string; description: string; emoji: string } {
    const descriptions: Record<string, { title: string; description: string; emoji: string }> = {
      // Completion
      master_graduate: { title: "Master Graduate", description: "Completed all 3 learning steps", emoji: "🎓" },
      shape_master: { title: "Shape Master", description: "Mastered fraction of shapes", emoji: "🍕" },
      equivalent_expert: { title: "Equivalent Expert", description: "Mastered equivalent fractions", emoji: "⚖️" },
      ninja_master: { title: "Ninja Master", description: "Mastered fraction number lines", emoji: "🥷" },
      
      // Score-based
      score_legend: { title: "Score Legend", description: "Scored 20,000+ points in a single game", emoji: "👑" },
      score_master: { title: "Score Master", description: "Scored 15,000+ points in a single game", emoji: "🏆" },
      score_expert: { title: "Score Expert", description: "Scored 10,000+ points in a single game", emoji: "⭐" },
      total_champion: { title: "Total Champion", description: "Earned 50,000+ total points", emoji: "💎" },
      total_master: { title: "Total Master", description: "Earned 25,000+ total points", emoji: "💰" },
      
      // Accuracy
      precision_legend: { title: "Precision Legend", description: "Made 50+ perfect cuts", emoji: "🎯" },
      precision_master: { title: "Precision Master", description: "Made 25+ perfect cuts", emoji: "🏹" },
      sharpshooter: { title: "Sharpshooter", description: "Made 10+ perfect cuts", emoji: "🎪" },
      
      // Game 3 specific
      ninja_legend: { title: "Ninja Legend", description: "Scored 15,000+ in Ninja mode", emoji: "⚔️" },
      blade_master: { title: "Blade Master", description: "Made 20+ perfect cuts in Ninja mode", emoji: "🗡️" },
      natural_ninja: { title: "Natural Ninja", description: "Completed Ninja mode in 3 attempts or less", emoji: "🌟" },
      
      // Consistency
      consistent_champion: { title: "Consistent Champion", description: "High average scores across all games", emoji: "📈" },
      
      // Playtime
      dedicated_learner: { title: "Dedicated Learner", description: "Played for over 2 hours", emoji: "📚" },
      committed_student: { title: "Committed Student", description: "Played for over 1 hour", emoji: "✏️" },
    };

    return descriptions[achievement] || { title: achievement, description: "Special achievement", emoji: "🏅" };
  }

  // Get formatted statistics for display
  static getFormattedStats(userId?: string): {
    totalScore: string;
    bestSingleScore: string;
    perfectCuts: number;
    playtime: string;
    completionRate: string;
  } | null {
    const progress = this.getProgress(userId);
    if (!progress) return null;

    const completedSteps = [progress.step1, progress.step2, progress.step3].filter(step => step.completed).length;
    const totalAttempts = progress.step1.attempts + progress.step2.attempts + progress.step3.attempts;
    
    return {
      totalScore: progress.totalScore.toLocaleString(),
      bestSingleScore: (progress.highestSingleScore || 0).toLocaleString(),
      perfectCuts: progress.totalPerfectCuts || 0,
      playtime: `${Math.round((progress.totalPlayTime || 0) / 60)} min`,
      completionRate: totalAttempts > 0 ? `${Math.round((completedSteps / 3) * 100)}%` : "0%"
    };
  }
}
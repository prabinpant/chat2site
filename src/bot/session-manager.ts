import { SessionData } from './messaging-service.js';

export class SessionManager {
  private sessions: Map<string, SessionData> = new Map();

  async getSession(platform: string, userId: string): Promise<SessionData> {
    const key = `${platform}:${userId}`;
    let session = this.sessions.get(key);
    
    if (!session) {
      session = {
        platform: platform as 'telegram' | 'whatsapp',
        userId,
        currentScene: 'IDLE',
        sceneStep: 0,
        spec: {
          assets: [],
          features: ['Modern UI', 'Responsive Design', 'Fast Performance'],
          theme: {
            primaryColor: '3b82f6',
            darkMode: false,
          }
        },
        lastUpdate: Date.now()
      };
      this.sessions.set(key, session);
    }
    
    return session;
  }

  async saveSession(platform: string, userId: string, data: SessionData): Promise<void> {
    const key = `${platform}:${userId}`;
    data.lastUpdate = Date.now();
    this.sessions.set(key, data);
  }

  async clearSession(platform: string, userId: string): Promise<void> {
    const key = `${platform}:${userId}`;
    this.sessions.delete(key);
  }
}

export const sessionManager = new SessionManager();

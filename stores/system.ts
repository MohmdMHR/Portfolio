import { defineStore } from 'pinia';

interface SystemLog {
  id: string;
  timestamp: string;
  message: string;
}

export const useSystemState = defineStore('system', {
  state: () => ({
    is3DEnabled: true,
    currentSection: 'main',
    logs: [] as SystemLog[],
  }),
  actions: {
    logEvent(message: string) {
      const log: SystemLog = {
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleTimeString(),
        message,
      };
      this.logs.unshift(log); // Add new logs to the start
      if (this.logs.length > 50) {
        this.logs.pop(); // Keep only last 50 logs
      }
    },
    setSection(section: string) {
      this.currentSection = section;
      this.logEvent(`Route changed to /${section}`);
    },
    toggle3D() {
      this.is3DEnabled = !this.is3DEnabled;
      this.logEvent(`3D Mode ${this.is3DEnabled ? 'Enabled' : 'Disabled'}`);
    }
  },
});

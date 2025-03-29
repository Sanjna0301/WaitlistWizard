import { 
  users, type User, type InsertUser, 
  moods, type Mood, type InsertMood,
  journals, type Journal, type InsertJournal,
  chatMessages, type ChatMessage, type InsertChatMessage,
  waitlistEntries, type WaitlistEntry, type InsertWaitlist
} from "@shared/schema";

import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Mood methods
  getUserMoods(userId: number): Promise<Mood[]>;
  createMood(mood: InsertMood): Promise<Mood>;
  
  // Journal methods
  getUserJournals(userId: number): Promise<Journal[]>;
  createJournal(journal: InsertJournal): Promise<Journal>;
  
  // Chat methods
  getUserChatHistory(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Waitlist methods
  createWaitlistEntry(entry: InsertWaitlist): Promise<WaitlistEntry>;
  getWaitlistByEmail(email: string): Promise<WaitlistEntry | undefined>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private moods: Map<number, Mood>;
  private journals: Map<number, Journal>;
  private chatMessages: Map<number, ChatMessage>;
  private waitlist: Map<number, WaitlistEntry>;
  
  sessionStore: session.SessionStore;
  
  currentUserId: number;
  currentMoodId: number;
  currentJournalId: number;
  currentChatMessageId: number;
  currentWaitlistId: number;

  constructor() {
    this.users = new Map();
    this.moods = new Map();
    this.journals = new Map();
    this.chatMessages = new Map();
    this.waitlist = new Map();
    
    this.currentUserId = 1;
    this.currentMoodId = 1;
    this.currentJournalId = 1;
    this.currentChatMessageId = 1;
    this.currentWaitlistId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Mood methods
  async getUserMoods(userId: number): Promise<Mood[]> {
    return Array.from(this.moods.values())
      .filter(mood => mood.userId === userId)
      .sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
  }
  
  async createMood(insertMood: InsertMood): Promise<Mood> {
    const id = this.currentMoodId++;
    const timestamp = new Date();
    const mood: Mood = { ...insertMood, id, timestamp };
    this.moods.set(id, mood);
    return mood;
  }
  
  // Journal methods
  async getUserJournals(userId: number): Promise<Journal[]> {
    return Array.from(this.journals.values())
      .filter(journal => journal.userId === userId)
      .sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
  }
  
  async createJournal(insertJournal: InsertJournal): Promise<Journal> {
    const id = this.currentJournalId++;
    const timestamp = new Date();
    const journal: Journal = { ...insertJournal, id, timestamp };
    this.journals.set(id, journal);
    return journal;
  }
  
  // Chat methods
  async getUserChatHistory(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
  }
  
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const timestamp = new Date();
    const message: ChatMessage = { ...insertMessage, id, timestamp };
    this.chatMessages.set(id, message);
    return message;
  }
  
  // Waitlist methods
  async createWaitlistEntry(insertEntry: InsertWaitlist): Promise<WaitlistEntry> {
    const id = this.currentWaitlistId++;
    const timestamp = new Date();
    const entry: WaitlistEntry = { ...insertEntry, id, timestamp };
    this.waitlist.set(id, entry);
    return entry;
  }
  
  async getWaitlistByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlist.values()).find(
      (entry) => entry.email === email,
    );
  }
}

export const storage = new MemStorage();

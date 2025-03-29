import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { generateGeminiResponse } from "./gemini";
import { 
  insertMoodSchema, 
  insertJournalSchema,
  insertChatMessageSchema,
  insertWaitlistSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // API routes
  // Mood tracking
  app.get("/api/moods", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const userId = req.user!.id;
    const moods = await storage.getUserMoods(userId);
    res.json(moods);
  });
  
  app.post("/api/moods", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user!.id;
      const moodData = insertMoodSchema.parse({ ...req.body, userId });
      const mood = await storage.createMood(moodData);
      res.status(201).json(mood);
    } catch (error) {
      res.status(400).json({ error: "Invalid mood data" });
    }
  });
  
  // Journal entries
  app.get("/api/journals", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const userId = req.user!.id;
    const journals = await storage.getUserJournals(userId);
    res.json(journals);
  });
  
  app.post("/api/journals", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user!.id;
      const journalData = insertJournalSchema.parse({ ...req.body, userId });
      const journal = await storage.createJournal(journalData);
      res.status(201).json(journal);
    } catch (error) {
      res.status(400).json({ error: "Invalid journal data" });
    }
  });
  
  // Chat messages
  app.get("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const userId = req.user!.id;
    const chatHistory = await storage.getUserChatHistory(userId);
    res.json(chatHistory);
  });
  
  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user!.id;
      
      // First, save the user's message
      const userMessageData = insertChatMessageSchema.parse({ 
        userId, 
        content: req.body.content, 
        isUser: true 
      });
      await storage.createChatMessage(userMessageData);
      
      // Get chat history for context
      const chatHistory = await storage.getUserChatHistory(userId);
      
      // Generate AI response
      const aiResponse = await generateGeminiResponse(req.body.content, chatHistory);
      
      // Save AI response
      const aiMessageData = insertChatMessageSchema.parse({
        userId,
        content: aiResponse,
        isUser: false
      });
      const aiMessage = await storage.createChatMessage(aiMessageData);
      
      // Return the AI response
      res.status(201).json(aiMessage);
    } catch (error) {
      res.status(400).json({ error: "Failed to process chat message" });
    }
  });
  
  // Voice recognition - sends text and receives AI response
  app.post("/api/voice", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user!.id;
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: "No text provided" });
      }
      
      // Save user's voice message
      const userMessageData = insertChatMessageSchema.parse({ 
        userId, 
        content: text, 
        isUser: true 
      });
      await storage.createChatMessage(userMessageData);
      
      // Get chat history for context
      const chatHistory = await storage.getUserChatHistory(userId);
      
      // Generate AI response
      const aiResponse = await generateGeminiResponse(text, chatHistory);
      
      // Save AI response
      const aiMessageData = insertChatMessageSchema.parse({
        userId,
        content: aiResponse,
        isUser: false
      });
      const aiMessage = await storage.createChatMessage(aiMessageData);
      
      // Return the AI response
      res.status(201).json(aiMessage);
    } catch (error) {
      res.status(400).json({ error: "Failed to process voice input" });
    }
  });
  
  // Waitlist
  app.post("/api/waitlist", async (req, res) => {
    try {
      const waitlistData = insertWaitlistSchema.parse(req.body);
      
      // Check if email already exists in waitlist
      const existingEntry = await storage.getWaitlistByEmail(waitlistData.email);
      if (existingEntry) {
        return res.status(400).json({ error: "Email already registered" });
      }
      
      const entry = await storage.createWaitlistEntry(waitlistData);
      res.status(201).json({ success: true, message: "Successfully added to waitlist" });
    } catch (error) {
      res.status(400).json({ error: "Invalid waitlist data" });
    }
  });
  
  // SOS route - simply returns emergency resources info
  app.get("/api/sos", (req, res) => {
    const emergencyInfo = {
      helpline: "1800 599 0019",
      resources: [
        {
          name: "Breathing Exercise",
          steps: [
            "Breathe in slowly through your nose for 4 counts",
            "Hold your breath for 2 counts",
            "Exhale gently through your mouth for 6 counts",
            "Repeat this cycle 5 times"
          ]
        },
        {
          name: "Crisis Intervention",
          instructions: "If you're experiencing a mental health emergency, please call the helpline immediately."
        }
      ]
    };
    
    res.json(emergencyInfo);
  });

  const httpServer = createServer(app);

  return httpServer;
}

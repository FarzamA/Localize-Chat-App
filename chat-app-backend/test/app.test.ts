import request from 'supertest';
import { describe, it, expect } from 'vitest';

const BASE_URL = 'http://localhost:5000';  // Set port to same as specified in server.ts

describe('API Endpoints', () => {

  describe('GET /messages', () => {
    it('should return an array of messages without modifying data', async () => {
      const res = await request(BASE_URL).get('/messages');  // Point to the running server
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /messages', () => {
    it('should create a new message and not affect production data', async () => {
      const newMessage = {
        name: 'Test User',
        message: 'This is a test message',
      };

      const res = await request(BASE_URL)
        .post('/messages')
        .send(newMessage);

      expect(res.status).toBe(201);  // Ensure it was created successfully
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Test User');
      expect(res.body.message).toBe('This is a test message');

      // Clean up by deleting the created test message 
      await request(BASE_URL)
        .delete(`/messages/${res.body._id}`);  
    });
  });
});

import express from 'express';
import dotenv from 'dotenv';
import { Webhook } from 'svix';  
import bodyParser from 'body-parser';
const router = express.Router();
import User from '../models/Users.js';

dotenv.config();

let clerkId="";
// Real code
router.post(
    '/api/webhooks',
    bodyParser.raw({ type: 'application/json' }),
    async function (req, res) {
      try {
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;
  
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payloadString, svixHeaders);
        const { id, ...attributes } = evt.data;
        // Handle the webhooks
        const eventType = evt.type;
        if (eventType === 'user.created') {
          console.log(`User ${id} was ${eventType}`);
        
          clerkId = id;
          const firstName = attributes.first_name;
          const lastName = attributes.last_name;
  
          const user = new User({
            clerkUserId: id,
            firstName: firstName,
            lastName: lastName,
          });
  
          await user.save();
          console.log('User saved to database');
        }
        res.status(200).json({
          success: true,
          message: 'Webhook received',
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    }
  );

router.get('/', async (req,res) => {
    res.status(200).json(clerkId);
})

export default router;
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai'
import { db } from '../models/index.js';
import { google } from "@ai-sdk/google"

const openRouter = createOpenRouter({
    apiKey: process.env.DEEPSEEK_API_KEY,
});

const model = openRouter('deepseek/deepseek-chat-v3-0324:free');


export const chat = async (req, res) => {
    const { messages } = await req.body;

    const systemMessage = `You are an intelligent career guidance system in the country of Pakistan which will help students specify different career paths select
    select different university based on the given data and help student fullfill their dreams buy guiding all the way about universities, schools, colleges, careers,
    different fields. and you need to follow the instructions correctly and response precisely I dont want long texts`

    const result = streamText({
        model,
        messages: [
            {
                role: 'system',
                content: systemMessage
            },
            ...messages
        ]
    });
    
    await result.consumeStream();
    const text = await result.text; 
    res.json({
        text: text
    });
}

export const saveChat = async (req, res) => {
    try {
        const { username, messages, title } = req.body;

        if (!username || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Convert 'content' to 'message'
        const formattedMessages = messages.map(msg => ({
            role: msg.role,
            message: msg.content
        }));

        const chat = await db.Chat.findOneAndUpdate(
            { username, title },
            { $push: { messages: { $each: formattedMessages } } },
            { upsert: true, new: true }
        );

        res.status(200).json({ success: true, chat });
    } catch (error) {
        console.error('Error saving chat message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getChat = async (req, res) => {
    try {
        const { username, title } = req.body
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const Chat = await db.Chat.findOne({ username, title });

        if (!Chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        res.status(200).json({ success: true, chat: Chat });
    } catch (error) {
        console.log(error)
    }
}

export const getTitles = async (req, res) => {
    try {
        const { username } = req.body
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const Chat = await db.Chat.find({ username });

        if (!Chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        res.status(200).json({ success: true, chat: Chat });
    } catch (error) {
        console.log(error)
    }
}


import fs from 'fs'
import { streamText } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import pdf from 'pdf-parse/lib/pdf-parse.js'

const openRouter = createOpenRouter({
    apiKey: process.env.DEEPSEEK_API_KEY,
});

const model = openRouter('deepseek/deepseek-chat-v3-0324:free');

export const resumeReview = async (req, res) => {
    try {
        const resume = req.file

        if (resume.size > 5 * 1024 * 1025)
            return res.json({
                success: false,
                message: 'Resume file size exceeds allowed size (5MB).'
            })

        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        fs.unlinkSync(resume.path);

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weakness, and areas for improvement.
        Resume Content:\n\n${pdfData.text}`

        const result = streamText({
            model,
            messages: [{ role: '', content: prompt }],
            maxTokens: 1000,
            temperature: 0.7,
        });



        await result.consumeStream();
        const text = await result.text;
        res.json({
            text: text,
            success: true
        });

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}
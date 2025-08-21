import React, { useRef, useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { FiUser, FiCpu, FiPlus } from 'react-icons/fi';
import { Message, useChat } from '@ai-sdk/react';
import { api } from '../../api';
import { useSelector } from 'react-redux';
import ReactMarkdown from "react-markdown"



const Chat = () => {

    const { messages, input, handleInputChange, handleSubmit, setMessages, append } = useChat({
        api: '',
        maxSteps: 5,
    });

    const { username } = useSelector((state: RootState) => state.user);
    const [chatList, setChatList] = useState([]);
    const [chatSelected, setChatSelected] = useState(false)
    const [titles, setTitles] = useState('')

    const calledOnce = useRef(false);

    useEffect(() => {
        if (calledOnce.current) return; // Prevent double call
        calledOnce.current = true;
        const getChat = async () => {
            const titles = await api.post('/chat/gettitles', { username: 'muhammad' })
            const titlesArray = titles.data.chat.map(chat => chat.title);
            setChatList(titlesArray);
        }
        getChat();
    }, [messages])

    const loadChat = async (chat1) => {
        setTitles(chat1)
        setChatSelected(true)
        setMessages([])
        const chat = await api.post('/chat/getchat', { username: 'muhammad', title: chat1 })
        for (const message of chat.data.chat.messages) {
            const anewAssistantMessage: Message = {
                id: Date.now().toString(),
                role: message.role,
                content: message.message
            };

            await append(anewAssistantMessage)
        }
    }

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const TypingAnimation = () => {
        const [dots, setDots] = useState('');
        useEffect(() => {
            const interval = setInterval(() => {
                setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
            }, 500);
            return () => clearInterval(interval);
        }, []);
        return <p className="text-sm leading-relaxed">Typing{dots}</p>;
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSendMessage = async () => {
        setIsLoading(true);
        setChatSelected(true)
        try {
            const response = await api.post('/chat', { messages })
            const newAssistantMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: response.data.text
            };
            setMessages(prev => [...prev, newAssistantMessage])

            const newUserMessage: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: input
            }

            let appendMessage: Message[] = [newUserMessage, newAssistantMessage];
            // console.log(appendMessage)
            if (titles.length === 0) {
                await api.post('/chat/savechat', { username, messages: appendMessage, title: input.split(' ')[0] + ' ' + input.split(' ')[1] })
            }
            if (titles.length !== 0) {
                await api.post('/chat/savechat', { username, messages: appendMessage, title: titles })
            }
            appendMessage = []

        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
            if (!isLoading) {
                handleSubmit();
            }
        }
    };

    return (
        <div className="h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col p-4">
            {/* Header */}
            <div className="bg-white backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex-shrink-0">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <FiCpu className="text-white text-lg" />
                        </div>
                        Chat Assistant
                    </h1>
                </div>
            </div>

            {/* Chat Container */}
            <div className='flex w-full h-screen'>
                <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-6 flex flex-col min-h-0">
                    {/* Messages Container with Scroll */}
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    >
                        {!chatSelected &&
                            <div className='flex justify-center items-center h-4/5 text-8xl'><h1>Get Started</h1></div>
                        }
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >

                                {message.role === 'assistant' && (
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <FiCpu className="text-white text-sm" />
                                    </div>
                                )}

                                <div
                                    className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${message.role === 'user'
                                        ? 'bg-white text-gray-800 rounded-bl-sm'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    <ReactMarkdown>{message.content}</ReactMarkdown>
                                    </p>
                                </div>
                                {message.role === 'user' && (
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <FiUser className="text-white text-sm" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <FiCpu className="text-white text-sm animate-pulse" />
                                </div>
                                <div className="max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm">
                                    <TypingAnimation />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="flex-shrink-0 pt-4 border-t border-gray-200/50 mt-4">
                        <div className="flex items-end gap-3">
                            <form onSubmit={handleSubmit} className='w-full flex gap-4 items-center'>
                                <div className="flex-1 relative">
                                    <textarea
                                        rows={1}
                                        onChange={handleInputChange}
                                        value={input}
                                        // ref={inputRef}
                                        type="text"
                                        onKeyDown={handleKeyPress}
                                        placeholder="Type your message..."
                                        className="w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none shadow-sm"
                                    />
                                </div>
                                <button type='submit'
                                    onClick={handleSendMessage}
                                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                >
                                    <IoSend className="text-lg" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-64 bg-white/90 backdrop-blur-sm border-r border-gray-200 p-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Chats</h2>
                        <button
                            className="p-1 rounded hover:bg-blue-100 transition"
                            onClick={() => {
                                setTitles('')
                                setChatSelected(false)
                                setMessages([])
                            }}
                            aria-label="Add new chat"
                        >
                            <FiPlus className="text-blue-600" size={20} />
                        </button>
                    </div>
                    {chatList.map((chat, index) => (
                        <div
                            key={index}
                            onClick={() => loadChat(chat)}
                            className="cursor-pointer p-3 mb-2 rounded-lg hover:bg-blue-100 transition"
                        >
                            <div className="font-medium text-gray-800">{chat || 'Untitled Chat'}</div>
                            <div className="text-sm text-gray-500 truncate">{chat._id}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Chat;

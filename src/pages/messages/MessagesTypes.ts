export default interface ChatHead {
    chatName: string;
    messagePreview: string;
    date: string;
    profileLink: string;
    conversationId: string;
}

export interface Message {
    id: string;
    userId: string;
    name: string;
    message: string;
    filePaths: string[];
    timestamp: string;
}
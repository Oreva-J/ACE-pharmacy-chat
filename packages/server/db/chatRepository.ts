
let conversations = new Map<string, string>();

const getLastResponseId = (conversationId: string)=> {
    return conversations.get(conversationId)
}

const setLastResponseId = (conversationId: string, response_id: string) => {
    return conversations.set(conversationId, response_id)
}

export const conversationRepository = {
    getLastResponseId,
    setLastResponseId
}

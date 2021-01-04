export const convertBoardArray = (history) => {
    return history.filter(item => item.isCreator !== null).map(item => {
        return {
            isCreator: item.isCreator,
            i: item.lastMove ? item.lastMove.i : null,
            j: item.lastMove ? item.lastMove.j : null 
        }
    })
}

export const convertChatList = (creatorId, chatList) => {
    return chatList.map(item => {
        return {
            isCreator: item.id === creatorId,
            content: item.mess
        }
    })
}
import { Socket } from "socket.io"
import User from "../../entities/user"
import { Message } from "../../entities/messages"
import { AppDataSource } from "../../data-source"
import { Chat } from "../../entities/chat"

export const sendMessageNotification = (socket: Socket, chatId: string, sendUser: User, goTo: string) => {

    if (!goTo) {
        return "error user not found"
    }
    if (!sendUser) {
        return "error user not found"
    }
    socket.to(goTo).emit("newMessageNotify", {
        chatId,
    })
}


export const sendGenericNotification = (socket: Socket, _chatId: string, sendUser: User | null, goTo: string) => {
    if (!sendUser) {
        return "error user not found"
    }

    socket.to(goTo).emit("newGenericNotify", {
        message: "curtiu seu post!",
        sendUserInfos: {
            name: sendUser.nickname,
            profileImg: sendUser.profileImg,
            id: sendUser.id,
        }
    })
}


export const sendMessage = async (data: any, socket: Socket, usersSocketConnect: Array<any>) => {
    const { senderId, userReceived, content, roomId } = data;
    const chatId = roomId;
    const message = new Message();
    message.senderId = senderId;
    message.content = content;
    message.timestamp = new Date();

    try {
        let chat = await AppDataSource.getRepository(Chat).createQueryBuilder('chat')
            .leftJoinAndSelect('chat.messages', 'messages')
            .where('chat.roomId = :id', { id: String(data.roomId) })
            .getOne();

        if (chat == null || !chat) {
            chat = new Chat();
            chat.roomId = chatId;
            chat.messages = [];
            await AppDataSource.getRepository(Chat).save(chat);
        }


        if (!chat.messages) {
            chat.messages = [];
        }
        chat.messages.push(message);

        let senderUser = await AppDataSource.getRepository(User)
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.chats', 'chats')
            .where('user.id = :userId', { userId: senderId })
            .getOne();


        let receiverUser = await AppDataSource.getRepository(User)
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.chats', 'chats')
            .where('user.id = :userId', { userId: userReceived })
            .getOne();


        if (!senderUser) {
            senderUser = await AppDataSource.getRepository(User).findOneBy({ id: senderId });
        }
        if (!receiverUser) {
            receiverUser = await AppDataSource.getRepository(User).findOneBy({ id: userReceived });
        }

        if (senderUser && receiverUser) {
            if(!senderUser.chats){
                senderUser.chats = []
            }
            if(!receiverUser.chats){
                receiverUser.chats = []
            }
            senderUser.chats.push(chat);
            receiverUser.chats.push(chat);
            await AppDataSource.getRepository(User).save(senderUser);
            await AppDataSource.getRepository(User).save(receiverUser);
            chat.users = [senderUser, receiverUser];
        }
        await AppDataSource.getRepository(Chat).save(chat);


        const keyReceives = usersSocketConnect.find(user => user.userId == receiverUser?.id)
        if (keyReceives) {
            sendMessageNotification(socket, chatId, senderUser!, keyReceives.keyToSend)
        }
        socket.in(chatId).emit('receiveMessage', message)
    } catch (error) {
        console.error('Erro ao salvar o chat:', error);
    }
}

export const getHistoryChat = async (data: any, socket: Socket) => {

    let chat = await AppDataSource.getRepository(Chat).createQueryBuilder('chat')
        .leftJoinAndSelect('chat.messages', 'messages')
        .where('chat.roomId = :id', { id: String(data.chatId) }).orderBy('messages.timestamp', 'ASC')
        .getOne();

    const messages = chat?.messages;


    socket.emit("setHistoryChat", messages)
}
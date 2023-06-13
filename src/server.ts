import app from './app';
import { AppDataSource } from './data-source';
import http from 'http';
import { Server } from 'socket.io';
import { Chat } from './entities/chat';
import { Message } from './entities/messages';
import User from './entities/user';

(async () => {
    await AppDataSource.initialize().catch((err) => {
        console.error('Error during Data Source initialization', err);
    });

    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(socket.id);
        socket.on('conectChat', (ChatData) => {
            
            console.log('log join',ChatData);
            
            socket.join(ChatData);
            socket.on('getHistoryChat', async (data) => {
                
                let chat = await AppDataSource.getRepository(Chat).createQueryBuilder('chat')
                .leftJoinAndSelect('chat.messages', 'messages')
                .where('chat.roomId = :id', { id: String(data.chatId) }).orderBy('messages.timestamp', 'ASC')
                .getOne();
                
                const messages = chat?.messages;
                
                console.log(messages);

                socket.emit("setHistoryChat",messages)
            })

        });
        socket.on('sendMessage', async (data) => {
            const { senderId, userReceived, content, roomId } = data;
            const chatId = roomId;
            const message = new Message();
            message.senderId = senderId;
            message.content = content;
            message.timestamp = new Date();
            console.log('DATA => ',data);
            
            try {
                let chat = await AppDataSource.getRepository(Chat).createQueryBuilder('chat')
                .leftJoinAndSelect('chat.messages', 'messages')
                .where('chat.roomId = :id', { id: String(data.roomId) })
                .getOne();
                
                if (!chat) {
                    chat = new Chat();
                    chat.roomId = chatId;
                    chat.messages = [];
                }
                if(!chat.messages){
                    chat.messages = [];
                }

                chat.messages.push(message);

                // Associar tanto o remetente quanto o destinatário ao chat
                const senderUser = await AppDataSource.getRepository(User).findOneBy({id:senderId});
                const receiverUser = await AppDataSource.getRepository(User).findOneBy({id: userReceived});
                if (senderUser && receiverUser) {
                    chat.users = [senderUser, receiverUser];
                }

                await AppDataSource.getRepository(Chat).save(chat);

                console.log('Chat salvo:');
                console.log('Chat chatId:', chatId);
                socket.in(chatId).emit('receiveMessage',message)
            } catch (error) {
                console.error('Erro ao salvar o chat:', error);
            }
        });

    });

    const port = process.env.PORT || 3000;
    httpServer.listen(port, () => {
        console.log(`Servidor executando na porta ${port}`);
    });
})();

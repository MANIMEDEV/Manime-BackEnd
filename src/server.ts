import app from './app';
import { AppDataSource } from './data-source';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { getHistoryChat, sendMessage } from './services/socketServices/socketMessages';
import "dotenv/config";

interface ISocketUser {
    userId: number | string | string[],
    keyToSend: string
}

(async () => {
    await AppDataSource.initialize().catch((err) => {
        console.error('Error during Data Source initialization', err);
    });


    const orginUrl: string | undefined = process.env.Origin_URL;

    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: orginUrl,
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
            credentials: true
        }
    });
    const usersSocketConnect: Array<ISocketUser> = [];


    io.use((socket: Socket, next) => {
        // Verifique se os dados do usuário estão presentes na query da conexão
        const userId = socket.handshake.query.userId;

        if (!userId) {
            // Dados do usuário não estão presentes ou incompletos, recuse a conexão
            return next(new Error("Usuário não autenticado."));
        }
        // Dados do usuário presentes, permita a conexão
        next();
    });
    io.on('connection', (socket: Socket) => {
        const userId = socket.handshake.query.userId;
        const exists = usersSocketConnect.find(user => user.userId == userId);
        if (!exists && userId) {
            usersSocketConnect.push({ userId: userId, keyToSend: socket.id })

        } else {
            exists!.keyToSend = socket.id;
        }
        console.log(usersSocketConnect, "users");
        
        socket.on('conectChat', (ChatData) => {

            socket.join(ChatData);
            socket.on('getHistoryChat', async (data) => {
                getHistoryChat(data, socket);
            })

        });
        socket.on('sendMessage', async (data) => {
            await sendMessage(data, socket, usersSocketConnect);
        });

    });

    const port = process.env.PORT || 3000;
    httpServer.listen(port, () => {
        console.log(`Servidor executando na porta ${port}`);
    });
})();

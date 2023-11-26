import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ path: '/' })
export class DocGateway {}

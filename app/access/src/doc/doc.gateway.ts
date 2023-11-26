import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@WebSocketGateway()
export class DocGateway {
  constructor(private readonly docService: DocService) {}

  @SubscribeMessage('createDoc')
  create(@MessageBody() createDocDto: CreateDocDto) {
    return this.docService.create(createDocDto);
  }

  @SubscribeMessage('findAllDoc')
  findAll() {
    return this.docService.findAll();
  }

  @SubscribeMessage('findOneDoc')
  findOne(@MessageBody() id: number) {
    return this.docService.findOne(id);
  }

  @SubscribeMessage('updateDoc')
  update(@MessageBody() updateDocDto: UpdateDocDto) {
    return this.docService.update(updateDocDto.id, updateDocDto);
  }

  @SubscribeMessage('removeDoc')
  remove(@MessageBody() id: number) {
    return this.docService.remove(id);
  }
}

// import { AppStore } from 'app/types/app-store.type';
// import { Entity } from 'app/types/entity.type';

// export class MessagesService {
//   convertToStateFromEntity(msg: Entity.Message): AppStore.MessageState {
//     return {
//       ...msg,
//       _id: msg.id,
//       text: msg.text || '',
//       user: {
//         ...msg.user,
//         _id: msg.user?.id || '',
//         avatar: msg.user?.avatar || '',
//       },
//     };
//   }

//   converToStatesFromEntities(msgs: Entity.Message[]): AppStore.MessageState[] {
//     return msgs.map(msg => {
//       return this.convertToStateFromEntity(msg);
//     });
//   }
// }

// export const messagesService = new MessagesService();

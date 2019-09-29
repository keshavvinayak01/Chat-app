from channels.generic.websocket import AsyncWebsocketConsumer
from chat.models import User
from chat.models import Message
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def init_chat(self, data):
        username = data['username']
        user, created = User.objects.get(username=username)
        content = {
            'command' : 'init_chat'
        }
        if not user:
            content['error'] = 'Unable to get or create User with username : ' + username
            async self.send(text_data=json.dumps(content))
        content['success'] = 'Chatting success with username : ' + username
        async self.send(text_data=json.dumps(content))
    
    async def fetch_mesages(self, data):
        messages = Messages.recent_messages()
        messages_list = []
        for message in messages:
            messages_list.append({
                'id' : str(message.id),
                'author' : message.author.username,
                'content' : message.content,
                'created_at' : str(message.created_at)
            })
        content = {
            'command' : 'messages',
            'messages' : messages_list
        }
        await self.send(text_data=json.dumps(content))

    async def new_message(self, data):
        author, text = data['from'], data['text']
        author_user, created = User.objects.get_or_create(username = author)
        message = Message.objects.create(author=author_user, content=text)
        content = {
            'command' : 'new_message',
            'message' : {
                'id' : str(message.id),
                'author' : message.author.username,
                'content' : message.content,
                'created_at' : str(message.created_at)
            }
        }
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type' : 'chat_message',
                'message' : message
            }
        )

    commands = {
        'init_chat' : init_chat,
        'fetch_messages' : fetch_mesages,
        'new_message' : new_message
    }
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_' + self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
    
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Receive message from WebSocket
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type' : 'chat_message',
                'message' : message
            }
        )
    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))
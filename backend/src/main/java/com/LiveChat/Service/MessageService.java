package com.LiveChat.Service;

import java.util.List;

import com.LiveChat.Exception.ChatException;
import com.LiveChat.Exception.MessageException;
import com.LiveChat.Exception.UserException;
import com.LiveChat.Model.Message;
import com.LiveChat.Model.User;
import com.LiveChat.Payload.SendMessageRequest;

public interface MessageService {

    public Message sendMessage(SendMessageRequest req) throws UserException, ChatException;

    public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException;

    public Message findMessageById(Integer messaageId) throws MessageException;

    public void deleteMessage(Integer messageId, User reqUser) throws MessageException;

}

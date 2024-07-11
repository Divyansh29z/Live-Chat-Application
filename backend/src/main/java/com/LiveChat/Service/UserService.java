package com.LiveChat.Service;

import java.util.List;

import com.LiveChat.Exception.UserException;
import com.LiveChat.Model.User;
import com.LiveChat.Payload.UpdateUserRequest;

public interface UserService {

    public User findUserById(Integer id) throws UserException;

    public User findUserProfile(String jwt) throws UserException;

    public User updateUser(Integer userId, UpdateUserRequest req) throws UserException;

    public List<User> searchUser(String query);
}

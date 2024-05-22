package com.example.restapi.user;

import java.time.LocalDate;
import java.util.*;
import org.springframework.stereotype.Component;

@Component
public class UserDAOService {
    private static List<User> users=new ArrayList<>();
    private static int count=0;
    static {
        users.add(new User(++count,"Adam", LocalDate.now().minusYears(30)));
        users.add(new User(++count,"Eve",LocalDate.now().minusYears(25)));
        users.add(new User(++count,"Jim",LocalDate.now().minusYears(20)));
    }

    public List<User> findAll() {
        return users;
    }
    public User findOne(int id){
        for(int i=0;i<users.size();i++){
            if(users.get(i).id==id){
                return users.get(i);
            }
        }
        return null;
    }
    public User create(User user){
        user.setId(++count);
        users.add(user);
        return user;
    }

    public void deleteById(int id) {
        for(int i=0;i<users.size();i++){
            if(users.get(i).id==id){
                users.remove(i);
            }
        }
    }
}

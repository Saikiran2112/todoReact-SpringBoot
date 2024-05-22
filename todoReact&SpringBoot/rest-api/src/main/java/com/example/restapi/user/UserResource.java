package com.example.restapi.user;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class UserResource {
    @Autowired
    private UserDAOService service;
    @GetMapping("users")
    public List<User> retrieveAllUser(){
        return service.findAll();
    }
    @GetMapping("users/{id}")
    public User retrieveUser(@PathVariable int id){
        User user=service.findOne(id);
        if(user==null)
            throw new UserNotFoundException("id:"+id);

        return user;
    }
    @PostMapping("users")
    public ResponseEntity<User>  createUser(@Valid @RequestBody User user){
        User savedUser = service.create(user);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
    @DeleteMapping("users/{id}")
    public void deleteUser(@PathVariable int id){
        service.deleteById(id);
    }

}

package com.example.restapi.helloWorld;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class HelloWorldController {

    @GetMapping(value="hello-world")
    public String helloWorld(){
        return "Hello Sai Kiran";
    }
    @GetMapping(value="hello-world-bean")
    public HelloWorldBean Bean(){
        return new HelloWorldBean("Hello Sai Kiran");
    }
    @GetMapping(value="hello-world/path-variable/{name}")
    public String helloWorldPathVariable(@PathVariable String name){
        return "Hello "+name;
    }
}

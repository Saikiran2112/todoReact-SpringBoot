package com.example.restapi.todo;



import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Component

public class TodoService {
    private static List<Todo> todos=new ArrayList<>();
    private static int todosCount=0;
    static{
        todos.add(new Todo(++todosCount,"sreeja","Learn AWS", LocalDate.now().plusYears(1),false));
        todos.add(new Todo(++todosCount,"sreeja","Learn React", LocalDate.now().plusYears(2),false));
        todos.add(new Todo(++todosCount,"saikiran","Learn Angular", LocalDate.now().plusYears(3),false));
    }
    public List<Todo> findByUsername(String username){
        Predicate<? super Todo> predicate= todo->todo.getUsername().equals(username);
        return todos.stream().filter(predicate).toList();


    }
    public Todo addTodo(String username,String description,LocalDate targetDate,boolean done){
        Todo todo =new Todo(++todosCount,username,description, targetDate,done);
        todos.add(todo);
        return todo;
    }
    public void deleteTodo(int id){
        Predicate<? super Todo> predicate= todo->todo.getId()==id;
        todos.removeIf(predicate);
    }

    public Todo findById(int id) {
        Predicate<? super Todo> predicate= todo->todo.getId()==id;
        return todos.stream().filter(predicate).findFirst().get();
    }


    public void updateTodo(Todo todo) {
        deleteTodo(todo.getId());
        todos.add(todo);
    }
}

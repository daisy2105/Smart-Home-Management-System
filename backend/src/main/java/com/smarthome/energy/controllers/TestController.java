package com.smarthome.energy.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test1")
    public String test1() {
        return "test1";
    }

    @PostMapping("/test2")
    public String test2() {
        return "test2";
    }
}

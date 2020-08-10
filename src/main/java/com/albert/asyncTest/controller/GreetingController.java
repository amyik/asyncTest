package com.albert.asyncTest.controller;

import com.albert.asyncTest.domain.Greeting;
import com.albert.asyncTest.domain.HelloMessage;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.List;

@Controller
public class GreetingController {

    private SimpMessagingTemplate template;

    @Autowired
    public GreetingController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
    public void greeting(HelloMessage message) throws Exception {
        List<Greeting> greetings = Lists.newArrayList();
        greetings.add(new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!"));
        greetings.add(new Greeting("This Message is coming"));
        greetings.add(new Greeting("through WebSocket."));
        greetings.add(new Greeting("It Works !"));

        for(Greeting greeting : greetings) {
            Thread.sleep(2000); // simulated delay
            this.template.convertAndSend("/topic/greetings", greeting);
        }
    }

}

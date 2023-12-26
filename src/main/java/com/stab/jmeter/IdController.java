package com.stab.jmeter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
public class IdController {

  /*  @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;




    private List<String> arrId = new ArrayList<>();


    @PostMapping("/{id}")
    public void saveId(NumberRequest numberRequest) {
        String id = numberRequest.getId();
        arrId.add(id);
        kafkaMsg();
    }

    @GetMapping("/get")
    public String getArrId() {
        return arrId.toString();
    }

    public void kafkaMsg() {
        if (arrId.size() == 100) {
            kafkaTemplate.send("out", arrId.toString());
        }
    }

*/
}

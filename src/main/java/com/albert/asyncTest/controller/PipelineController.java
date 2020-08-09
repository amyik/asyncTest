package com.albert.asyncTest.controller;

import com.albert.asyncTest.domain.Pipeline;
import com.albert.asyncTest.service.PipelineService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class PipelineController {

    @Autowired
    PipelineService pipelineService;

    @GetMapping("/pipeline_list_with_status")
    public List<Pipeline> getPipelineListWithStatus() throws InterruptedException {

        return pipelineService.getPipelineListWithStatus();
    }

    @GetMapping("/pipeline_list_simple")
    public List<Pipeline> getPipelineListSimple() throws InterruptedException {

        return pipelineService.getPipelineListFromDB();
    }


    @GetMapping("/pipelines/{name}/status")
    public String getPipelineListSimple(@PathVariable String name) throws InterruptedException {

        return pipelineService.getStatusOf(name);
    }

}

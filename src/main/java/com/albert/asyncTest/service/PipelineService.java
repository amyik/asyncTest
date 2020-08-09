package com.albert.asyncTest.service;

import com.albert.asyncTest.domain.Pipeline;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class PipelineService {

    private static final Random random = new Random();

    private static List<Pipeline> pipelines = Lists.newArrayList(
            Pipeline.builder().projectId("myProject").name("pipeline_1").build(),
            Pipeline.builder().projectId("myProject").name("pipeline_2").build(),
            Pipeline.builder().projectId("myProject").name("pipeline_3").build(),
            Pipeline.builder().projectId("myProject").name("pipeline_4").build(),
            Pipeline.builder().projectId("myProject").name("pipeline_5").build()
            );

    public List<Pipeline> getPipelineListFromDB() throws InterruptedException {
        Thread.sleep(500);
        return pipelines.stream().map(pipeline -> {
            return Pipeline.builder()
                    .projectId(pipeline.getProjectId())
                    .name(pipeline.getName())
                    .status(pipeline.getStatus()).build();
        }).collect(Collectors.toList());
    }

    public List<Pipeline> getPipelineListWithStatus() throws InterruptedException {
        List<Pipeline> pipelineList = getPipelineListFromDB();
        pipelineList.stream().forEach(pipeline -> {
            try {
                pipeline.setStatus(getStatusOf(pipeline.getName()));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        return pipelineList;
    }

    public String getStatusOf(String name) throws InterruptedException {
        int delay = 500 + random.nextInt(1000);
        Thread.sleep(delay);
        return "OK";
    }
}

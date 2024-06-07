package com.compsci.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.compsci.webapp.exception.CustomLogger;

@SpringBootApplication
public class WebappApplication {

	public static void main(String[] args) {
		System.out.println("Hello");
		SpringApplication.run(WebappApplication.class, args);
//		CustomLogger.setContext("userID", "12345");
        CustomLogger.info("Performing a task");

        try {
            // Simulating some process
            CustomLogger.debug("Task in progress...");
            Thread.sleep(1000);
            
            CustomLogger.info("Task in info...");
            Thread.sleep(1000);
            int  arr [] = new int[2];
            arr[0] = 1;
            arr[1] = 2;
            arr[2] = 3;
            CustomLogger.info("Task completed successfully");
        } catch (Exception e) {
            CustomLogger.error("Task interrupted", e);
        } finally {
//            CustomLogger.clearContext();
        }
	}

}

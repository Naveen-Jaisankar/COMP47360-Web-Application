package com.compsci.controller;

import com.compsci.service.FlaskClientService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/predictions")
public class PredictionController {

    @Autowired
    private FlaskClientService flaskClientService;

    @PostMapping("/with-location")
    public ResponseEntity<JSONObject> predictWithLocation(@RequestBody String input) {
        try {
            JSONObject inputJson = new JSONObject(input);
            JSONObject result = flaskClientService.predictWithLocation(inputJson);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new JSONObject().put("error", e.getMessage()));
        }
    }

    @PostMapping("/for-all-grids")
    public ResponseEntity<JSONArray> predictForAllGrids(@RequestBody String input) {
        try {
            JSONObject inputJson = new JSONObject(input);
            JSONArray result = flaskClientService.predictForAllGrids(inputJson);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new JSONArray().put(new JSONObject().put("error", e.getMessage())));
        }
    }
}

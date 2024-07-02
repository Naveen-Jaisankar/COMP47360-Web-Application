package com.compsci.webapp.service;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class FlaskClientService {

    private static final String PREDICT_WITH_LOCATION_URL = "http://localhost:5000/predict_with_location";
    private static final String PREDICT_FOR_ALL_GRIDS_URL = "http://localhost:5000/predict_for_all_grids";

    public JSONObject predictWithLocation(JSONObject input) throws Exception {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(PREDICT_WITH_LOCATION_URL);

            StringEntity entity = new StringEntity(input.toString());
            httpPost.setEntity(entity);
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");

            try (CloseableHttpResponse response = client.execute(httpPost)) {
                String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
                return new JSONObject(responseString);
            }
        }
    }

    public JSONArray predictForAllGrids(JSONObject input) throws Exception {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(PREDICT_FOR_ALL_GRIDS_URL);

            StringEntity entity = new StringEntity(input.toString());
            httpPost.setEntity(entity);
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");

            try (CloseableHttpResponse response = client.execute(httpPost)) {
                String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
                return new JSONArray(responseString);
            }
        }
    }
}
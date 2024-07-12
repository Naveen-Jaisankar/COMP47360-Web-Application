package com.compsci.webapp.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.springframework.stereotype.Service;

import com.compsci.webapp.request.SingleGridRequest;
import com.compsci.webapp.response.AllGridResponse;
import com.compsci.webapp.response.SingleGridResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Module Name: MapServiceImpl.java
 * Date of Creation: 04-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@Service
public class MapServiceImpl implements MapService{

	@Override
	public List<AllGridResponse> predictForAllGrids(SingleGridRequest input) {
		// TODO Auto-generated method stub
		List<AllGridResponse> allPredictedValues = new ArrayList<AllGridResponse>();
		try {
			CloseableHttpClient client = HttpClients.createDefault();
	        HttpPost httpPost = new HttpPost("http://127.0.0.1:5001/predict_for_all_grids");
	        
	        ObjectMapper objectMapper = new ObjectMapper();
	        String jsonString = "";
	        jsonString = objectMapper.writeValueAsString(input);
	        StringEntity entity = new StringEntity(jsonString);
	        httpPost.setEntity(entity);
	        httpPost.setHeader("Accept", "application/json");
	        httpPost.setHeader("Content-type", "application/json");

	        CloseableHttpResponse response = client.execute(httpPost);
	        String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");

	        client.close();
	        System.out.println("Response from server (predict_with_location): " + responseString);
	        
	        AllGridResponse [] allGridResponse = objectMapper.readValue(responseString, AllGridResponse[].class);
	        allPredictedValues = Arrays.asList(allGridResponse);
	       
		}catch(Exception e) {
			e.printStackTrace();
		}
		return allPredictedValues;
	}

	@Override
	public SingleGridResponse predictForASingleGrid(SingleGridRequest input) {
		// TODO Auto-generated method stub
		SingleGridResponse singleGridResponse = new SingleGridResponse();
		try {
			CloseableHttpClient client = HttpClients.createDefault();
	        HttpPost httpPost = new HttpPost("http://127.0.0.1:5001/predict_with_location");
	        
	        ObjectMapper objectMapper = new ObjectMapper();
	        String jsonString = "";
	        jsonString = objectMapper.writeValueAsString(input);
	        StringEntity entity = new StringEntity(jsonString);
	        httpPost.setEntity(entity);
	        httpPost.setHeader("Accept", "application/json");
	        httpPost.setHeader("Content-type", "application/json");

	        CloseableHttpResponse response = client.execute(httpPost);
	        String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");

	        client.close();
	        System.out.println("Response from server (predict_with_location): " + responseString);

	        singleGridResponse =  objectMapper.readValue(responseString, SingleGridResponse.class);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return singleGridResponse;
	}

}

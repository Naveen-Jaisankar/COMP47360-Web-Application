package com.compsci.webapp.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Module Name: SingleGridRequest.java
 * Date of Creation: 04-Jul-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleGridRequest {
	
	@JsonProperty("loc_lat")
    private double locLat;

    @JsonProperty("loc_lon")
    private double locLon;

    @JsonProperty("time_stamp")
    private long timeStamp;

    @JsonProperty("humidity")
    private int humidity;

    @JsonProperty("wind_deg")
    private int windDeg;

    @JsonProperty("temp")
    private double temp;

    @JsonProperty("wind_speed")
    private double windSpeed;

    @JsonProperty("wind_gust")
    private double windGust;

    @JsonProperty("pressure")
    private double pressure;

    @JsonProperty("weather_id")
    private int weatherId;

	public double getLocLat() {
		return locLat;
	}

	public void setLocLat(double locLat) {
		this.locLat = locLat;
	}

	public double getLocLon() {
		return locLon;
	}

	public void setLocLon(double locLon) {
		this.locLon = locLon;
	}

	public long getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}

	public int getHumidity() {
		return humidity;
	}

	public void setHumidity(int humidity) {
		this.humidity = humidity;
	}

	public int getWindDeg() {
		return windDeg;
	}

	public void setWindDeg(int windDeg) {
		this.windDeg = windDeg;
	}

	public double getTemp() {
		return temp;
	}

	public void setTemp(double temp) {
		this.temp = temp;
	}

	public double getWindSpeed() {
		return windSpeed;
	}

	public void setWindSpeed(double windSpeed) {
		this.windSpeed = windSpeed;
	}

	public double getWindGust() {
		return windGust;
	}

	public void setWindGust(double windGust) {
		this.windGust = windGust;
	}

	public double getPressure() {
		return pressure;
	}

	public void setPressure(double pressure) {
		this.pressure = pressure;
	}

	public int getWeatherId() {
		return weatherId;
	}

	public void setWeatherId(int weatherId) {
		this.weatherId = weatherId;
	}
	
}

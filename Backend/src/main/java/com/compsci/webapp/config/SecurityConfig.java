package com.compsci.webapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.compsci.webapp.service.UserService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;

import java.util.Arrays;

import javax.crypto.spec.SecretKeySpec;
//import java.util.List;

@Configuration    // configuration class with bean definitions managed by spring
@EnableWebSecurity
public class SecurityConfig {
	
	@Value("${security.jwt.secret-key}")
	private String jwtSecretKey;
	
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .cors(Customizer.withDefaults()) // enables cors with default settings 
            .csrf(csrf -> csrf.disable()) //Need to be disabled, as we are using jwt authentication
            .authorizeHttpRequests(auth -> auth  // configures authorisation for http request
            	.requestMatchers("/").permitAll() // allowing all users to access the landing page
            	.requestMatchers("/client/login").permitAll() //allowing all users to access the login page
            	.requestMatchers("/client/register").permitAll() //allowing all users to access the registration page
                .anyRequest().authenticated() // lambda expression -  any incoming HTTP request must be authenticated
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .httpBasic(Customizer.withDefaults()) // enables basic authetication, default settings
            .build(); // finalises and build default http secuirty
            // The Customizer interface provides a single method allows you to define default configurations easily
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(" http://localhost:5173/"));
        configuration.setAllowedMethods(Arrays.asList("*")); // Allow all methods
        configuration.setAllowedHeaders(Arrays.asList("*")); // Allow all headers

        

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    JwtDecoder jwtDecoder() {
    	var secretKey = new SecretKeySpec(jwtSecretKey.getBytes(), "");
    	return NimbusJwtDecoder.withSecretKey(secretKey).macAlgorithm(MacAlgorithm.HS256).build();
    }
    
    @Bean
    AuthenticationManager authenticationManager(UserService userService) {
    	DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    	provider.setUserDetailsService(userService);
    	provider.setPasswordEncoder(new BCryptPasswordEncoder());
    	
    	return new ProviderManager(provider);
    }
}

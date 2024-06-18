package com.compsci.webapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

/**
 * Module Name: FreeMarkerConfig.java
 * Date of Creation: 18-Jun-2024
 * Author: navee
 *
 * Description:
 * This class handles ...
 */

@Configuration
public class FreeMarkerConfig {
	
	@Bean
	@Primary
    FreeMarkerConfigurationFactoryBean freemarkerConfiguration() {
        FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
        bean.setTemplateLoaderPath("classpath:/templates");
        return bean;
    }
}

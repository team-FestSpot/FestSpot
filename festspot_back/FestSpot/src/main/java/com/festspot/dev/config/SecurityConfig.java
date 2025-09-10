package com.festspot.dev.config;

import com.festspot.dev.security.handler.OAuth2SuccessHandler;
import com.festspot.dev.security.jwt.filter.JwtFilter;
import com.festspot.dev.service.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtFilter jwtFilter;
  private final OAuth2UserService oAuth2UserService;
  private final OAuth2SuccessHandler oAuth2SuccessHandler;

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.addAllowedOriginPattern(CorsConfiguration.ALL);
    corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);
    corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    // 위에서 설정한게 default로 설정되어 있어서 그거 쓰겠다
    http.cors(Customizer.withDefaults());
    http.csrf(csrf -> csrf.disable());
    http.formLogin(formLogin -> formLogin.disable());
    // Restful API -> 무상태성 으로 설정
    http.sessionManagement(
        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    // 모든 요청 허용
    http.authorizeHttpRequests(auth -> {
            auth.requestMatchers(HttpMethod.GET, "/api/board").permitAll();
            auth.requestMatchers("/api/board").authenticated();
            auth.requestMatchers(HttpMethod.GET, "/api/board/comments/").permitAll();
            auth.requestMatchers("/api/board/comments/").authenticated();
            auth.requestMatchers("/api/auth/withdraw").authenticated();
            auth.requestMatchers("/api/user/update/*").authenticated();
            auth.requestMatchers("/admin/*").hasRole("ADMIN");
            auth.anyRequest().permitAll();
        });

    http.exceptionHandling(
        handling -> handling.authenticationEntryPoint((request, response, authException) -> {
          authException.printStackTrace();
          response.setStatus(401);
        }));

    http.oauth2Login(oauth2 -> oauth2
        .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
        .successHandler(oAuth2SuccessHandler)
        .failureHandler((request, response, exception) -> {
          System.out.println("oauth2 인증 실패");
          exception.printStackTrace();
        })
    );

    return http.build();
  }
}

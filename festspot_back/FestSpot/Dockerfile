FROM eclipse-temurin:21-jdk
ARG JAR_FILE=target/*.jar
WORKDIR /app
ARG PROFILE
COPY upload /app/upload
COPY ${JAR_FILE} /app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=${PROFILE}", "-jar","/app.jar"]
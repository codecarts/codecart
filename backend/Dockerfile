# Use OpenJDK 17 base image
FROM eclipse-temurin:17-jdk-jammy

# Set the working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml for dependency caching
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Pre-download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build the application (skip tests for speed)
RUN ./mvnw package -DskipTests

# Copy and rename JAR for stable startup
RUN cp target/*.jar app.jar

# Expose (Render will inject the real $PORT)
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]

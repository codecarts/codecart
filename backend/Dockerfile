# Use an official OpenJDK 17 runtime as a parent image
FROM eclipse-temurin:17-jdk-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml from the current directory
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the application source code from the current directory
COPY src ./src

# Build the application, skipping tests for faster builds
RUN ./mvnw package -DskipTests

# Expose the port the app runs on
EXPOSE 10000

# The command to run the application
CMD ["java", "-jar", "target/api-0.0.1-SNAPSHOT.jar"]
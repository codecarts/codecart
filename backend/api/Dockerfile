# Use an official OpenJDK 17 runtime as a parent image
FROM eclipse-temurin:-21-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml to download dependencies first
# This helps with Docker's layer caching
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Build the application, skipping tests for faster builds
RUN ./mvnw package -DskipTests

# Expose the port the app runs on (Render injects the correct PORT)
EXPOSE 10000

# The command to run the application
# Make sure your .jar file name matches your pom.xml artifactId and version
CMD ["java", "-jar", "target/api-0.0.1-SNAPSHOT.jar"]
# Step1 : build the app
# Use official node image as the base image
FROM node:latest as build
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
# Install all the dependencies
RUN npm install --force
# Generate the build of the application
RUN npm run build
# Step2: serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest
# Copy the build output to replace the default nginx contents.
# be sure to replace app-name with name of your app
COPY --from=build /usr/local/app/dist/logos-operation /usr/share/nginx/html
# Expose port 80
EXPOSE 80
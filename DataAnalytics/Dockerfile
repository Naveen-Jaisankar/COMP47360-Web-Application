# Use the official Python image.
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# List installed packages for debugging
RUN pip list

# Make port 5001 available to the world outside this container
EXPOSE 5001

# Run app.py with Gunicorn when the container launches
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:app"]

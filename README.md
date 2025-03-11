# Backend  Assignment

Retail Pulse wants to create a service to process thousands of images collected from stores.

## Description
This project implements a backend service to handle image processing jobs. A user submits a job containing store IDs and image URLs. The service then downloads each image, calculates its perimeter, and mimics GPU processing using a random sleep time of 0.1 to 0.4 seconds. The job status can be checked via an API.
## Features
- Submit a Job (POST /api/submit)
- Retrieve Job Status (GET /api/status?jobid=123)
- Fast store validation using in-memory data
- Handles multiple jobs concurrently

## Assumptions
- Each job consists of multiple stores, each having multiple image URLs.
- Image processing involves calculating the perimeter as `2 * (Height + Width)`.
- The job processing time varies between a few minutes to an hour.
- Store details are referenced from the [Store Master](https://drive.google.com/file/d/1dCdAFEBzN1LVUUKxIZyewOeYx42PtEzb/view?usp=sharing).
- If an image download fails or an invalid `store_id` is encountered, the job fails.

## API Endpoints

### 1. Submit Job

**URL**: `/api/submit/`
**Method**: `POST`

#### Request Payload
```json
{
   "count":2,
   "visits":[
      {
         "store_id":"S00339218",
         "image_url":[
            "https://www.gstatic.com/webp/gallery/2.jpg",
            "https://www.gstatic.com/webp/gallery/3.jpg"
         ],
         "visit_time": "time of store visit"
      },
      {
         "store_id":"S01408764",
         "image_url":[
            "https://www.gstatic.com/webp/gallery/3.jpg"
         ],
         "visit_time": "time of store visit"
      }
   ]
}
```

#### Success Response
```json
{ "job_id": 123 }
```

#### Error Response
```json
{ "error": "Invalid request data" }
```

### 2. Get Job Info

**URL**: `/api/status?jobid=123`
**Method**: `GET`

#### Success Response
- If job is completed:
```json
{
    "status": "completed",
    "job_id": "123"
}
```
- If job failed:
```json
{
    "status": "failed",
    "job_id": "123",
    "error": [{ "store_id":"S00339218", "error": "Download failed" }]
}
```

#### Error Response
```json
{ "error": "Job ID not found" }
```


#### Store Master
-Loaded from store_master.csv into memory
-Contains store_id, store_name, and area_code
-Used for store validation during job processing

## Installation & Setup

### Without Docker
1. Install [Go](https://golang.org/dl/).
2. Clone the repository:
   ```sh
   git clone <repo-url>
   cd joblisting-backend
   ```
3. Install dependencies:
   ```sh
   go mod tidy
   ```
4. Run the server:
   ```sh
   go run main.go
   ```

### With Docker
1. Install [Docker](https://www.docker.com/).
2. Build and run the Docker container:
   ```sh
   docker build -t job_service .
   docker run -p 8080:8080 job_service
   ```

## Testing
Use Postman or `curl` to test the API endpoints:
```sh
curl -X POST http://localhost:8080/api/submit/ -H "Content-Type: application/json" -d '{ "count":2, "visits":[...] }'
```

## Work Environment
- **OS**: Windows 11 / Ubuntu 22.04
- **Node.js**: v18+
- **IDE**: VS Code / GoLand
- **Tools**: Postman,, Docker


## Potential Improvements
- Database Integration: Store results in MongoDB/PostgreSQL for persistence.
- Advanced Authentication: Use OAuth or API keys for better security.
- Implement a queue for job processing.
- Add retry mechanisms for image downloads.
- Optimize concurrency for faster processing.
- Improve logging and monitoring.

  
## Conclusion
This service efficiently processes images, validates store data in memory, and handles multiple jobs concurrently.



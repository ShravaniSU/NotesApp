# Backend Logging Guide

## Overview
The backend now has comprehensive logging enabled using Winston and Morgan. Logs are written to both console and files for easy monitoring.

## Log Files Location
- **Combined logs**: `backend/logs/combined.log`
- **Error logs**: `backend/logs/error.log`

These files are persisted via Docker volumes, so logs are retained even after container restarts.

## How to Check Logs

### 1. **View logs in real-time from Docker container**
```bash
docker logs -f notes-backend
```

### 2. **View logs from the host machine**
```bash
# View all logs
tail -f backend/logs/combined.log

# View only error logs
tail -f backend/logs/error.log

# View last 100 lines
tail -n 100 backend/logs/combined.log
```

### 3. **Search logs for specific patterns**
```bash
# Search for errors
grep "ERROR" backend/logs/combined.log

# Search for specific endpoint
grep "POST /api/notes" backend/logs/combined.log

# Search for authentication issues
grep "auth" backend/logs/error.log
```

### 4. **View logs from Docker Compose**
```bash
# Start services and tail logs
docker-compose up -d
docker-compose logs -f backend

# View logs of all services
docker-compose logs -f
```

## Log Format
Logs follow this format:
```
TIMESTAMP [LEVEL]: MESSAGE
```

Example:
```
2024-04-16 14:23:45 [INFO]: Server running on port 5000
2024-04-16 14:23:47 [INFO]: 172.20.0.1 - - [16/Apr/2024:14:23:47 +0000] "GET /api/notes HTTP/1.1" 200 142 "-" "Mozilla/5.0" [45 ms]
2024-04-16 14:23:50 [ERROR]: Database connection failed
```

## Log Levels
The application logs at the following levels:
- **ERROR**: Critical errors that need immediate attention
- **WARN**: Warnings about potentially problematic situations
- **INFO**: General informational messages
- **DEBUG**: Detailed debugging information

Default log level is `INFO`. Change it by setting `LOG_LEVEL` environment variable in docker-compose.yml.

## Log Rotation
- Each log file has a maximum size of 5MB
- Old logs are automatically archived (up to 5 files per type)
- This prevents logs from consuming too much disk space

## Monitoring Tips
1. **Monitor in production**: Use `tail -f backend/logs/error.log` to watch error logs
2. **Analyze performance**: Check response times in combined.log
3. **Debug issues**: Search for specific timestamps or user actions
4. **Track database operations**: Look for database-related entries

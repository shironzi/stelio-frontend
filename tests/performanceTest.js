import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
  stages: [
    { duration: "1s", target: 5 }
  ]
};

const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMjVAdGVzdC5jb20iLCJ1c2VySWQiOiI3OWM5MGQwOS0zMmUzLTQ2ZGYtYTk0My04NDQ1YzYwNjc0ODAiLCJlbWFpbCI6InVzZXIyNUB0ZXN0LmNvbSIsInJvbGUiOiJSRU5URVIiLCJpYXQiOjE3NzI3MTk5MjgsImV4cCI6MTc3MjgwNjMyOH0.58rZMg4s4bfHjciY3xv5xpf4TJX4WxM-Vqwwv-c-Ff0",
  "Idempotency-Key": uuidv4()
};

const payload = JSON.stringify({
    start: "2026-03-10T10:00:00",
    end: "2026-03-10T12:00:00",
    contactPhone: "09123456789",
    guestNames: [
        "John Doe",
        "Jane Doe"
    ]
});

export default function () {
  const res = http.post(
    "http://localhost:8080/api/bookings/162bac6b-49d2-4e74-8eeb-6307b68a0702", payload,
    { headers: headers }
  );

  console.log(`Status: ${res.status}`);

  sleep(1)

  check(res, {
    "allowed idempotent response": (r) =>
      r.status === 200 || r.status === 409
  });
}
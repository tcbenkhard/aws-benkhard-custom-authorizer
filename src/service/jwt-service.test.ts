import {JwtService} from "./jwt-service";
import * as jwt from 'jsonwebtoken';

describe('JWT-Service', () => {
   it('should decode message', async () => {
      const service = new JwtService();
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBhNGVlOWY0LWQxZTItNGViNi1iMWZjLTk1MWQxNGFmMzRmMCJ9.eyJlbWFpbCI6InRjYmVua2hhcmRAZ21haWwuY29tIiwic2FsdCI6IjcwMzg0OTczMTgiLCJoYXNoIjoiYjQ3OTc3YWFkODM5NWEyMTBlYTVjMTVkNmZmNDY2MjlmZjNjNTU4ZTA5ZTg4ZjdlNGFkYjgwMjI5YjI3ZDdkNjJjNjEzZDc2M2M1ODk0ZjllYzRhM2MwZGQ5YjA3NWQ0NzgyNTcyZDE2MzJlZWUyNDJjM2M4MzIwMThhYzlhYjciLCJpYXQiOjE2MDE5MjM0NTAsImV4cCI6MTYwMjAwOTg1MCwiaXNzIjoiYmVua2hhcmQtYXV0aG9yaXplciJ9.0LJNS3PgBE-s1R3tRzsJnrwuiaB8E-TFU-YyoyHdHJY';
      const secret = 'd689f9347cbfc215da32e701b6ad5025962235b8c10e1fcd942960f4fdb2648c66a3510e2994a9b87618ad1250095c6aeff7fb14060c9d896eeaf1083648dc4a3ab2abbdf461d0640f075aadff5c8611a1dc7f6c622c7a4ccace1fadb8e8b1a574d8da5f64d2ae69f237e8f64fad581e1fa1027bab48ebf5e368d0f7d050b9cf';

      const result = jwt.verify(token, secret);
      console.log(JSON.stringify(result));
   })
});
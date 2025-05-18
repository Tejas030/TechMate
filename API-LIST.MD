# TechMate APIs
 ## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

Status : Interested , Ignore , Accepted , Rejected

 ## connectionRouter
- POST /request/send/interested/:userID
- POST /request/send/ignore/:userID
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID

 ## userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET/user/feed
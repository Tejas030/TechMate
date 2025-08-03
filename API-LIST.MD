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
- POST /request/send/:status/:userID(ignored , rejected)

- POST /request/review/:status/:requestID(accepted , rejected)


 ## userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET/user/feed
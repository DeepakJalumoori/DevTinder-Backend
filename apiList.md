# DevTinder API's

## authRouter
- post /signup
- post /login
- post /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POSt /request/review/rejected/:requestId


## userRouter
- GET /user/connections
- GET /usdr/requests
- GET /user/feed 
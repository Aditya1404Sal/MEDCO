# Project Title

This Project is an Appointment Booking + Patient management system designed for doctors who are looking for an opensourced software to use in their medical life 
It works on a 3 way handshake interface between three parties
A) Doctor 
B) User/Patients 
C) Admin/Root control

### Supports only Desktop view

### This project is still in progress & Here are some features that need to be incorporated

- Payment gateway (Stripe/Razorpay)
- User Feedback section 
- 2 factor authentication
- Push notifications



## Authors

- [@Aditya1404Sal](https://www.github.com/Aditya1404Sal)


### Build

Make sure your node.js version is `v19.8.1` or above 

and that you have installed npm `v9.6.2` and above

install the required dependencies and packages by running the command

```bash
npm install
````








### Environment variables

to get started with hosting this project locally 

head over to the 

`
.env
`
File

inside it change the values of

`
JWT_SECRET
`and
`
MONGO_URL
`

to your own preferences 







## Deployment

To deploy this project run following code in the root directory

```bash
  npm run dev
```

to exit running instance enter 

```bash
Ctrl+c
```

* `note:` after registration on the web app , make sure to head over to your mongodb database and change the values of your user of the SchemaType

: `isAdmin = false` into `isAdmin = true` 

this is the temporary solution and will be patched in the upcoming updates
### Features

- Three way Handshake
- Beautiful UI/UX
- Admin system control panel



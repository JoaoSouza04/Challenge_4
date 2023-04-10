# Challenge_4

## technologies used in this challenge:

Node js with the Express framework and TypeORM for the connection with PostgreSQL DB,
challenge developed 100% in TypeScript!

### Steps to run this app in your environment!

### 1:

As a first step, you need to clone this repository into an empty folder, and for that, you must open the terminal and run this code: `git clone https://github.com/JoaoSouza04/Challenge_4.git`.

### 2:

After the previously step, all you have to do is to go into the repository folder you just created, through the terminal. After that, you should run this `npm install`.

#### 3:

And welldone!, your setup is now ready for run this application! To start the app you can run `npm run start` that runs the app once, or `npm run dev` which runs every time that a save occurs.

## Routes

In this application, some routes has been defined and a better documentation for that is in the swagger route. You can open that by enter `localhost:3000/api/v1/documentation` in your browser.

#### And all the routes except for the post routes, need a login to run wihout problems. The login routes are int the section "Login" of the routes.

### All the routes avaliable are:

#### Clients:

`localhost:3000/api/v1/clients` for get all and post routes about the client  
`localhost:3000/api/v1/clients/:id` for get by id and update route

#### Cars:

`localhost:3000/api/v1/clients/:id/cars` for get all and post routes  
`localhost:3000/api/v1/clients/:id/cars/:carId` for get by id, update and delete routes about one car

#### Mechanics:

`localhost:3000/api/v1/mechanics` for get all and post routes about the mechanics  
`localhost:3000/api/v1/mechanics/:id` for get by id and update routes

#### Parts:

`localhost:3000/api/v1/parts` for get all and post routes about parts  
`localhost:3000/api/v1/parts/:partId` for get by id and update routes

#### Services:

`localhost:3000/api/v1/services` for get all and post routes about services  
`localhost:3000/api/v1/services/:id` for get by id and update routes

#### Login:

Clients

`localhost:3000/api/v1/client/login` for login of clients  
`localhost:3000/api/v1/client/updatePassword` for update the password of clients  
`localhost:3000/api/v1/client/refreshToken` for a new token of clients

Mechanics

`localhost:3000/api/v1/mechanic/login` for login of mechanics  
`localhost:3000/api/v1/mechanic/updatePassword` for update the password of mechanics  
`localhost:3000/api/v1/mechanic/refreshToken` for a new token of mechanics

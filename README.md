# nestjs-playground
This repo is made for checking base functionality of nestjs application

### Learning progress:
- [ ] [NesJS docs manual ](https://docs.nestjs.com):
    - [X] [First steps](https://docs.nestjs.com/first-steps)


- [ ] Chat GPT manual:
    - [ ] Basics of NestJS:
        - [ ] Familiarize yourself with the core concepts:
            - [X] Controllers
                > Controllers are responsible for handling incoming requests and returning responses to the client.
            - [X] Modules
                > Modules are used to organize the application structure into cohesive blocks of related functionality.
                
                > Each part of the app (like users, orders, products, etc.) can have its own module, which encapsulates the related functionalities.
                
                > In NestJS, a module is a class decorated with @Module()
            - [X] Providers (Services)
              > Providers can be services, repositories, factories, helpers, or any other classes that your application needs to function.
            
              > A typical use case for providers in NestJS is data-fetching, where you'd have a service that fetches data from a database or another API, and this service is then used by a controller.
                
              > Providers are decorated with `@Injectable()`, indicating they can be managed by the NestJS dependency injection system.
            - [ ] Middleware
    - [ ] Set Up a NestJS Project
        - [ ] Create a new project using the CLI
        - [ ] Explore the structure of the project to understand the default setup.
    - [ ] Deep Dive into Main Concepts:
        - [ ] Controllers:
            - [ ] how routes are defined,
            - [ ] handle different HTTP methods
            - [ ] receive data (using decorators like @Body(), @Param(), @Query(), etc.)
        - [ ] Providers:
            - [ ] how dependency injection works in NestJS
            - [ ] create services to encapsulate business logic.
            - [ ] create a service,
            - [ ] inject it into a controller
            - [ ] use it to handle business logic.
        - [ ] Modules
            - [ ] create a module and use it to organize your code.
            - [ ] use the @Global() decorator to make a module global.
        - [ ] Middleware
            - [ ] create middleware
            - [ ] use it to intercept requests.
            - [ ] run code before the request handlers, for tasks like logging, authentication
        - [ ] Exception Filters
            - [ ] create exception filters and use them to handle errors.
            - [ ] use the built-in exception filters to handle common errors.
            - [ ] craft custom responses.
        - [ ] Authentication and Authorization
            - [ ] integrate authentication using JWTs, sessions, or other methods
        - [ ] Guards
            - [ ] create guards and use them to protect routes.
            - [ ] use the built-in guards to protect routes.
        - [ ] Interceptors
            - [ ] create interceptors and use them to intercept requests and responses.
            - [ ] Learn their role in transforming the data returned from route handlers or for logging purposes.
            - [ ] use the built-in interceptors to handle common tasks.
        - [ ] Pipes
            - [ ] create pipes and use them to validate data.
            - [ ] use the built-in pipes to validate data.
        - [ ] Databases
            - [ ] connect to a database
            - [ ] use the built-in modules to interact with a database.
            - [ ] use @nestjs/typeorm package.
            - [ ] Repository pattern, and perform CRUD operations.
        - [ ] Testing
            - [ ] write unit tests for your NestJS application.
            - [ ] use the built-in testing utilities.
        - [ ] Best Practices
            - [ ] Dive into the official documentation and read about best practices


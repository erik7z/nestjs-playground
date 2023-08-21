# nestjs-playground
This repo is made for checking base functionality of nestjs application

### Learning progress:
- [ ] [NesJS docs manual ](https://docs.nestjs.com):
    - [X] [First steps](https://docs.nestjs.com/first-steps)

- [ ] Chat GPT manual:
    - [X] Basics of NestJS:
      
      - [X] Set Up a NestJS Project
        - [X] Create a new project using the CLI
        
        - [X] Explore the structure of the project to understand the default setup.

        - [X] Familiarize yourself with the core concepts:
           - [X] 01 Modules
              > Modules are used to organize the application structure into cohesive blocks of related functionality.

              > Each part of the app (like users, orders, products, etc.) can have its own module, which encapsulates the related functionalities.

              > In NestJS, a module is a class decorated with @Module()            

           - [X] 02 Controllers
                > Controllers are responsible for handling incoming requests and returning responses to the client.

           - [X] 03 Providers (Services)
              > Providers can be services, repositories, factories, helpers, or any other classes that your application needs to function.
            
              > A typical use case for providers in NestJS is data-fetching, where you'd have a service that fetches data from a database or another API, and this service is then used by a controller.
                
              > Providers are decorated with `@Injectable()`, indicating they can be managed by the NestJS dependency injection system.
          
           - [X] 04 Middleware
              > Middleware in NestJS provides a way to handle requests and responses, acting as a bridge between the request and the actual route handlers;
            
              >  A function with access to the request object (`req`), the response object (`res`), and the next middleware in line (`next`).
              
              > Middleware used to:
                > - Logging incoming requests
                > - Authentication and authorization
                > - Input validation
                > - Setting headers or modifying the response
                > - Handling CORS
 
    - [ ] Deep Dive into NestJS Main Concepts:
        - [X] Guards
          > Guard is a function that determines whether a given request will be handled by the route handler or not.

          > Guard is a class annotated with the @Injectable() decorator. It implements the CanActivate interface.
          
          - [X] Create guards and use them to protect routes.
          - [X] Use the built-in guards to protect routes.
            > - AuthGuard / JwtAuthGuard
            > - RolesGuard
            > - ThrottlerGuard
          - [X] Compare Guards and middleware: 
            > Use Middleware for:
            >  - General tasks applicable to multiple routes (e.g., logging, CORS handling).
            >  - Global input validation or transformation.
            >  - Setting up some global state or context for later use in the request lifecycle.
        
            > Use Guards for:  
            > - Role-based access control.
            > - Validating the identity of a user.
            > - Any decision-making that requires context about which specific route or controller method is being accessed.
      
        - [X] Interceptors
          > Interceptors perfect for various tasks like handling and transforming responses, logging, caching, etc
            - [X] Learn their role in transforming the data returned from route handlers or for logging purposes.
            - [X] create interceptors and use them to intercept requests and responses.
            - [X] use the built-in interceptors to handle common tasks.
      
        - [X] Pipes
            > Pipes can either transform input data to a desired form or validate input data to ensure it meets expected criteria.
              
            - [X] create pipes and use them to validate data.
            - [X] use the built-in pipes to validate data.

      - [X] Exception Filters
           > They allow you to implement custom error handling logic

          - [X] create exception filters and use them to handle errors.
          - [X] use the built-in exception filters to handle common errors.
          - [X] craft custom responses.    
        
        - [ ] Databases
            - [ ] connect to a database
            - [ ] use the built-in modules to interact with a database.
            - [ ] use @nestjs/typeorm package.
            - [ ] Repository pattern, and perform CRUD operations.

        - [ ] Testing
            - [ ] write unit tests for your NestJS application.
            - [ ] use the built-in testing utilities.

        - [ ] Authentication and Authorization
            - [ ] integrate authentication using JWTs, sessions, or other methods

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

        - [ ] Best Practices
            - [ ] Dive into the official documentation and read about best practices


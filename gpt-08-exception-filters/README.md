### Exception Filters:

Are essential when it comes to catching and handling exceptions that might be thrown during the execution of your application. They allow you to implement custom error handling logic.

For our Cats project, let's consider the following scenarios:

1. We want a custom error message when someone tries to fetch a cat that doesn't exist.
2. We want a custom error response when validation fails due to invalid data.

### Step 1: Creating a Global Filter

First, let's create a basic global exception filter. This will catch any unhandled exceptions.

**1.1 Create the file for the global exception filter:**

```bash
mkdir src/filters
touch src/filters/http-exception.filter.ts
```

**1.2 Populate `http-exception.filter.ts` with the following content:**

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
```

### Step 2: Applying the Global Filter

To apply the filter globally, update the `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

### Step 3: Custom Exception Filters for Specific Use Cases

Let's imagine the scenario where we try to get a cat by an ID, but the cat doesn't exist. We want to throw and handle this specific exception.

**3.1 Modify `cats.service.ts` to simulate a situation where a cat isn't found by ID:**

```typescript
// ... (other imports and code)
@Injectable()
export class CatsService {
  private readonly cats: string[] = ['Tom', 'Jerry'];

  findAll(): string[] {
    return this.cats;
  }

  findOne(id: number): string {
    const cat = this.cats[id];
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`); // This is a NestJS built-in exception
    }
    return cat;
  }

  // ... (other methods)
}
```

Now, when you call the `GET /cats/:id` endpoint with an invalid ID, it will throw a `NotFoundException`. The global filter will then catch this exception and format the error response accordingly.

To get even more granular with your error handling, you can create custom exception filters for specific controllers or routes, but the global exception filter will act as a catch-all for any exceptions not handled by more specific filters.

**3.2 Optional: Apply Filter to Specific Route or Controller**

If you wish to apply the custom `HttpExceptionFilter` to a specific route or controller instead of globally, you can do so with the `@UseFilters()` decorator.

Example for a specific route:

```typescript
@Get(':id')
@UseFilters(new HttpExceptionFilter())
findOne(@Param('id', ParseIntPipe) id: number): string {
  return this.catsService.findOne(id);
}
```

With these steps, you've integrated exception filters into your Cats project to handle potential errors gracefully. This way, your API consumers receive consistent and understandable error responses.

---

# Custom Responses in Exception Filters

Crafting custom responses in exception filters gives you the ability to tailor the error messages that your application sends to the client. This can be essential for many reasons:

1. **User Experience:** Detailed and specific error messages can help the user understand what went wrong.
2. **Developer Experience:** Clear error messages can aid developers in troubleshooting and debugging.
3. **Consistent API Design:** Ensuring all errors follow the same format makes the API more predictable for consumers.
4. **Security:** Revealing too much about the internal workings of an application can expose vulnerabilities. Crafting responses allows you to control the amount of information you expose.

### Crafting Custom Responses in Exception Filters

Let's walk through how you can create custom error responses in our Cats project.

**1. Enhancing the Global Exception Filter**

We can enhance our `HttpExceptionFilter` to include more detailed error data when applicable.

**Update `http-exception.filter.ts`**:

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    const error = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: (typeof errorResponse === 'string') ? errorResponse : errorResponse.message,
    };

    // You can further format the error or add any additional information if needed.

    response.status(status).json(error);
  }
}
```

In this modification, we've added the request method and expanded how we gather the error message. If the response from the exception is an object (like it often is with validation errors), we extract the `message` property. If it's just a string, we use it directly.

**2. Custom Exception with Custom Response**

For demonstration purposes, let's consider a hypothetical situation where we need to throw a custom exception when a user tries to add a cat with a name that's already taken.

**Create a custom exception: `duplicate-cat.exception.ts`**:

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateCatException extends HttpException {
  constructor(catName: string) {
    const message = `The cat named "${catName}" already exists!`;
    super({ message, error: 'Duplicate Cat' }, HttpStatus.BAD_REQUEST);
  }
}
```

Now, you can use this custom exception in your service or controller, and it will produce a detailed, custom error message for this specific situation. When it's caught by our global exception filter, the filter will use the provided `message` and `error` properties to format the response.

This approach allows you to have fine-grained control over the error responses of your application, ensuring they are meaningful, consistent, and useful.
### Pipes:

Pipes are a powerful tool in NestJS that allow you to handle transformation and validation of the data. They operate on the arguments that are passed into route handlers. Here's an introduction to Pipes and how they work:

### What are Pipes?

Pipes can either transform input data to a desired form or validate input data to ensure it meets expected criteria. NestJS pipes are inspired by Angular pipes and can be used in a similar manner.

There are two types of pipes:

1. **Transformation Pipes**: Transform input data before it's received by a route handler.
2. **Validation Pipes**: Validate input data and throw an exception when the data is incorrect.

### Using Pipes

Pipes can be used:

- **Globally**: Affects all route handlers in your application.
- **At the controller level**: Affects all route handlers within a particular controller.
- **At the route handler level**: Affects only a specific route handler.

### Built-in Pipes

NestJS provides some built-in pipes:

1. **`ParseIntPipe`**:
  - Transforms a route parameter into a number.
   ```typescript
   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
     // `id` is now a number.
   }
   ```

2. **`ValidationPipe`**:
  - It integrates with the `class-validator` and `class-transformer` libraries to validate and transform request payloads.
  - Especially useful with DTOs.
   ```typescript
   @Post()
   create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
     // `createTaskDto` has been validated and transformed.
   }
   ```

### Custom Pipes

You can also create custom pipes by implementing the `PipeTransform` interface.

Example - a pipe that converts a string to uppercase:

```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Value should be a string');
    }
    return value.toUpperCase();
  }
}

// Usage
@Get(':name')
getHello(@Param('name', UppercasePipe) name: string) {
  console.log(name); // This will be in uppercase
}
```

### Validation with Pipes 
Let's validate the payload that comes in when we want to create a new cat. We'll do this using a DTO and NestJS's built-in `ValidationPipe`.

### Transformation with Pipes
We'll use a built-in transformation pipe called `ParseIntPipe` to ensure that the `id` parameter is a number when we retrieve a single cat.

First, you need to install the necessary packages:

```bash
npm install class-validator class-transformer
```

### 1. Create a DTO (Data Transfer Object) for Cat Creation

This is the structure that the payload must adhere to when creating a new cat:

```typescript
// src/cats/dto/create-cat.dto.ts
import { IsString, Length } from 'class-validator';

export class CreateCatDto {
    @IsString()
    @Length(3, 20)
    name: string;
}
```

### 2. Modify the CatsController to use Pipes

Let's update the `cats.controller.ts`:

```typescript
import { Controller, Get, Post, Param, Body, HttpCode, UseGuards, UseInterceptors, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatsService } from "./cats.service";
import { AuthGuard } from "../../auth/auth.guard";
import { LoggingInterceptor } from "../../interceptors/logging.interceptor";
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @UseInterceptors(LoggingInterceptor)
    @Get()
    findAll(): string[] {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): string {
        // The id is now a number, thanks to ParseIntPipe
        return `This action returns the cat with ID ${id}`;
    }

    @Post()
    @HttpCode(204)
    @UsePipes(new ValidationPipe())
    create(@Body() createCatDto: CreateCatDto) {
        // Payload is now validated and transformed to match CreateCatDto
        this.catsService.create(createCatDto);
    }

    @Get('protected')
    @UseGuards(AuthGuard)
    findProtectedCats() {
        return "This route is protected!";
    }
}
```

**Key changes**:

1. We used the `CreateCatDto` for our `create` method's body parameter.
2. We applied the `ValidationPipe` to the `create` method with `@UsePipes(new ValidationPipe())`. This ensures that any payload sent to this endpoint matches the structure and validation rules of `CreateCatDto`.
3. We applied the `ParseIntPipe` to the `id` parameter in the `findOne` method. This will transform the `id` from a string to a number and throw an error if the conversion isn't possible.

You can also set up the `ValidationPipe` globally in `main.ts` so you don't have to use `@UsePipes()` on each route, but for this example, I've shown the more localized approach.

With these modifications, the `cats.controller.ts` will validate the data that's sent to the `create` method, ensuring that it aligns with the rules defined in `CreateCatDto`, and will transform the `id` parameter in the `findOne` method to be a number.
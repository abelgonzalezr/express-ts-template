import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Response, 
    Security
  } from "tsoa";
  import { User } from "../models/user";
  import { UsersService, UserCreationParams } from "../services/usersService";
  import { ValidateErrorJSON } from "../shared/interfaces";
  
  @Route("users")
  export class UsersController extends Controller {
    
    @Get("{userId}")
    public async getUser(
      @Path() userId: number,
      @Query() name?: string
    ): Promise<User> {
      return new UsersService().get(userId, name);
    }

    @Security("jwt")
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
      @Body() requestBody: UserCreationParams
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      new UsersService().create(requestBody);
      return;
    }
  }
  
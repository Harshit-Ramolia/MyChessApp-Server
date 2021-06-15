import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import "reflect-metadata";
import { UserModel, UserClass } from "../models/user";
import argon2 from "argon2";
import { MyContext } from "src/types";

@InputType()
class UserRegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
class UserLoginInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  password!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserClass, { nullable: true })
  user?: UserClass;
}

@Resolver()
export class UserResolver {
  @Query(() => [UserClass])
  users() {
    return UserModel.find({});
  }

  @Query(() => UserClass, { nullable: true })
  userByID(@Arg("id") id: string): UserClass {
    return UserModel.findOne({ _id: id });
  }

  @Mutation(() => UserClass)
  async register(@Arg("input") input: UserRegisterInput) {
    const hashedPassword = await argon2.hash(input.password);
    return UserModel.create({ ...input, password: hashedPassword });
  }

  @Mutation(() => UserResponse)
  async login(@Arg("input") input: UserLoginInput, @Ctx() { req }: MyContext) {
    const { username, email, password } = input;
    const user = await UserModel.findOne({ username, email });
    if (!user) {
      return {
        error: [
          {
            field: "username",
            message: "Username doesn't exist",
          },
        ],
      };
    }
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return {
        error: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    req.session.user = user._id;
    return { user };
  }
}

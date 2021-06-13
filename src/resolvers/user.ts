import { Query, Resolver } from "type-graphql";
import 'reflect-metadata'
import { UserModel, UserClass } from "../models/user";

@Resolver()
export class UserResolver {
    @Query(() => [UserClass])
    users() {
        return UserModel.find({})
    }
}
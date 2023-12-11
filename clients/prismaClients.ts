import { PrismaClient } from "@prisma/client";
import exp from "constants";

class Prisma {
  public prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
}

const prismaClass = new Prisma();

export const prismaClient = prismaClass.prismaClient;

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'owner');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';

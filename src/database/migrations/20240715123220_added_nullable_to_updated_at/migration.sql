-- AlterTable
ALTER TABLE "countries" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "genres" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;

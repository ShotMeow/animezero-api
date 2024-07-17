/*
  Warnings:

  - Made the column `country_id` on table `movies` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_country_id_fkey";

-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "country_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

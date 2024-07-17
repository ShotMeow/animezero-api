/*
  Warnings:

  - You are about to drop the column `video_url` on the `movies` table. All the data in the column will be lost.
  - Added the required column `wallpaper_url` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "video_url",
ADD COLUMN     "wallpaper_url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "voiceover" TEXT NOT NULL,
    "episode" INTEGER,
    "season" INTEGER,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opening_start" TEXT NOT NULL,
    "opening_end" TEXT NOT NULL,
    "ending_start" TEXT NOT NULL,
    "ending_end" TEXT,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "episodes_name_key" ON "episodes"("name");

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

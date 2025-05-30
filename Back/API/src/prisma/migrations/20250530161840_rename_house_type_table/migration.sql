/*
  Warnings:

  - You are about to drop the `houseType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_typeId_fkey";

-- DropTable
DROP TABLE "houseType";

-- CreateTable
CREATE TABLE "house_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "house_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "house_type_name_key" ON "house_type"("name");

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "house_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

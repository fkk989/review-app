/*
  Warnings:

  - You are about to drop the column `serviceType` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `socialType` on the `Service` table. All the data in the column will be lost.
  - Added the required column `service` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "serviceType",
DROP COLUMN "socialType",
ADD COLUMN     "service" TEXT NOT NULL,
ADD COLUMN     "social" TEXT NOT NULL;

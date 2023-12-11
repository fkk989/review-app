/*
  Warnings:

  - You are about to drop the column `types` on the `Service` table. All the data in the column will be lost.
  - Added the required column `socialLInk` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialType` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "socialLInk" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "types",
ADD COLUMN     "serviceType" TEXT NOT NULL,
ADD COLUMN     "socialType" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

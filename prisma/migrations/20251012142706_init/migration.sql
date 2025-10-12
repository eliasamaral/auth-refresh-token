/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `refresh_tokens` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."refresh_tokens" DROP CONSTRAINT "refresh_tokens_userId_fkey";

-- AlterTable
ALTER TABLE "public"."refresh_tokens" DROP COLUMN "expiresIn";

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

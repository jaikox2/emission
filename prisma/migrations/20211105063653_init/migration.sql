/*
  Warnings:

  - A unique constraint covering the columns `[ID]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_ID_key" ON "users"("ID");

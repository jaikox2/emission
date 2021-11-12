-- DropIndex
DROP INDEX "users_ID_email_password_idx";

-- CreateIndex
CREATE INDEX "users_ID_idx" ON "users"("ID");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_password_idx" ON "users"("password");

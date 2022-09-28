-- CreateTable
CREATE TABLE "PasswordForgetKey" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "PasswordForgetKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordForgetKey_userId_key" ON "PasswordForgetKey"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordForgetKey_key_key" ON "PasswordForgetKey"("key");

-- AddForeignKey
ALTER TABLE "PasswordForgetKey" ADD CONSTRAINT "PasswordForgetKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

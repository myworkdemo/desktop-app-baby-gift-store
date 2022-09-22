-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userEmailId" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userRole" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdDate" DATETIME
);

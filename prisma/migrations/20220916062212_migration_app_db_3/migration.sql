-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userEmailId" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userRole" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdDate" DATETIME,
    "profilePhoto" TEXT
);
INSERT INTO "new_User" ("createdDate", "isActive", "profilePhoto", "userEmailId", "userId", "userName", "userPassword", "userRole") SELECT "createdDate", "isActive", "profilePhoto", "userEmailId", "userId", "userName", "userPassword", "userRole" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

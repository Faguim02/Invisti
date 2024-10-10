/*
  Warnings:

  - You are about to drop the column `last_updated` on the `receive_money` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receive_money" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    CONSTRAINT "receive_money_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_receive_money" ("balance", "id", "user_id") SELECT "balance", "id", "user_id" FROM "receive_money";
DROP TABLE "receive_money";
ALTER TABLE "new_receive_money" RENAME TO "receive_money";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "senderImg" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL,
    "newsId" TEXT NOT NULL DEFAULT '',
    "topic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receiverId" UUID NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

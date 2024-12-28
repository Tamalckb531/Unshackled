-- CreateTable
CREATE TABLE "_UserDownvotedNews" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserDownvotedNews_AB_unique" ON "_UserDownvotedNews"("A", "B");

-- CreateIndex
CREATE INDEX "_UserDownvotedNews_B_index" ON "_UserDownvotedNews"("B");

-- AddForeignKey
ALTER TABLE "_UserDownvotedNews" ADD CONSTRAINT "_UserDownvotedNews_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDownvotedNews" ADD CONSTRAINT "_UserDownvotedNews_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

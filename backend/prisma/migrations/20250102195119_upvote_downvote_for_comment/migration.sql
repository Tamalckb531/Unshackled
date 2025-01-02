-- CreateTable
CREATE TABLE "_UserUpvotedComments" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_UserDownvotedComments" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserUpvotedComments_AB_unique" ON "_UserUpvotedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_UserUpvotedComments_B_index" ON "_UserUpvotedComments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserDownvotedComments_AB_unique" ON "_UserDownvotedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_UserDownvotedComments_B_index" ON "_UserDownvotedComments"("B");

-- AddForeignKey
ALTER TABLE "_UserUpvotedComments" ADD CONSTRAINT "_UserUpvotedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserUpvotedComments" ADD CONSTRAINT "_UserUpvotedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDownvotedComments" ADD CONSTRAINT "_UserDownvotedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDownvotedComments" ADD CONSTRAINT "_UserDownvotedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "_CollaboratorNews" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollaboratorNews_AB_unique" ON "_CollaboratorNews"("A", "B");

-- CreateIndex
CREATE INDEX "_CollaboratorNews_B_index" ON "_CollaboratorNews"("B");

-- AddForeignKey
ALTER TABLE "_CollaboratorNews" ADD CONSTRAINT "_CollaboratorNews_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorNews" ADD CONSTRAINT "_CollaboratorNews_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "_UserFeaturedNews" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFeaturedNews_AB_unique" ON "_UserFeaturedNews"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFeaturedNews_B_index" ON "_UserFeaturedNews"("B");

-- AddForeignKey
ALTER TABLE "_UserFeaturedNews" ADD CONSTRAINT "_UserFeaturedNews_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFeaturedNews" ADD CONSTRAINT "_UserFeaturedNews_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ratings_agentId_clientId_key" ON "ratings"("agentId", "clientId");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

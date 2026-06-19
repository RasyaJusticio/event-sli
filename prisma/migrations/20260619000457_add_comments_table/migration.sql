-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SHOWN');

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Anonymous',
    "message" TEXT NOT NULL,
    "status" "CommentStatus" NOT NULL DEFAULT 'PENDING',
    "rejectReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "shownAt" TIMESTAMP(3),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rotation_state" (
    "id" TEXT NOT NULL,
    "currentCommentId" TEXT,
    "displayUntil" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rotation_state_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comments_status_createdAt_idx" ON "comments"("status", "createdAt");

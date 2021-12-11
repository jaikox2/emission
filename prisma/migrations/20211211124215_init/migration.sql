/*
  Warnings:

  - You are about to drop the column `emission_activity_types_id` on the `emission_sources` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "emission_sources" DROP CONSTRAINT "emission_sources_emission_activity_types_id_fkey";

-- AlterTable
ALTER TABLE "emission_sources" DROP COLUMN "emission_activity_types_id";

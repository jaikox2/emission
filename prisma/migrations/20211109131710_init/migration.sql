/*
  Warnings:

  - Added the required column `template_file_name` to the `emission_activity_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emission_activity_types" ADD COLUMN     "template_file_name" TEXT NOT NULL;

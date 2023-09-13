/*
  Warnings:

  - You are about to alter the column `data_hora` on the `tbl_status_servico` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `tbl_status_servico` MODIFY `data_hora` DATETIME NOT NULL;

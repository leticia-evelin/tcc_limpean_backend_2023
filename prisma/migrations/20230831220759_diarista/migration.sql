-- CreateTable
CREATE TABLE `tbl_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(20) NOT NULL,
    `data_nascimento` DATE NOT NULL,
    `biografia` TEXT NULL,
    `foto_perfil` TEXT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(30) NOT NULL,
    `media_valor` VARCHAR(45) NOT NULL,
    `id_endereco` INTEGER NOT NULL,
    `id_genero` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_diarista_cpf_key`(`cpf`),
    UNIQUE INDEX `tbl_diarista_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_telefone_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_telefone` VARCHAR(15) NOT NULL,
    `ddd` VARCHAR(2) NOT NULL,
    `id_diarista` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_telefone_diarista_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_diarista` ADD CONSTRAINT `tbl_diarista_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_diarista` ADD CONSTRAINT `tbl_diarista_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `tbl_genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_telefone_diarista` ADD CONSTRAINT `tbl_telefone_diarista_id_diarista_fkey` FOREIGN KEY (`id_diarista`) REFERENCES `tbl_diarista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

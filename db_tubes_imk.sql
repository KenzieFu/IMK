-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2023 at 07:31 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tubes_imk`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `tambah_peminjaman` (`in_id_buku` INT, `in_id_siswa` INT, `in_tanggal_pinjam` DATE, `in_tanggal_kembali` DATE)  BEGIN
  INSERT INTO peminjaman (id_buku, id_siswa, tanggal_pinjam, tanggal_kembali)
  VALUES (in_id_buku, in_id_siswa, in_tanggal_pinjam, in_tanggal_kembali);
  
  UPDATE buku
  SET status = 'Sedang Dipinjam'
  WHERE id_buku = in_id_buku;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `hitung_jumlah_buku_dipinjam` (`in_id_siswa` INT) RETURNS INT(11) BEGIN
  DECLARE jumlah_buku INT;
  
  SELECT COUNT(*) INTO jumlah_buku
  FROM peminjaman
  WHERE id_siswa = in_id_siswa AND tanggal_kembali IS NULL;
  
  RETURN jumlah_buku;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `id_akun` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `hak_akses` enum('Admin','Siswa','Petugas','Kasir') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id_akun`, `username`, `password`, `hak_akses`) VALUES
(2, 'fine', '$2y$10$DjvyUB75L9TkpHy8kmmfaORJuzA5ulpzacpAJG5BWYW5Iho04q5sC', 'Siswa'),
(3, 'lauren', '$2y$10$cM7dtCEhazQqW8R67Nb4puYaiEOn3DIrXY9syNlpAIGT3TQzelhsq', 'Siswa'),
(4, 'gint', '$2y$10$1Jcq66NyH1a5xrkCYbHomuD/rb4JnzsuDvmJSc8O8SEbmRdiaIIde', 'Siswa'),
(5, 'munth', '$2y$10$VdtvdF6Dh0i2WXYlchryjOyHUas5GCehbVWIk4nqpuwCv..PqGnoq', 'Siswa'),
(6, 'johansen', '$2a$12$XXT4QHePcrzSFaB.YHMa4OMoMdBfLd.6QvT/7WJzTKffp/vVHhQOS', 'Siswa'),
(11, 'guru1', '$2a$12$IUMkb7Ur9D7uwSQGx3asVerEvED/aMcH9e7xTD7pgJyfFn3h3s5du', 'Petugas'),
(12, 'guru2', '$2a$12$7By/TdhCJzKK07lm0KMdauVj8klDyZyOx8K8GIGuuGHeuUvdM0kbe', 'Petugas'),
(13, 'guru3', '$2a$12$.ZBiAre8tEiqZKGLaHlo9ewIu57dG9wBMh3ZwK1bNBNjfpAzECcm6', 'Kasir'),
(14, 'guru4', '$2a$12$XovRdmppkqYBA.Q3zR1OKOqOEbI/9YOBYC0rgBCoUK03P8yjAr1GC', 'Kasir'),
(100, 'admin', '$2a$12$qLt7jg9iL9GCU586Iy9bQeampW0nsBmt1w6kknhJaym7Qx7NZjKZC', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id_buku` int(11) NOT NULL,
  `judul_buku` varchar(255) NOT NULL,
  `pengarang` varchar(100) NOT NULL,
  `penerbit` varchar(100) NOT NULL,
  `tahun_terbit` year(4) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `sinopsis` text DEFAULT NULL,
  `gambar_buku` varchar(255) DEFAULT NULL,
  `isbn` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id_buku`, `judul_buku`, `pengarang`, `penerbit`, `tahun_terbit`, `id_kategori`, `sinopsis`, `gambar_buku`, `isbn`) VALUES
(1, 'Fisika XI', 'pengarang1', 'gramedia', 2003, 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '/images/fisika', '978-602-8519-93-5'),
(2, 'Fisika XII', 'pengarang2', 'usu', 2021, 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '/images/fisika', '978-602-8519-93-6'),
(3, 'Kimia XII', 'pengarang3', 'gramedia', 2002, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '/images/kimia', '978-602-8519-93-7'),
(4, 'Biologi X', 'pengarang4', 'labxe', 2012, 3, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '/images/biologi', '978-602-8519-93-8'),
(5, 'Biologi XI', 'pengarang4', 'labxe', 2013, 3, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '/images/biologi', '978-602-8519-93-9'),
(6, 'fisika', 'test', 'test', 2000, 1, 'test', '/images/fisika', 'test');

--
-- Triggers `buku`
--
DELIMITER $$
CREATE TRIGGER `log_buku_delete` AFTER DELETE ON `buku` FOR EACH ROW BEGIN
	INSERT INTO log_buku VALUES(OLD.id_buku,
                                CONCAT('Admin menghapus Buku berjudul ', OLD.judul_buku, ' dengan pengarang ', OLD.pengarang, ' dengan penerbit ' , OLD.penerbit, ' dengan tahun terbit ', OLD.tahun_terbit, ' dengan kategori_id ', OLD.id_kategori, 'dengan sinopsis ', OLD.sinopsis, ' dengan ISBN ', OLD.isbn), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_buku_insert` AFTER INSERT ON `buku` FOR EACH ROW BEGIN
	INSERT INTO log_buku VALUES(NEW.id_buku,
                                CONCAT('Admin memasukkan Buku berjudul ', NEW.judul_buku, ' dengan pengarang bernama ', NEW.penerbit), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_buku_update` AFTER UPDATE ON `buku` FOR EACH ROW BEGIN
	INSERT INTO log_buku VALUES(NEW.id_buku, 
                                CONCAT('Admin mengubah Buku berjudul', OLD.judul_buku, ' dengan pengarang ', OLD.pengarang, ' dengan penerbit ' , OLD.penerbit, ' dengan tahun terbit ', OLD.tahun_terbit, ' dengan kategori_id ', OLD.id_kategori, 'dengan sinopsis ', OLD.sinopsis, ' dengan ISBN ', OLD.isbn, ' menjadi berjudul ' , NEW.judul_buku, ' dengan pengarang ', NEW.pengarang, ' dengan penerbit ' , NEW.penerbit, ' dengan tahun terbit ', NEW.tahun_terbit, ' dengan kategori_id ', NEW.id_kategori, 'dengan sinopsis ', NEW.sinopsis, ' dengan ISBN ', NEW.isbn), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `buku_perpus`
--

CREATE TABLE `buku_perpus` (
  `id_buku` int(11) NOT NULL,
  `stok` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buku_perpus`
--

INSERT INTO `buku_perpus` (`id_buku`, `stok`) VALUES
(1, 10),
(2, 45),
(3, 90),
(4, 55),
(1, 10),
(2, 45),
(3, 90),
(4, 55),
(1, 10),
(2, 45),
(3, 90),
(4, 55);

--
-- Triggers `buku_perpus`
--
DELIMITER $$
CREATE TRIGGER `log_buku_perpus_delete` AFTER DELETE ON `buku_perpus` FOR EACH ROW BEGIN
	INSERT INTO log_buku_perpus VALUES(OLD.id_buku, 
                                       CONCAT('Admin menghapus stok buku ber-ID ', OLD.id_buku), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_buku_perpus_insert` AFTER INSERT ON `buku_perpus` FOR EACH ROW BEGIN
	INSERT INTO log_buku_perpus VALUES(NEW.id_buku, 
                                       CONCAT('Admin menambahkan stok buku ber-ID ', NEW.id_buku, ' menjadi ', NEW.stok), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_buku_perpus_update` AFTER UPDATE ON `buku_perpus` FOR EACH ROW BEGIN
	INSERT INTO log_buku_perpus VALUES(NEW.id_buku, 
                                       CONCAT('Stok buku ber-ID ', NEW.id_buku, 'berubah dari ', OLD.stok, ' menjadi ', NEW.Stok), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `buku_tahun_ajaran_baru`
--

CREATE TABLE `buku_tahun_ajaran_baru` (
  `id_buku` int(11) NOT NULL,
  `stok` int(10) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buku_tahun_ajaran_baru`
--

INSERT INTO `buku_tahun_ajaran_baru` (`id_buku`, `stok`, `harga`) VALUES
(1, 23, 50000),
(2, 45, 65000),
(3, 90, 100000),
(4, 55, 75000),
(5, 56, 89000),
(1, 23, 50000),
(2, 45, 65000),
(3, 90, 100000),
(4, 55, 75000),
(5, 56, 89000),
(1, 23, 50000),
(2, 45, 65000),
(3, 90, 100000),
(4, 55, 75000),
(5, 56, 89000);

--
-- Triggers `buku_tahun_ajaran_baru`
--
DELIMITER $$
CREATE TRIGGER `log_buku_thn_ajaran_baru_delete` AFTER DELETE ON `buku_tahun_ajaran_baru` FOR EACH ROW BEGIN
	INSERT INTO log_buku_thn_ajaran_baru VALUES(OLD.id_buku,
                                                CONCAT('Admin menghapus buku ber-ID ', OLD.id_buku, ' dengan stok ', OLD.stok, ' dengan harga ', OLD.harga), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_buku_thn_ajaran_baru_insert` AFTER INSERT ON `buku_tahun_ajaran_baru` FOR EACH ROW BEGIN
	INSERT INTO log_buku_thn_ajaran_baru VALUES(NEW.id_buku,
                                                CONCAT('Admin menambahkan buku ber-ID ', NEW.id_buku, ' dengan stok ', NEW.stok, ' dengan harga ', NEW.harga), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_buku_thn_ajaran_baru_update` AFTER UPDATE ON `buku_tahun_ajaran_baru` FOR EACH ROW BEGIN
	INSERT INTO log_buku_thn_ajaran_baru VALUES(OLD.id_buku,
                                                CONCAT('Admin mengubah buku ber-ID ', OLD.id_buku, ' dengan stok ', OLD.stok, ' dengan harga ', OLD.harga, ' menjadi buku ber-ID ', NEW.id_buku, ' dengan stok ', NEW.stok ,' dengan harga ', NEW.harga), CURRENT_TIMESTAMP());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id_event` int(11) NOT NULL,
  `title_event` longtext NOT NULL,
  `content_event` longtext NOT NULL,
  `tanggal_event` date NOT NULL,
  `id_akun` int(11) DEFAULT NULL,
  `status` enum('Publik','Privat') NOT NULL,
  `tipe` enum('Siswa','Guru') NOT NULL,
  `editable` enum('Yes','No') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id_event`, `title_event`, `content_event`, `tanggal_event`, `id_akun`, `status`, `tipe`, `editable`) VALUES
(1, 'Acara Olahraga', 'Ini adalah acara olahraga yang diadakan oleh sekolah', '2023-06-01', 6, 'Publik', 'Siswa', NULL),
(2, 'Seminar Bahasa', 'Seminar ini membahas tentang penggunaan bahasa dalam kehidupan sehari-hari', '2023-06-02', 4, 'Publik', 'Guru', NULL),
(3, 'Lomba Menulis', 'Lomba menulis ini diadakan untuk menumbuhkan minat siswa terhadap kegiatan menulis', '2023-06-03', 7, 'Publik', 'Siswa', NULL),
(4, 'Bakti Sosial', 'Kegiatan bakti sosial ini diadakan untuk membantu masyarakat yang membutuhkan', '2023-06-04', 3, 'Publik', 'Guru', NULL),
(5, 'Workshop Musik', 'Workshop ini membahas tentang teknik-teknik bermain musik yang baik', '2023-06-05', 5, 'Publik', 'Siswa', NULL),
(6, 'Pelatihan Kewirausahaan', 'Pelatihan ini diadakan untuk membantu siswa yang ingin mengembangkan usaha mereka sendiri', '2023-06-06', 987, 'Privat', 'Guru', NULL),
(7, 'Acara Budaya', 'Acara budaya ini menampilkan berbagai macam tarian dan musik tradisional', '2023-06-07', 654, 'Publik', 'Siswa', NULL),
(8, 'Diskusi Sastra', 'Diskusi sastra ini membahas tentang karya sastra terbaru dan teknik menulis yang baik', '2023-06-08', 123, 'Publik', 'Guru', NULL),
(9, 'Pelatihan Olahraga', 'Pelatihan ini diadakan untuk meningkatkan kemampuan siswa dalam bermain olahraga', '2023-06-09', 456, 'Privat', 'Siswa', NULL),
(10, 'Pertunjukan Teater', 'Pertunjukan teater ini menampilkan kisah-kisah yang menarik dan inspiratif', '2023-06-10', 789, 'Publik', 'Guru', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `id_guru` int(11) NOT NULL,
  `id_akun` int(11) NOT NULL,
  `nip` varchar(18) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `tempat_lahir` varchar(50) NOT NULL,
  `agama` enum('Islam','Kristen Protestan','Kristen Katolik','Hindu','Budha') DEFAULT NULL,
  `pendidikan_terakhir` varchar(50) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `nomor_telepon` varchar(15) NOT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id_guru`, `id_akun`, `nip`, `nama_lengkap`, `jenis_kelamin`, `tanggal_lahir`, `tempat_lahir`, `agama`, `pendidikan_terakhir`, `jabatan`, `alamat`, `nomor_telepon`, `email`) VALUES
(1, 11, '198111012005022003', 'Edbert', 'Laki-laki', '2023-04-01', 'Medan', 'Budha', 'S1', 'Sekretaris', 'Jl Asem II 3-5, Dki Jakarta', '0-21-765-9149', 'ifigeniyabychatniko@eeagan.com'),
(2, 12, '198111012005022003', 'Johansen', 'Laki-laki', '2023-03-01', 'Sibolga', 'Kristen Protestan', 'S1', 'Kepala Sekolah', 'Jl Gading Nias Tmr II Bl KR-4/6 KGP, Dki Jakarta', '0-21-765-9149', 'geneeh@email-temp.com'),
(3, 13, '7541756657200032', 'Amanda', 'Perempuan', '2023-04-10', 'Medan', 'Kristen Protestan', 'S2', 'Guru', 'Jl RS Fatmawati 15 Kompl Golden Plaza Bl G/26, Dki Jakarta', '0-21-750-7690', 'alithiel@tronplatform.org'),
(4, 14, '2652739639300002', 'Vita S', 'Perempuan', '2023-02-05', 'Loban', 'Islam', 'S2', 'Guru', 'Jl Jend A Yani 1047, Jawa Barat', ' 0-22-727-4122', 'marrt3@seafoodpn.com'),
(5, 100, '26527396393000021', 'Guru Admin', 'Laki-laki', '2023-02-05', 'Loban', 'Islam', 'S2', 'Adminstrator Sekolah', 'Jl Jend A Yani 1047, Jawa Barat', ' 0-22-727-4122', 'marrt3@seafoodpn.com');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`) VALUES
(1, 'Kimia'),
(2, 'Fisika'),
(3, 'Biologi');

-- --------------------------------------------------------

--
-- Table structure for table `log_buku`
--

CREATE TABLE `log_buku` (
  `id_buku` int(11) NOT NULL,
  `riwayat` longtext NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `log_buku`
--

INSERT INTO `log_buku` (`id_buku`, `riwayat`, `timestamp`) VALUES
(1, 'Admin memasukkan Buku berjudulFisika XIdengan pengarang bernama gramedia', '2023-04-21 22:42:18'),
(2, 'Admin memasukkan Buku berjudulFisika XIIdengan pengarang bernama usu', '2023-04-21 22:42:18'),
(3, 'Admin memasukkan Buku berjudulKimia XIIdengan pengarang bernama gramedia', '2023-04-21 22:42:18'),
(4, 'Admin memasukkan Buku berjudulBiologi Xdengan pengarang bernama labxe', '2023-04-21 22:42:18'),
(5, 'Admin memasukkan Buku berjudulBiologi XIdengan pengarang bernama labxe', '2023-04-21 22:42:18'),
(6, 'Admin memasukkan Buku berjudul fisika dengan pengarang bernama test', '2023-04-24 21:19:55'),
(1234567890, 'Admin memasukkan Buku berjudul Buku A dengan pengarang bernama Penerbit A', '2023-04-29 12:28:53'),
(1234567890, 'Admin mengubah Buku berjudulBuku A dengan pengarang John Doe dengan penerbit Penerbit A dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis Sinopsis buku A dengan ISBN 1234567890 menjadi berjudul Buku A telah diedit dengan pengarang John Doe dengan penerbit Penerbit A dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis Sinopsis buku A dengan ISBN 1234567890', '2023-04-29 12:32:41'),
(1234567890, 'Admin menghapus Buku berjudul Buku A telah diedit dengan pengarang John Doe dengan penerbit Penerbit A dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis Sinopsis buku A dengan ISBN 1234567890', '2023-04-29 12:35:05'),
(1, 'Admin mengubah Buku berjudulFisika XI dengan pengarang pengarang1 dengan penerbit gramedia dengan tahun terbit 2003 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-5 menjadi berjudul Fisika XI dengan pengarang pengarang1 dengan penerbit gramedia dengan tahun terbit 2003 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-5', '2023-05-03 22:12:50'),
(2, 'Admin mengubah Buku berjudulFisika XII dengan pengarang pengarang2 dengan penerbit usu dengan tahun terbit 2021 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-6 menjadi berjudul Fisika XII dengan pengarang pengarang2 dengan penerbit usu dengan tahun terbit 2021 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-6', '2023-05-03 22:12:55'),
(3, 'Admin mengubah Buku berjudulKimia XII dengan pengarang pengarang3 dengan penerbit gramedia dengan tahun terbit 2002 dengan kategori_id 1dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-7 menjadi berjudul Kimia XII dengan pengarang pengarang3 dengan penerbit gramedia dengan tahun terbit 2002 dengan kategori_id 1dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-7', '2023-05-03 22:13:02'),
(4, 'Admin mengubah Buku berjudulBiologi X dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2012 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-8 menjadi berjudul Biologi X dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2012 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-8', '2023-05-03 22:13:11'),
(5, 'Admin mengubah Buku berjudulBiologi XI dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2013 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-9 menjadi berjudul Biologi XI dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2013 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-9', '2023-05-03 22:13:20'),
(6, 'Admin mengubah Buku berjudulfisika dengan pengarang test dengan penerbit test dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis test dengan ISBN test menjadi berjudul fisika dengan pengarang test dengan penerbit test dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis test dengan ISBN test', '2023-05-03 22:13:25'),
(1, 'Admin memasukkan Buku berjudulFisika XIdengan pengarang bernama gramedia', '2023-04-21 22:42:18'),
(2, 'Admin memasukkan Buku berjudulFisika XIIdengan pengarang bernama usu', '2023-04-21 22:42:18'),
(3, 'Admin memasukkan Buku berjudulKimia XIIdengan pengarang bernama gramedia', '2023-04-21 22:42:18'),
(4, 'Admin memasukkan Buku berjudulBiologi Xdengan pengarang bernama labxe', '2023-04-21 22:42:18'),
(5, 'Admin memasukkan Buku berjudulBiologi XIdengan pengarang bernama labxe', '2023-04-21 22:42:18'),
(6, 'Admin memasukkan Buku berjudul fisika dengan pengarang bernama test', '2023-04-24 21:19:55'),
(1, 'Admin mengubah Buku berjudulFisika XI dengan pengarang pengarang1 dengan penerbit gramedia dengan tahun terbit 2003 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-5 menjadi berjudul Fisika XI dengan pengarang pengarang1 dengan penerbit gramedia dengan tahun terbit 2003 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-5', '2023-05-03 22:12:50'),
(2, 'Admin mengubah Buku berjudulFisika XII dengan pengarang pengarang2 dengan penerbit usu dengan tahun terbit 2021 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-6 menjadi berjudul Fisika XII dengan pengarang pengarang2 dengan penerbit usu dengan tahun terbit 2021 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-6', '2023-05-03 22:12:55'),
(3, 'Admin mengubah Buku berjudulKimia XII dengan pengarang pengarang3 dengan penerbit gramedia dengan tahun terbit 2002 dengan kategori_id 1dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-7 menjadi berjudul Kimia XII dengan pengarang pengarang3 dengan penerbit gramedia dengan tahun terbit 2002 dengan kategori_id 1dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-7', '2023-05-03 22:13:02'),
(4, 'Admin mengubah Buku berjudulBiologi X dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2012 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-8 menjadi berjudul Biologi X dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2012 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-8', '2023-05-03 22:13:11'),
(5, 'Admin mengubah Buku berjudulBiologi XI dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2013 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-9 menjadi berjudul Biologi XI dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2013 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-9', '2023-05-03 22:13:20'),
(6, 'Admin mengubah Buku berjudulfisika dengan pengarang test dengan penerbit test dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis test dengan ISBN test menjadi berjudul fisika dengan pengarang test dengan penerbit test dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis test dengan ISBN test', '2023-05-03 22:13:25'),
(1, 'Admin memasukkan Buku berjudulFisika XIdengan pengarang bernama gramedia', '2023-04-21 22:42:18'),
(2, 'Admin memasukkan Buku berjudulFisika XIIdengan pengarang bernama usu', '2023-04-21 22:42:18'),
(3, 'Admin memasukkan Buku berjudulKimia XIIdengan pengarang bernama gramedia', '2023-04-21 22:42:18'),
(4, 'Admin memasukkan Buku berjudulBiologi Xdengan pengarang bernama labxe', '2023-04-21 22:42:18'),
(5, 'Admin memasukkan Buku berjudulBiologi XIdengan pengarang bernama labxe', '2023-04-21 22:42:18'),
(6, 'Admin memasukkan Buku berjudul fisika dengan pengarang bernama test', '2023-04-24 21:19:55'),
(1, 'Admin mengubah Buku berjudulFisika XI dengan pengarang pengarang1 dengan penerbit gramedia dengan tahun terbit 2003 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-5 menjadi berjudul Fisika XI dengan pengarang pengarang1 dengan penerbit gramedia dengan tahun terbit 2003 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-5', '2023-05-03 22:12:50'),
(2, 'Admin mengubah Buku berjudulFisika XII dengan pengarang pengarang2 dengan penerbit usu dengan tahun terbit 2021 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-6 menjadi berjudul Fisika XII dengan pengarang pengarang2 dengan penerbit usu dengan tahun terbit 2021 dengan kategori_id 2dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-6', '2023-05-03 22:12:55'),
(3, 'Admin mengubah Buku berjudulKimia XII dengan pengarang pengarang3 dengan penerbit gramedia dengan tahun terbit 2002 dengan kategori_id 1dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-7 menjadi berjudul Kimia XII dengan pengarang pengarang3 dengan penerbit gramedia dengan tahun terbit 2002 dengan kategori_id 1dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-7', '2023-05-03 22:13:02'),
(4, 'Admin mengubah Buku berjudulBiologi X dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2012 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-8 menjadi berjudul Biologi X dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2012 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-8', '2023-05-03 22:13:11'),
(5, 'Admin mengubah Buku berjudulBiologi XI dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2013 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-9 menjadi berjudul Biologi XI dengan pengarang pengarang4 dengan penerbit labxe dengan tahun terbit 2013 dengan kategori_id 3dengan sinopsis Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. dengan ISBN 978-602-8519-93-9', '2023-05-03 22:13:20'),
(6, 'Admin mengubah Buku berjudulfisika dengan pengarang test dengan penerbit test dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis test dengan ISBN test menjadi berjudul fisika dengan pengarang test dengan penerbit test dengan tahun terbit 2000 dengan kategori_id 1dengan sinopsis test dengan ISBN test', '2023-05-03 22:13:25');

-- --------------------------------------------------------

--
-- Table structure for table `log_buku_perpus`
--

CREATE TABLE `log_buku_perpus` (
  `id_buku` int(11) NOT NULL,
  `riwayat` longtext NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `log_buku_perpus`
--

INSERT INTO `log_buku_perpus` (`id_buku`, `riwayat`, `timestamp`) VALUES
(1, 'Admin menambahkan stok buku ber-ID 1 menjadi 23', '2023-04-21 22:43:53'),
(2, 'Admin menambahkan stok buku ber-ID 2 menjadi 45', '2023-04-21 22:43:53'),
(3, 'Admin menambahkan stok buku ber-ID 3 menjadi 90', '2023-04-21 22:43:53'),
(4, 'Admin menambahkan stok buku ber-ID 4 menjadi 55', '2023-04-21 22:43:53'),
(5, 'Admin menambahkan stok buku ber-ID 5 menjadi 56', '2023-04-21 22:43:53'),
(5, 'Admin menambahkan stok buku ber-ID 5 menjadi 10', '2023-04-29 13:30:13'),
(1, 'Stok buku ber-ID 1berubah dari 23 menjadi 10', '2023-04-29 13:33:45'),
(5, 'Admin menghapus stok buku ber-ID 5', '2023-04-29 13:35:35'),
(5, 'Admin menghapus stok buku ber-ID 5', '2023-04-29 13:35:35'),
(1, 'Admin menambahkan stok buku ber-ID 1 menjadi 10', '2023-05-09 09:26:47'),
(2, 'Admin menambahkan stok buku ber-ID 2 menjadi 45', '2023-05-09 09:26:47'),
(3, 'Admin menambahkan stok buku ber-ID 3 menjadi 90', '2023-05-09 09:26:47'),
(4, 'Admin menambahkan stok buku ber-ID 4 menjadi 55', '2023-05-09 09:26:47'),
(1, 'Admin menambahkan stok buku ber-ID 1 menjadi 23', '2023-04-21 22:43:53'),
(2, 'Admin menambahkan stok buku ber-ID 2 menjadi 45', '2023-04-21 22:43:53'),
(3, 'Admin menambahkan stok buku ber-ID 3 menjadi 90', '2023-04-21 22:43:53'),
(4, 'Admin menambahkan stok buku ber-ID 4 menjadi 55', '2023-04-21 22:43:53'),
(5, 'Admin menambahkan stok buku ber-ID 5 menjadi 56', '2023-04-21 22:43:53'),
(5, 'Admin menambahkan stok buku ber-ID 5 menjadi 10', '2023-04-29 13:30:13'),
(1, 'Stok buku ber-ID 1berubah dari 23 menjadi 10', '2023-04-29 13:33:45'),
(5, 'Admin menghapus stok buku ber-ID 5', '2023-04-29 13:35:35'),
(5, 'Admin menghapus stok buku ber-ID 5', '2023-04-29 13:35:35'),
(1, 'Admin menambahkan stok buku ber-ID 1 menjadi 10', '2023-05-09 09:27:02'),
(2, 'Admin menambahkan stok buku ber-ID 2 menjadi 45', '2023-05-09 09:27:02'),
(3, 'Admin menambahkan stok buku ber-ID 3 menjadi 90', '2023-05-09 09:27:02'),
(4, 'Admin menambahkan stok buku ber-ID 4 menjadi 55', '2023-05-09 09:27:02'),
(1, 'Admin menambahkan stok buku ber-ID 1 menjadi 23', '2023-04-21 22:43:53'),
(2, 'Admin menambahkan stok buku ber-ID 2 menjadi 45', '2023-04-21 22:43:53'),
(3, 'Admin menambahkan stok buku ber-ID 3 menjadi 90', '2023-04-21 22:43:53'),
(4, 'Admin menambahkan stok buku ber-ID 4 menjadi 55', '2023-04-21 22:43:53'),
(5, 'Admin menambahkan stok buku ber-ID 5 menjadi 56', '2023-04-21 22:43:53'),
(5, 'Admin menambahkan stok buku ber-ID 5 menjadi 10', '2023-04-29 13:30:13'),
(1, 'Stok buku ber-ID 1berubah dari 23 menjadi 10', '2023-04-29 13:33:45'),
(5, 'Admin menghapus stok buku ber-ID 5', '2023-04-29 13:35:35'),
(5, 'Admin menghapus stok buku ber-ID 5', '2023-04-29 13:35:35');

-- --------------------------------------------------------

--
-- Table structure for table `log_buku_thn_ajaran_baru`
--

CREATE TABLE `log_buku_thn_ajaran_baru` (
  `id_buku` int(11) NOT NULL,
  `riwayat` longtext NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `log_buku_thn_ajaran_baru`
--

INSERT INTO `log_buku_thn_ajaran_baru` (`id_buku`, `riwayat`, `timestamp`) VALUES
(1, 'Admin menambahkan buku ber-ID 1 dengan stok 23 dengan harga 50000', '2023-04-21 22:45:16'),
(2, 'Admin menambahkan buku ber-ID 2 dengan stok 45 dengan harga 65000', '2023-04-21 22:45:16'),
(3, 'Admin menambahkan buku ber-ID 3 dengan stok 90 dengan harga 100000', '2023-04-21 22:45:16'),
(4, 'Admin menambahkan buku ber-ID 4 dengan stok 55 dengan harga 75000', '2023-04-21 22:45:16'),
(5, 'Admin menambahkan buku ber-ID 5 dengan stok 56 dengan harga 89000', '2023-04-21 22:45:16'),
(10, 'Admin menambahkan buku ber-ID 10 dengan stok 10 dengan harga 10000', '2023-04-29 13:42:54'),
(10, 'Admin mengubah buku ber-ID 10 dengan stok 10 dengan harga 10000 menjadi buku ber-ID 10 dengan stok 50 dengan harga 10000', '2023-04-29 13:44:45'),
(10, 'Admin menghapus buku ber-ID 10 dengan stok 50 dengan harga 10000', '2023-04-29 13:46:14'),
(1, 'Admin menambahkan buku ber-ID 1 dengan stok 23 dengan harga 50000', '2023-05-09 09:26:47'),
(2, 'Admin menambahkan buku ber-ID 2 dengan stok 45 dengan harga 65000', '2023-05-09 09:26:47'),
(3, 'Admin menambahkan buku ber-ID 3 dengan stok 90 dengan harga 100000', '2023-05-09 09:26:47'),
(4, 'Admin menambahkan buku ber-ID 4 dengan stok 55 dengan harga 75000', '2023-05-09 09:26:47'),
(5, 'Admin menambahkan buku ber-ID 5 dengan stok 56 dengan harga 89000', '2023-05-09 09:26:47'),
(1, 'Admin menambahkan buku ber-ID 1 dengan stok 23 dengan harga 50000', '2023-04-21 22:45:16'),
(2, 'Admin menambahkan buku ber-ID 2 dengan stok 45 dengan harga 65000', '2023-04-21 22:45:16'),
(3, 'Admin menambahkan buku ber-ID 3 dengan stok 90 dengan harga 100000', '2023-04-21 22:45:16'),
(4, 'Admin menambahkan buku ber-ID 4 dengan stok 55 dengan harga 75000', '2023-04-21 22:45:16'),
(5, 'Admin menambahkan buku ber-ID 5 dengan stok 56 dengan harga 89000', '2023-04-21 22:45:16'),
(1, 'Admin menambahkan buku ber-ID 1 dengan stok 23 dengan harga 50000', '2023-05-09 09:27:02'),
(2, 'Admin menambahkan buku ber-ID 2 dengan stok 45 dengan harga 65000', '2023-05-09 09:27:02'),
(3, 'Admin menambahkan buku ber-ID 3 dengan stok 90 dengan harga 100000', '2023-05-09 09:27:02'),
(4, 'Admin menambahkan buku ber-ID 4 dengan stok 55 dengan harga 75000', '2023-05-09 09:27:02'),
(5, 'Admin menambahkan buku ber-ID 5 dengan stok 56 dengan harga 89000', '2023-05-09 09:27:02'),
(1, 'Admin menambahkan buku ber-ID 1 dengan stok 23 dengan harga 50000', '2023-04-21 22:45:16'),
(2, 'Admin menambahkan buku ber-ID 2 dengan stok 45 dengan harga 65000', '2023-04-21 22:45:16'),
(3, 'Admin menambahkan buku ber-ID 3 dengan stok 90 dengan harga 100000', '2023-04-21 22:45:16'),
(4, 'Admin menambahkan buku ber-ID 4 dengan stok 55 dengan harga 75000', '2023-04-21 22:45:16'),
(5, 'Admin menambahkan buku ber-ID 5 dengan stok 56 dengan harga 89000', '2023-04-21 22:45:16');

-- --------------------------------------------------------

--
-- Table structure for table `nota_pembelian_buku`
--

CREATE TABLE `nota_pembelian_buku` (
  `no_faktur` int(11) UNSIGNED NOT NULL,
  `tanggal` date NOT NULL DEFAULT current_timestamp(),
  `id_siswa` int(11) NOT NULL,
  `id_kasir` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nota_pembelian_buku`
--

INSERT INTO `nota_pembelian_buku` (`no_faktur`, `tanggal`, `id_siswa`, `id_kasir`) VALUES
(1, '2023-04-21', 1, 5),
(2, '2023-04-21', 2, 5),
(3, '2023-04-21', 3, 5),
(4, '2023-04-21', 4, 5),
(5, '2023-04-21', 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id_peminjaman` int(11) NOT NULL,
  `id_buku` int(11) DEFAULT NULL,
  `id_siswa` int(11) DEFAULT NULL,
  `tanggal_pinjam` date DEFAULT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  `status` enum('Selesai','Belum Selesai') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `peminjaman`
--

INSERT INTO `peminjaman` (`id_peminjaman`, `id_buku`, `id_siswa`, `tanggal_pinjam`, `tanggal_kembali`, `status`) VALUES
(1, 3, 2, '2023-04-01', '2023-04-29', 'Selesai'),
(2, 3, 5, '2023-04-02', '2023-04-24', 'Selesai'),
(3, 5, 5, '2023-04-23', '2023-05-04', 'Selesai'),
(4, 1, 1, '2023-03-31', '2023-04-15', 'Selesai'),
(5, 4, 2, '2023-04-01', '2023-04-29', 'Selesai');

--
-- Triggers `peminjaman`
--
DELIMITER $$
CREATE TRIGGER `tambah_deadline_peminjaman` AFTER INSERT ON `peminjaman` FOR EACH ROW BEGIN
	DECLARE akun_siswa INT(11);
    DECLARE judul_book VARCHAR(255);
	SELECT id_akun INTO akun_siswa FROM siswa WHERE id_siswa = NEW.id_siswa;
    SELECT judul_buku INTO judul_book FROM buku WHERE id_buku = NEW.id_buku;
    INSERT INTO events(`title_event`,`content_event`,`tanggal_event`,`id_akun`) VALUES(CONCAT('Deadline Peminjaman Buku ', judul_book), CONCAT('Buku yang dipinjam adalah ', judul_book, '. Dipinjam dari tanggal ', NEW.tanggal_pinjam, ' hingga tanggal ', NEW.tanggal_kembali), NEW.tanggal_kembali, akun_siswa);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pengembalian`
--

CREATE TABLE `pengembalian` (
  `id_pengembalian` int(11) NOT NULL,
  `id_peminjaman` int(11) DEFAULT NULL,
  `tanggal_pengembalian` date DEFAULT NULL,
  `status` enum('Tepat Waktu','Terlambat') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengembalian`
--

INSERT INTO `pengembalian` (`id_pengembalian`, `id_peminjaman`, `tanggal_pengembalian`, `status`) VALUES
(1, 1, '2023-04-28', 'Tepat Waktu'),
(2, 2, '2023-04-28', 'Terlambat'),
(3, 3, '2023-05-09', 'Terlambat');

--
-- Triggers `pengembalian`
--
DELIMITER $$
CREATE TRIGGER `status_pengembalian_buku` BEFORE INSERT ON `pengembalian` FOR EACH ROW BEGIN
	DECLARE tgl_kembali DATE;
    SELECT tanggal_kembali INTO tgl_kembali FROM peminjaman WHERE id_peminjaman = NEW.id_peminjaman;
    IF DATE(NEW.tanggal_pengembalian) > DATE(tgl_kembali) THEN
    	SET NEW.status = 'Terlambat';
    ELSE
    	SET NEW.status = 'Tepat Waktu';
        
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pesan_masuk`
--

CREATE TABLE `pesan_masuk` (
  `id_pesan_masuk` int(11) NOT NULL,
  `nama_lengkap` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `subjek` varchar(255) DEFAULT NULL,
  `pesan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pesan_masuk`
--

INSERT INTO `pesan_masuk` (`id_pesan_masuk`, `nama_lengkap`, `email`, `no_hp`, `subjek`, `pesan`) VALUES
(1, 'John Doe', 'johndoe@gmail.com', '08123456789', 'Pertanyaan tentang produk', 'Halo, saya tertarik dengan produk yang Anda tawarkan. Bisa jelaskan lebih detail mengenai fitur-fiturnya?'),
(2, 'Jane Smith', 'janesmith@yahoo.com', '08567890123', 'Pembelian produk', 'Halo, saya ingin membeli produk Anda. Bagaimana caranya?'),
(3, 'Mike Johnson', 'mikejohnson@gmail.com', '08234567890', 'Keluhan terhadap layanan', 'Saya sangat kecewa dengan layanan Anda yang buruk. Saya berharap bisa segera mendapatkan solusi atas masalah ini.'),
(4, 'Sarah Lee', 'sarahlee@hotmail.com', '08765432109', 'Saran untuk produk', 'Saya ingin memberikan saran untuk produk Anda. Saya berharap Anda bisa menambahkan fitur X dan Y untuk meningkatkan kualitas produk.'),
(5, 'David Kim', 'davidkim@gmail.com', '08111111111', 'Permintaan informasi', 'Saya membutuhkan informasi mengenai produk Anda. Apakah Anda bisa memberikan informasi yang lebih detail?');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id_siswa` int(11) NOT NULL,
  `id_akun` int(11) NOT NULL,
  `nisn` varchar(10) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `tempat_lahir` varchar(50) NOT NULL,
  `kelas` varchar(10) NOT NULL,
  `agama` enum('Islam','Kristen Protestan','Kristen Katolik','Hindu','Budha') NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `nomor_telepon` varchar(15) NOT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`id_siswa`, `id_akun`, `nisn`, `nama_lengkap`, `jenis_kelamin`, `tanggal_lahir`, `tempat_lahir`, `kelas`, `agama`, `alamat`, `nomor_telepon`, `email`) VALUES
(1, 6, '0044798474', 'Kenzie', 'Laki-laki', '2023-04-01', 'Medan', '10', 'Budha', 'Jl Ratna 14, Jawa Timur', '0-31-504-8335', 'gimsfg@holliefindlaymusic.com'),
(2, 5, '320301 ', 'Fubrianto', 'Laki-laki', '2023-03-01', 'Sibolga', '11', 'Hindu', 'Jl Utama VI/56 Kav Jelambar Polri 16-14, Dki Jakarta', '0-21-560-4532', 'exstreem@4movierulzfree.com'),
(3, 4, '110802', 'Bendicta', 'Perempuan', '2023-04-10', 'Medan', '12', 'Kristen Katolik', ' Jl P Jayakarta 141 Bl IV/B 32, Jakarta', '0-21-639-2332', 'ammotroop05@contabilidadebrasil.org'),
(4, 3, '0118741444', 'Erick', 'Laki-laki', '2023-02-05', 'Siantar', '10', 'Kristen Protestan', ' Jl I Gusti Ngurah Rai 54 RT 001/01, Dki Jakarta', '0-21-862-2081', 'kamelpolo@rjtrainingsolutions.com'),
(5, 2, '0118741444', 'Sari', 'Perempuan', '2023-04-11', 'Batam', '12', 'Islam', 'Jl Gn Sahari XII/14-16, Dki Jakarta', ' 0-21-659-2852', 'kamelpolo@rjtrainingsolutions.com');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_pembelian_buku`
--

CREATE TABLE `transaksi_pembelian_buku` (
  `no_faktur` int(11) UNSIGNED NOT NULL,
  `id_buku` int(11) DEFAULT NULL,
  `jumlah_buku` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi_pembelian_buku`
--

INSERT INTO `transaksi_pembelian_buku` (`no_faktur`, `id_buku`, `jumlah_buku`) VALUES
(1, 3, 2),
(2, 2, 1),
(3, 1, 5),
(4, 5, 7),
(5, 2, 1),
(1, 3, 2),
(2, 2, 1),
(3, 1, 5),
(4, 5, 7),
(5, 2, 1),
(1, 3, 2),
(2, 2, 1),
(3, 1, 5),
(4, 5, 7),
(5, 2, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_jumlah_pinjam`
-- (See below for the actual view)
--
CREATE TABLE `view_jumlah_pinjam` (
`id_buku` int(11)
,`judul_buku` varchar(255)
,`jumlah_pinjam` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_peminjaman_belum_selesai`
-- (See below for the actual view)
--
CREATE TABLE `view_peminjaman_belum_selesai` (
`id_peminjaman` int(11)
,`id_buku` int(11)
,`id_siswa` int(11)
,`tanggal_pinjam` date
,`tanggal_kembali` date
,`status` enum('Selesai','Belum Selesai')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_peminjaman_selesai`
-- (See below for the actual view)
--
CREATE TABLE `view_peminjaman_selesai` (
`id_peminjaman` int(11)
,`id_buku` int(11)
,`id_pengembalian` int(11)
,`status_kembali` enum('Tepat Waktu','Terlambat')
,`tanggal_pengembalian` date
,`id_siswa` int(11)
,`tanggal_pinjam` date
,`tanggal_kembali` date
,`status` enum('Selesai','Belum Selesai')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_pengembalian_lengkap`
-- (See below for the actual view)
--
CREATE TABLE `view_pengembalian_lengkap` (
`id_pengembalian` int(11)
,`id_peminjaman` int(11)
,`tanggal_pengembalian` date
,`status` enum('Tepat Waktu','Terlambat')
,`judul_buku` varchar(255)
,`nama_lengkap` varchar(100)
);

-- --------------------------------------------------------

--
-- Structure for view `view_jumlah_pinjam`
--
DROP TABLE IF EXISTS `view_jumlah_pinjam`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_jumlah_pinjam`  AS SELECT `b`.`id_buku` AS `id_buku`, `b`.`judul_buku` AS `judul_buku`, count(`b`.`id_buku`) AS `jumlah_pinjam` FROM (`buku` `b` join `peminjaman` `p` on(`b`.`id_buku` = `p`.`id_buku`)) GROUP BY `b`.`id_buku`, `b`.`judul_buku` ;

-- --------------------------------------------------------

--
-- Structure for view `view_peminjaman_belum_selesai`
--
DROP TABLE IF EXISTS `view_peminjaman_belum_selesai`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_peminjaman_belum_selesai`  AS SELECT `p`.`id_peminjaman` AS `id_peminjaman`, `p`.`id_buku` AS `id_buku`, `p`.`id_siswa` AS `id_siswa`, `p`.`tanggal_pinjam` AS `tanggal_pinjam`, `p`.`tanggal_kembali` AS `tanggal_kembali`, `p`.`status` AS `status` FROM (`peminjaman` `p` left join `pengembalian` `pe` on(`p`.`id_peminjaman` = `pe`.`id_peminjaman`)) WHERE `pe`.`id_pengembalian` is null OR `p`.`status` = 'Belum Selesai' ;

-- --------------------------------------------------------

--
-- Structure for view `view_peminjaman_selesai`
--
DROP TABLE IF EXISTS `view_peminjaman_selesai`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_peminjaman_selesai`  AS SELECT `p`.`id_peminjaman` AS `id_peminjaman`, `p`.`id_buku` AS `id_buku`, `pe`.`id_pengembalian` AS `id_pengembalian`, `pe`.`status` AS `status_kembali`, `pe`.`tanggal_pengembalian` AS `tanggal_pengembalian`, `p`.`id_siswa` AS `id_siswa`, `p`.`tanggal_pinjam` AS `tanggal_pinjam`, `p`.`tanggal_kembali` AS `tanggal_kembali`, `p`.`status` AS `status` FROM (`peminjaman` `p` join `pengembalian` `pe` on(`p`.`id_peminjaman` = `pe`.`id_peminjaman`)) WHERE `p`.`status` = 'Selesai' ;

-- --------------------------------------------------------

--
-- Structure for view `view_pengembalian_lengkap`
--
DROP TABLE IF EXISTS `view_pengembalian_lengkap`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_pengembalian_lengkap`  AS SELECT `pe`.`id_pengembalian` AS `id_pengembalian`, `pe`.`id_peminjaman` AS `id_peminjaman`, `pe`.`tanggal_pengembalian` AS `tanggal_pengembalian`, `pe`.`status` AS `status`, `b`.`judul_buku` AS `judul_buku`, `s`.`nama_lengkap` AS `nama_lengkap` FROM (((`pengembalian` `pe` join `peminjaman` `p` on(`pe`.`id_peminjaman` = `p`.`id_peminjaman`)) join `buku` `b` on(`p`.`id_buku` = `b`.`id_buku`)) join `siswa` `s` on(`p`.`id_siswa` = `s`.`id_siswa`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id_akun`);

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id_buku`),
  ADD KEY `Kategori_ID` (`id_kategori`);

--
-- Indexes for table `buku_perpus`
--
ALTER TABLE `buku_perpus`
  ADD KEY `ID_Buku` (`id_buku`);

--
-- Indexes for table `buku_tahun_ajaran_baru`
--
ALTER TABLE `buku_tahun_ajaran_baru`
  ADD KEY `ID_Buku` (`id_buku`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_event`);

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id_guru`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `log_buku`
--
ALTER TABLE `log_buku`
  ADD KEY `id_buku` (`id_buku`);

--
-- Indexes for table `log_buku_perpus`
--
ALTER TABLE `log_buku_perpus`
  ADD KEY `id_buku` (`id_buku`);

--
-- Indexes for table `log_buku_thn_ajaran_baru`
--
ALTER TABLE `log_buku_thn_ajaran_baru`
  ADD KEY `id_buku` (`id_buku`);

--
-- Indexes for table `nota_pembelian_buku`
--
ALTER TABLE `nota_pembelian_buku`
  ADD PRIMARY KEY (`no_faktur`),
  ADD KEY `ID_Siswa` (`id_siswa`,`id_kasir`),
  ADD KEY `ID_Kasir` (`id_kasir`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id_peminjaman`),
  ADD KEY `id_buku` (`id_buku`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indexes for table `pengembalian`
--
ALTER TABLE `pengembalian`
  ADD PRIMARY KEY (`id_pengembalian`),
  ADD KEY `id_peminjaman` (`id_peminjaman`);

--
-- Indexes for table `pesan_masuk`
--
ALTER TABLE `pesan_masuk`
  ADD PRIMARY KEY (`id_pesan_masuk`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id_siswa`),
  ADD UNIQUE KEY `id_akun` (`id_akun`);

--
-- Indexes for table `transaksi_pembelian_buku`
--
ALTER TABLE `transaksi_pembelian_buku`
  ADD KEY `id_buku` (`id_buku`),
  ADD KEY `No_Faktur` (`no_faktur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `id_akun` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1234567891;

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id_buku` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1234567891;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id_guru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1234567892;

--
-- AUTO_INCREMENT for table `pesan_masuk`
--
ALTER TABLE `pesan_masuk`
  MODIFY `id_pesan_masuk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buku_perpus`
--
ALTER TABLE `buku_perpus`
  ADD CONSTRAINT `buku_perpus_ibfk_1` FOREIGN KEY (`id_buku`) REFERENCES `buku` (`id_buku`);

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_akun`) REFERENCES `akun` (`id_akun`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

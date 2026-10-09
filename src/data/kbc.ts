import { KBCValue } from '../types/rpp';

export const KBC_VALUES: KBCValue[] = [
  {
    id: 'kbc-allah',
    title: 'Cinta kepada Allah SWT',
    description: 'Menumbuhkan rasa syukur, keimanan yang kokoh, kesadaran muraqabah (merasa diawasi), dan ketaatan menjalankan ibadah dengan penuh keikhlasan.',
    exampleBehavior: 'Memulai dan mengakhiri pembelajaran dengan doa tulus, mengaitkan fenomena ilmu dengan keagungan ciptaan Allah SWT, serta menjaga kejujuran.',
    reflectionQuestion: 'Bagaimana ilmu yang dipelajari hari ini semakin mempertebal rasa kagum dan syukur kita kepada Allah SWT?'
  },
  {
    id: 'kbc-rasul',
    title: 'Cinta kepada Rasulullah SAW',
    description: 'Meneladani akhlak mulia Nabi Muhammad SAW (shiddiq, amanah, fathanah, tabligh) sebagai uswah hasanah dalam menuntut ilmu dan berinteraksi sosial.',
    exampleBehavior: 'Mempraktikkan adab santun, bertutur kata lembut, menjaga amanah tugas belajar, dan gemar berselawat serta menghidupkan sunnah harian.',
    reflectionQuestion: 'Sikap Rasulullah SAW manakah yang telah kita terapkan dalam aktivitas diskusi dan belajar hari ini?'
  },
  {
    id: 'kbc-ilmu',
    title: 'Cinta kepada Ilmu',
    description: 'Membangkitkan rasa ingin tahu yang tinggi, kegemaran membaca (iqra\'), berpikir kritis, dan semangat belajar sepanjang hayat (long life education).',
    exampleBehavior: 'Antusias bertanya, aktif mencari sumber referensi shahih, tekun memecahkan persoalan, dan tidak mudah menyerah saat menghadapi materi sulit.',
    reflectionQuestion: 'Wawasan baru apa yang paling memantik rasa penasaranmu untuk terus dipelajari lebih mendalam?'
  },
  {
    id: 'kbc-diri',
    title: 'Cinta kepada Diri Sendiri',
    description: 'Menghargai potensi diri, menjaga kesehatan fisik, mental, dan spiritual, membangun rasa percaya diri positif, dan menjauhi perbuatan sia-sia.',
    exampleBehavior: 'Percaya diri saat mengemukakan pendapat, menjaga kebersihan perlengkapan belajar, serta disiplin mengatur waktu belajar dan istirahat.',
    reflectionQuestion: 'Kelebihan dan kebaikan apa yang berhasil kamu kembangkan dari tantangan belajar hari ini?'
  },
  {
    id: 'kbc-sesama',
    title: 'Cinta kepada Sesama',
    description: 'Menumbuhkan empati, kasih sayang, tolong-menolong (ta\'awun), menghargai perbedaan, dan anti-perundungan (zero bullying) di lingkungan madrasah.',
    exampleBehavior: 'Membantu teman yang belum memahami materi tanpa meremehkan, mendengarkan dengan penuh perhatian saat kawan presentasi, dan saling mendoakan.',
    reflectionQuestion: 'Kebaikan atau bantuan apa yang telah kamu berikan atau terima dari rekan sekelasmu selama pembelajaran?'
  },
  {
    id: 'kbc-lingkungan',
    title: 'Cinta kepada Lingkungan',
    description: 'Memiliki kepedulian ekologis, menjaga kebersihan dan kelestarian alam madrasah, menghemat energi, dan memandang bumi sebagai amanah khalifah fil ardh.',
    exampleBehavior: 'Membuang sampah pada tempatnya, menghemat penggunaan kertas dan listrik di kelas, serta merawat tanaman di halaman madrasah.',
    reflectionQuestion: 'Tindakan ramah lingkungan apa yang bisa kita lakukan bersama setelah selesai melakukan kegiatan kelas hari ini?'
  },
  {
    id: 'kbc-bangsa',
    title: 'Cinta kepada Bangsa dan Negara',
    description: 'Menjiwai nilai-nilai patriotisme, menghormati konsensus kebangsaan (Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika), dan bangga berbudaya Indonesia.',
    exampleBehavior: 'Menghormati keragaman suku, bahasa, dan budaya teman madrasah, menggunakan bahasa Indonesia yang baik dan santun, serta siap berkontribusi positif.',
    reflectionQuestion: 'Bagaimana materi yang kita pelajari hari ini dapat berkontribusi untuk kemajuan masyarakat dan bangsa Indonesia?'
  },
  {
    id: 'kbc-kebersamaan',
    title: 'Cinta terhadap Kebersamaan',
    description: 'Membangun ukhuwah islamiyah dan wathaniyah, mengutamakan gotong royong, musyawarah mufakat, dan merayakan keberhasilan bersama.',
    exampleBehavior: 'Bekerja sama secara kompak dalam kelompok, berbagi peran secara adil, dan tidak mendominasi atau meninggalkan rekan dalam tim.',
    reflectionQuestion: 'Bagaimana kerja sama kelompok tadi membantu kita mencapai hasil yang lebih baik dibanding bekerja sendiri?'
  },
  {
    id: 'kbc-perdamaian',
    title: 'Cinta terhadap Perdamaian',
    description: 'Mengedepankan dialog, tasamuh (toleransi), menyelesaikan perselisihan dengan kepala dingin, menolak kekerasan verbal maupun fisik.',
    exampleBehavior: 'Menerima perbedaan argumen dalam diskusi secara lapang dada, meminta maaf dengan tulus jika keliru, dan menciptakan suasana kelas yang teduh.',
    reflectionQuestion: 'Sikap lapang dada apa yang kamu tunjukkan ketika pendapat teman berbeda dengan pendapatmu?'
  },
  {
    id: 'kbc-kemanusiaan',
    title: 'Cinta terhadap Kemanusiaan',
    description: 'Memiliki kepekaan rasa kemanusiaan universal, peduli pada keadilan, menjunjung tinggi martabat manusia, dan menebar rahmatan lil \'alamin.',
    exampleBehavior: 'Memiliki rasa simpati terhadap penderitaan orang lain, menolak diskriminasi, dan berpartisipasi aktif dalam kegiatan sosial kemanusiaan madrasah.',
    reflectionQuestion: 'Nilai kemanusiaan apa yang dapat kita petik dan teladani dari topik pembelajaran kita hari ini?'
  }
];

export function getKBCById(id: string): KBCValue | undefined {
  return KBC_VALUES.find(item => item.id === id);
}

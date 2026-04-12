import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.book.deleteMany()
  
  const books = [
    { title: 'Le Lys dans la Vallée', titleEng: 'The Lily of the Valley', author: 'Honoré de Balzac', year: 1836, born: 1799, lang: 'FRA', free: true, description: 'A young man falls in love with a married woman in the valleys of Touraine.' },
    { title: 'Les Misérables', titleEng: 'Les Misérables', author: 'Victor Hugo', year: 1862, born: 1802, lang: 'FRA', free: true, description: 'The struggles of ex-convict Jean Valjean and his redemption in 19th-century France.' },
    { title: 'Notre-Dame de Paris', titleEng: 'The Hunchback of Notre-Dame', author: 'Victor Hugo', year: 1831, born: 1802, lang: 'FRA', free: true, description: 'The story of Quasimodo, the hunchback bell-ringer of Notre-Dame Cathedral.' },
    { title: 'Madame Bovary', titleEng: 'Madame Bovary', author: 'Gustave Flaubert', year: 1857, born: 1821, lang: 'FRA', free: true, description: 'A provincial doctor\'s wife seeks escape from her mundane life through affairs.' },
    { title: 'Le Comte de Monte-Cristo', titleEng: 'The Count of Monte Cristo', author: 'Alexandre Dumas', year: 1844, born: 1802, lang: 'FRA', free: true, description: 'A wrongly imprisoned man escapes and seeks revenge on those who betrayed him.' },
    { title: 'Les Trois Mousquetaires', titleEng: 'The Three Musketeers', author: 'Alexandre Dumas', year: 1844, born: 1802, lang: 'FRA', free: true, description: 'D\'Artagnan joins the legendary musketeers Athos, Porthos, and Aramis.' },
    { title: 'Germinal', titleEng: 'Germinal', author: 'Émile Zola', year: 1885, born: 1840, lang: 'FRA', free: true, description: 'A young man joins a coal mining community and leads a workers\' strike.' },
    { title: 'L\'Étranger', titleEng: 'The Stranger', author: 'Albert Camus', year: 1942, born: 1913, lang: 'FRA', free: true, description: 'A man kills an Arab on a beach and faces trial in absurdist Algeria.' },
    { title: 'À la recherche du temps perdu', titleEng: 'In Search of Lost Time', author: 'Marcel Proust', year: 1913, born: 1871, lang: 'FRA', free: true, description: 'A monumental novel exploring memory, time, and French society.' },
    { title: 'La Nausée', titleEng: 'Nausea', author: 'Jean-Paul Sartre', year: 1938, born: 1905, lang: 'FRA', free: true, description: 'A historian experiences a profound existential crisis.' },
    { title: 'Candide', titleEng: 'Candide', author: 'Voltaire', year: 1759, born: 1694, lang: 'FRA', free: true, description: 'A young man travels the world experiencing disasters while clinging to optimism.' },
    { title: '1984', titleEng: 'Nineteen Eighty-Four', author: 'George Orwell', year: 1949, born: 1903, lang: 'ENG', free: true, description: 'A dystopian novel about totalitarianism, surveillance, and the destruction of truth.' },
    { title: 'Animal Farm', titleEng: 'Animal Farm', author: 'George Orwell', year: 1945, born: 1903, lang: 'ENG', free: true, description: 'Farm animals overthrow their human farmer, but corruption soon follows.' },
    { title: 'Pride and Prejudice', titleEng: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, born: 1775, lang: 'ENG', free: true, description: 'Elizabeth Bennet navigates issues of marriage, morality, and misconceptions.' },
    { title: 'Sense and Sensibility', titleEng: 'Sense and Sensibility', author: 'Jane Austen', year: 1811, born: 1775, lang: 'ENG', free: true, description: 'Two sisters experience love and heartbreak in contrasting ways.' },
    { title: 'Emma', titleEng: 'Emma', author: 'Jane Austen', year: 1815, born: 1775, lang: 'ENG', free: true, description: 'A well-meaning but misguided young woman attempts to matchmake her friends.' },
    { title: 'Jane Eyre', titleEng: 'Jane Eyre', author: 'Charlotte Brontë', year: 1847, born: 1816, lang: 'ENG', free: true, description: 'An orphaned girl becomes a governess and falls in love with her mysterious employer.' },
    { title: 'Wuthering Heights', titleEng: 'Wuthering Heights', author: 'Emily Brontë', year: 1847, born: 1818, lang: 'ENG', free: true, description: 'A passionate and destructive love story set on the Yorkshire moors.' },
    { title: 'Oliver Twist', titleEng: 'Oliver Twist', author: 'Charles Dickens', year: 1837, born: 1812, lang: 'ENG', free: true, description: 'An orphan boy navigates the criminal underworld of Victorian London.' },
    { title: 'Great Expectations', titleEng: 'Great Expectations', author: 'Charles Dickens', year: 1861, born: 1812, lang: 'ENG', free: true, description: 'A poor orphan boy rises to wealth with the help of a mysterious benefactor.' },
    { title: 'A Tale of Two Cities', titleEng: 'A Tale of Two Cities', author: 'Charles Dickens', year: 1859, born: 1812, lang: 'ENG', free: true, description: 'A story of love and sacrifice set during the French Revolution.' },
    { title: 'Moby Dick', titleEng: 'Moby Dick', author: 'Herman Melville', year: 1851, born: 1819, lang: 'ENG', free: true, description: 'Captain Ahab\'s obsessive quest to hunt the white whale Moby Dick.' },
    { title: 'The Adventures of Tom Sawyer', titleEng: 'The Adventures of Tom Sawyer', author: 'Mark Twain', year: 1876, born: 1835, lang: 'ENG', free: true, description: 'A mischievous boy\'s adventures along the Mississippi River.' },
    { title: 'Adventures of Huckleberry Finn', titleEng: 'Adventures of Huckleberry Finn', author: 'Mark Twain', year: 1884, born: 1835, lang: 'ENG', free: true, description: 'Huck Finn and a runaway slave journey down the Mississippi River.' },
    { title: 'The Picture of Dorian Gray', titleEng: 'The Picture of Dorian Gray', author: 'Oscar Wilde', year: 1890, born: 1854, lang: 'ENG', free: true, description: 'A young man sells his soul for eternal youth and beauty.' },
    { title: 'Dracula', titleEng: 'Dracula', author: 'Bram Stoker', year: 1897, born: 1847, lang: 'ENG', free: true, description: 'A Transylvanian vampire terrorizes England in this gothic horror classic.' },
    { title: 'Frankenstein', titleEng: 'Frankenstein', author: 'Mary Shelley', year: 1818, born: 1797, lang: 'ENG', free: true, description: 'A scientist creates life from dead matter with devastating consequences.' },
    { title: 'Alice\'s Adventures in Wonderland', titleEng: 'Alice in Wonderland', author: 'Lewis Carroll', year: 1865, born: 1832, lang: 'ENG', free: true, description: 'A girl falls down a rabbit hole into a fantasy world of peculiar creatures.' },
    { title: 'Treasure Island', titleEng: 'Treasure Island', author: 'Robert Louis Stevenson', year: 1883, born: 1850, lang: 'ENG', free: true, description: 'A young boy embarks on a voyage to find buried pirate treasure.' },
    { title: 'Prestupleniye i nakazaniye', titleEng: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: 1866, born: 1821, lang: 'RUS', free: true, description: 'A student murders a pawnbroker and struggles with guilt and redemption.' },
    { title: 'Bratya Karamazovy', titleEng: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', year: 1880, born: 1821, lang: 'RUS', free: true, description: 'Three brothers struggle with faith, morality, and their father\'s murder.' },
    { title: 'Idiot', titleEng: 'The Idiot', author: 'Fyodor Dostoevsky', year: 1869, born: 1821, lang: 'RUS', free: true, description: 'A kind and innocent man tries to navigate corrupt Russian society.' },
    { title: 'Anna Karenina', titleEng: 'Anna Karenina', author: 'Leo Tolstoy', year: 1878, born: 1828, lang: 'RUS', free: true, description: 'A tragic love story set against the backdrop of Russian high society.' },
    { title: 'Voyna i mir', titleEng: 'War and Peace', author: 'Leo Tolstoy', year: 1869, born: 1828, lang: 'RUS', free: true, description: 'A sweeping narrative of Russian society during the Napoleonic Wars.' },
    { title: 'Vishnyovy sad', titleEng: 'The Cherry Orchard', author: 'Anton Chekhov', year: 1904, born: 1860, lang: 'RUS', free: true, description: 'An aristocratic family loses their estate and cherry orchard to debt.' },
    { title: 'Myortvye dushi', titleEng: 'Dead Souls', author: 'Nikolai Gogol', year: 1842, born: 1809, lang: 'RUS', free: true, description: 'A con artist travels Russia buying dead serfs to mortgage for profit.' },
    { title: 'Faust', titleEng: 'Faust', author: 'Johann Wolfgang von Goethe', year: 1808, born: 1749, lang: 'GER', free: true, description: 'A scholar makes a deal with the devil in pursuit of ultimate knowledge.' },
    { title: 'Die Verwandlung', titleEng: 'The Metamorphosis', author: 'Franz Kafka', year: 1915, born: 1883, lang: 'GER', free: true, description: 'A man wakes up one morning transformed into a giant insect.' },
    { title: 'Der Proceß', titleEng: 'The Trial', author: 'Franz Kafka', year: 1925, born: 1883, lang: 'GER', free: true, description: 'A man is arrested and prosecuted by an inaccessible authority.' },
    { title: 'Buddenbrooks', titleEng: 'Buddenbrooks', author: 'Thomas Mann', year: 1901, born: 1875, lang: 'GER', free: true, description: 'The decline of a wealthy German merchant family over four generations.' },
    { title: 'Steppenwolf', titleEng: 'Steppenwolf', author: 'Hermann Hesse', year: 1927, born: 1877, lang: 'GER', free: true, description: 'A middle-aged man torn between his human and wolf natures.' },
    { title: 'Siddhartha', titleEng: 'Siddhartha', author: 'Hermann Hesse', year: 1922, born: 1877, lang: 'GER', free: true, description: 'A young Indian man seeks enlightenment and spiritual fulfillment.' },
    { title: 'Don Quijote de la Mancha', titleEng: 'Don Quixote', author: 'Miguel de Cervantes', year: 1605, born: 1547, lang: 'SPA', free: true, description: 'A man reads so many chivalric novels that he becomes a self-styled knight.' },
    { title: 'Cien años de soledad', titleEng: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', year: 1967, born: 1927, lang: 'SPA', free: true, description: 'Seven generations of the Buendía family in the fictional town of Macondo.' },
    { title: 'La Casa de Bernarda Alba', titleEng: 'The House of Bernarda Alba', author: 'Federico García Lorca', year: 1936, born: 1898, lang: 'SPA', free: true, description: 'A tyrannical widow imposes an eight-year mourning period on her five daughters.' },
    { title: 'Ficciones', titleEng: 'Ficciones', author: 'Jorge Luis Borges', year: 1944, born: 1899, lang: 'SPA', free: true, description: 'A collection of short stories blending fantasy, philosophy, and labyrinths.' },
    { title: 'La Divina Commedia', titleEng: 'The Divine Comedy', author: 'Dante Alighieri', year: 1320, born: 1265, lang: 'ITA', free: true, description: 'A journey through Hell, Purgatory, and Paradise.' },
    { title: 'Il Principe', titleEng: 'The Prince', author: 'Niccolò Machiavelli', year: 1532, born: 1469, lang: 'ITA', free: true, description: 'A political treatise on the acquisition and maintenance of political power.' },
    { title: 'I Promessi Sposi', titleEng: 'The Betrothed', author: 'Alessandro Manzoni', year: 1827, born: 1785, lang: 'ITA', free: true, description: 'Two lovers in 17th-century Lombardy face obstacles to their marriage.' },
    { title: 'Kokoro', titleEng: 'Kokoro', author: 'Natsume Soseki', year: 1914, born: 1867, lang: 'JPN', free: true, description: 'A young man forms a bond with a lonely older man haunted by past guilt.' },
    { title: 'Shiosai', titleEng: 'The Sound of Waves', author: 'Yukio Mishima', year: 1954, born: 1925, lang: 'JPN', free: true, description: 'A simple and pure love story between a young fisherman and a wealthy girl.' },
    { title: 'Yukiguni', titleEng: 'Snow Country', author: 'Yasunari Kawabata', year: 1956, born: 1899, lang: 'JPN', free: true, description: 'A Tokyo dilettante has an affair with a hot-spring geisha in the mountains.' },
    { title: 'Botchan', titleEng: 'Botchan', author: 'Natsume Soseki', year: 1906, born: 1867, lang: 'JPN', free: true, description: 'A young Tokyo man becomes a teacher in a rural school and battles corruption.' },
    { title: 'Ningen Shikkaku', titleEng: 'No Longer Human', author: 'Osamu Dazai', year: 1948, born: 1909, lang: 'JPN', free: true, description: 'A man chronicles his inability to connect with the rest of humanity.' },
    { title: '红楼梦', titleEng: 'Dream of the Red Chamber', author: 'Cao Xueqin', year: 1791, born: 1715, lang: 'CHN', free: true, description: 'A semi-autobiographical novel depicting the decline of a noble Chinese family.' },
    { title: '西游记', titleEng: 'Journey to the West', author: 'Wu Cheng\'en', year: 1592, born: 1500, lang: 'CHN', free: true, description: 'A Buddhist monk travels to India with three disciples to retrieve holy scriptures.' },
    { title: '三国演义', titleEng: 'Romance of the Three Kingdoms', author: 'Luo Guanzhong', year: 1522, born: 1330, lang: 'CHN', free: true, description: 'A historical novel about the tripartite division of China.' },
    { title: 'ألف ليلة وليلة', titleEng: 'One Thousand and One Nights', author: 'Anonymous', year: 800, born: 0, lang: 'ARA', free: true, description: 'A collection of Middle Eastern folk tales told by Scheherazade over 1001 nights.' },
    { title: 'Ὀδύσσεια', titleEng: 'The Odyssey', author: 'Homer', year: -800, born: -850, lang: 'GRE', free: true, description: 'Odysseus\'s ten-year journey home after the fall of Troy.' },
    { title: 'Ἰλιάς', titleEng: 'The Iliad', author: 'Homer', year: -750, born: -850, lang: 'GRE', free: true, description: 'The Trojan War and the wrath of Achilles.' },
    { title: 'Aeneis', titleEng: 'The Aeneid', author: 'Virgil', year: -19, born: -70, lang: 'LAT', free: true, description: 'The legendary story of Aeneas, a Trojan who became the ancestor of the Romans.' },
    { title: 'Et dukkehjem', titleEng: 'A Doll\'s House', author: 'Henrik Ibsen', year: 1879, born: 1828, lang: 'NOR', free: true, description: 'A woman leaves her husband and children to find her own identity.' },
    { title: 'Eventyr', titleEng: 'Fairy Tales', author: 'Hans Christian Andersen', year: 1835, born: 1805, lang: 'DAN', free: true, description: 'A collection of beloved fairy tales including The Little Mermaid and Thumbelina.' },
    { title: '춘향전', titleEng: 'The Story of Chunhyang', author: 'Anonymous', year: 1700, born: 0, lang: 'KOR', free: true, description: 'A love story between a nobleman\'s son and a courtesan\'s daughter in Joseon Korea.' },
    { title: '홍길동전', titleEng: 'The Tale of Hong Gildong', author: 'Heo Gyun', year: 1612, born: 1569, lang: 'KOR', free: true, description: 'A illegitimate son becomes a legendary outlaw fighting against social injustice.' },
    { title: 'شاهنامه', titleEng: 'Shahnameh', author: 'Ferdowsi', year: 1010, born: 940, lang: 'PER', free: true, description: 'An epic poem depicting the mythological and historical past of the Persian Empire.' },
    { title: 'गोदान', titleEng: 'Godan', author: 'Munshi Premchand', year: 1936, born: 1880, lang: 'HIN', free: true, description: 'A poor Indian farmer struggles with debt, caste, and colonial exploitation.' },
  ]

  for (const book of books) {
    await prisma.book.create({ data: book })
  }
  console.log('Books added: ' + books.length)
}

main().catch(console.error).finally(() => prisma.$disconnect())
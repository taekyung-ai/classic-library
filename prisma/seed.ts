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
    { title: '1984', titleEng: 'Nineteen Eighty-Four', author: 'George Orwell', year: 1949, born: 1903, lang: 'ENG', free: true, description: 'A dystopian novel about totalitarianism, surveillance, and the destruction of truth.' },
    { title: 'Animal Farm', titleEng: 'Animal Farm', author: 'George Orwell', year: 1945, born: 1903, lang: 'ENG', free: true, description: 'Farm animals overthrow their human farmer, but corruption soon follows.' },
    { title: 'Pride and Prejudice', titleEng: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, born: 1775, lang: 'ENG', free: true, description: 'Elizabeth Bennet navigates issues of marriage, morality, and misconceptions.' },
    { title: 'Sense and Sensibility', titleEng: 'Sense and Sensibility', author: 'Jane Austen', year: 1811, born: 1775, lang: 'ENG', free: true, description: 'Two sisters experience love and heartbreak in contrasting ways.' },
    { title: 'Jane Eyre', titleEng: 'Jane Eyre', author: 'Charlotte Brontë', year: 1847, born: 1816, lang: 'ENG', free: true, description: 'An orphaned girl becomes a governess and falls in love with her mysterious employer.' },
    { title: 'Wuthering Heights', titleEng: 'Wuthering Heights', author: 'Emily Brontë', year: 1847, born: 1818, lang: 'ENG', free: true, description: 'A passionate and destructive love story set on the Yorkshire moors.' },
    { title: 'Oliver Twist', titleEng: 'Oliver Twist', author: 'Charles Dickens', year: 1837, born: 1812, lang: 'ENG', free: true, description: 'An orphan boy navigates the criminal underworld of Victorian London.' },
    { title: 'Great Expectations', titleEng: 'Great Expectations', author: 'Charles Dickens', year: 1861, born: 1812, lang: 'ENG', free: true, description: 'A poor orphan boy rises to wealth with the help of a mysterious benefactor.' },
    { title: 'A Tale of Two Cities', titleEng: 'A Tale of Two Cities', author: 'Charles Dickens', year: 1859, born: 1812, lang: 'ENG', free: true, description: 'A story of love and sacrifice set during the French Revolution.' },
    { title: 'Moby Dick', titleEng: 'Moby Dick', author: 'Herman Melville', year: 1851, born: 1819, lang: 'ENG', free: true, description: 'Captain Ahab\'s obsessive quest to hunt the white whale Moby Dick.' },
    { title: 'The Adventures of Tom Sawyer', titleEng: 'The Adventures of Tom Sawyer', author: 'Mark Twain', year: 1876, born: 1835, lang: 'ENG', free: true, description: 'A mischievous boy\'s adventures along the Mississippi River.' },
    { title: 'Adventures of Huckleberry Finn', titleEng: 'Adventures of Huckleberry Finn', author: 'Mark Twain', year: 1884, born: 1835, lang: 'ENG', free: true, description: 'Huck Finn and a runaway slave journey down the Mississippi River.' },
    { title: 'Crime and Punishment', titleEng: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: 1866, born: 1821, lang: 'RUS', free: true, description: 'A student murders a pawnbroker and struggles with guilt and redemption.' },
    { title: 'The Brothers Karamazov', titleEng: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', year: 1880, born: 1821, lang: 'RUS', free: true, description: 'Three brothers struggle with faith, morality, and their father\'s murder.' },
    { title: 'The Idiot', titleEng: 'The Idiot', author: 'Fyodor Dostoevsky', year: 1869, born: 1821, lang: 'RUS', free: true, description: 'A kind and innocent man tries to navigate corrupt Russian society.' },
    { title: 'Anna Karenina', titleEng: 'Anna Karenina', author: 'Leo Tolstoy', year: 1878, born: 1828, lang: 'RUS', free: true, description: 'A tragic love story set against the backdrop of Russian high society.' },
    { title: 'War and Peace', titleEng: 'War and Peace', author: 'Leo Tolstoy', year: 1869, born: 1828, lang: 'RUS', free: true, description: 'A sweeping narrative of Russian society during the Napoleonic Wars.' },
    { title: 'The Cherry Orchard', titleEng: 'The Cherry Orchard', author: 'Anton Chekhov', year: 1904, born: 1860, lang: 'RUS', free: true, description: 'An aristocratic family loses their estate and cherry orchard to debt.' },
    { title: 'Faust', titleEng: 'Faust', author: 'Johann Wolfgang von Goethe', year: 1808, born: 1749, lang: 'GER', free: true, description: 'A scholar makes a deal with the devil in pursuit of ultimate knowledge.' },
    { title: 'Die Verwandlung', titleEng: 'The Metamorphosis', author: 'Franz Kafka', year: 1915, born: 1883, lang: 'GER', free: true, description: 'A man wakes up one morning transformed into a giant insect.' },
    { title: 'Der Proceß', titleEng: 'The Trial', author: 'Franz Kafka', year: 1925, born: 1883, lang: 'GER', free: true, description: 'A man is arrested and prosecuted by an inaccessible authority.' },
    { title: 'Buddenbrooks', titleEng: 'Buddenbrooks', author: 'Thomas Mann', year: 1901, born: 1875, lang: 'GER', free: true, description: 'The decline of a wealthy German merchant family over four generations.' },
    { title: 'Don Quixote', titleEng: 'Don Quixote', author: 'Miguel de Cervantes', year: 1605, born: 1547, lang: 'SPA', free: true, description: 'A man reads so many chivalric novels that he becomes a self-styled knight.' },
    { title: 'La Casa de Bernarda Alba', titleEng: 'The House of Bernarda Alba', author: 'Federico García Lorca', year: 1936, born: 1898, lang: 'SPA', free: true, description: 'A tyrannical widow imposes an eight-year mourning period on her five daughters.' },
    { title: 'La Divina Commedia', titleEng: 'The Divine Comedy', author: 'Dante Alighieri', year: 1320, born: 1265, lang: 'ITA', free: true, description: 'A journey through Hell, Purgatory, and Paradise.' },
    { title: 'Il Principe', titleEng: 'The Prince', author: 'Niccolò Machiavelli', year: 1532, born: 1469, lang: 'ITA', free: true, description: 'A political treatise on the acquisition and maintenance of political power.' },
    { title: 'I Promessi Sposi', titleEng: 'The Betrothed', author: 'Alessandro Manzoni', year: 1827, born: 1785, lang: 'ITA', free: true, description: 'Two lovers in 17th-century Lombardy face obstacles to their marriage.' },
    { title: 'Kokoro', titleEng: 'Kokoro', author: 'Natsume Soseki', year: 1914, born: 1867, lang: 'JPN', free: true, description: 'A young man forms a bond with a lonely older man haunted by past guilt.' },
    { title: 'The Sound of Waves', titleEng: 'The Sound of Waves', author: 'Yukio Mishima', year: 1954, born: 1925, lang: 'JPN', free: true, description: 'A simple and pure love story between a young fisherman and a wealthy girl.' },
    { title: 'In Search of Lost Time', titleEng: 'In Search of Lost Time', author: 'Marcel Proust', year: 1913, born: 1871, lang: 'FRA', free: true, description: 'A monumental novel exploring memory, time, and French society.' },
    { title: 'The Stranger', titleEng: 'The Stranger', author: 'Albert Camus', year: 1942, born: 1913, lang: 'FRA', free: true, description: 'A man kills an Arab on a beach and faces trial in absurdist Algeria.' },
    { title: 'Nausea', titleEng: 'Nausea', author: 'Jean-Paul Sartre', year: 1938, born: 1905, lang: 'FRA', free: true, description: 'A historian experiences a profound existential crisis.' },
    { title: 'One Hundred Years of Solitude', titleEng: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', year: 1967, born: 1927, lang: 'SPA', free: true, description: 'Seven generations of the Buendía family in the fictional town of Macondo.' },
  ]

  for (const book of books) {
    await prisma.book.create({ data: book })
  }
  console.log('Books added: ' + books.length)
}

main().catch(console.error).finally(() => prisma.$disconnect())

const MAX_RANDOM_NUMBER = 100;

export const generateNickname = (
  firstName: string,
  lastName: string
): string => {
  // Remove all characters except letters
  const cleanFirstName = firstName.replace(/[^a-zA-ZА-Яа-яІіЇїЄєҐґ]/g, '');
  const cleanLastName = lastName.replace(/[^a-zA-ZА-Яа-яІіЇїЄєҐґ]/g, '');

  // Convert to Latin
  const cyrillicToLatin: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    є: 'ye',
    ж: 'zh',
    з: 'z',
    и: 'y',
    і: 'i',
    ї: 'yi',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ю: 'yu',
    я: 'ya',
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'G',
    Д: 'D',
    Е: 'E',
    Є: 'Ye',
    Ж: 'Zh',
    З: 'Z',
    И: 'Y',
    І: 'I',
    Ї: 'Yi',
    Й: 'Y',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    Ф: 'F',
    Х: 'Kh',
    Ц: 'Ts',
    Ч: 'Ch',
    Ш: 'Sh',
    Щ: 'Sch',
    Ь: '',
    Ю: 'Yu',
    Я: 'Ya',
  };

  const transliterate = (str: string): string => {
    return str
      .split('')
      .map((char) => cyrillicToLatin[char] || char)
      .join('');
  };

  const latinFirstName = transliterate(cleanFirstName.toLowerCase());
  const latinLastName = transliterate(cleanLastName.toLowerCase());

  const randomNumber = Math.floor(Math.random() * MAX_RANDOM_NUMBER) + 1;

  return `${latinFirstName}.${latinLastName}${randomNumber}`;
};

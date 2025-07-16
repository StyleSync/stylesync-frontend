import { AppRouterOutputs } from '@/server/types';

export type GroupedClients = {
  [letter: string]: AppRouterOutputs['client']['get'][];
};

// Проста транслiтерацiя (UA standard, тільки перша літера)
const transliterateLetter = (char: string): string => {
  const map: Record<string, string> = {
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'H',
    Ґ: 'G',
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
    Щ: 'Shch',
    Ь: '',
    Ю: 'Yu',
    Я: 'Ya',
  };

  const upperChar = char.toUpperCase();

  return map[upperChar] || upperChar;
};

export const sortByFirstAndLastName = (
  clients: AppRouterOutputs['client']['get'][]
) => {
  return [...clients].sort((a, b) => {
    const aFirst =
      transliterateLetter(a.firstName?.[0] ?? '') +
      a.firstName?.slice(1).toLowerCase();
    const bFirst =
      transliterateLetter(b.firstName?.[0] ?? '') +
      b.firstName?.slice(1).toLowerCase();

    const aLast = a.lastName?.trim().toLowerCase() ?? '';
    const bLast = b.lastName?.trim().toLowerCase() ?? '';

    if (aFirst < bFirst) return -1;
    if (aFirst > bFirst) return 1;

    if (aLast < bLast) return -1;
    if (aLast > bLast) return 1;

    return 0;
  });
};

export const groupClientsByFirstLetter = (
  clients: AppRouterOutputs['client']['get'][]
): GroupedClients => {
  return clients.reduce(
    (acc: GroupedClients, client: AppRouterOutputs['client']['get']) => {
      const rawLetter = client.firstName?.[0] ?? '';
      const letter = transliterateLetter(rawLetter).charAt(0).toUpperCase();

      if (!letter.match(/[A-Z]/)) return acc;

      if (!acc[letter]) {
        // eslint-disable-next-line no-param-reassign
        acc[letter] = [];
      }

      acc[letter].push(client);

      return acc;
    },
    {}
  );
};

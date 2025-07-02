export type Client = {
  name: string;
  phone: string;
};
export type GroupedClients = {
  [letter: string]: Client[];
};

export const sortByFirstAndLastName = (clients: Client[]) => {
  return [...clients].sort((a, b) => {
    const [aFirst, ...aRest] = a.name.trim().split(' ');
    const [bFirst, ...bRest] = b.name.trim().split(' ');

    const aLast = aRest.join(' ');
    const bLast = bRest.join(' ');

    if (aFirst.toLowerCase() < bFirst.toLowerCase()) return -1;
    if (aFirst.toLowerCase() > bFirst.toLowerCase()) return 1;

    // Імена однакові — порівнюємо прізвища
    if (aLast.toLowerCase() < bLast.toLowerCase()) return -1;
    if (aLast.toLowerCase() > bLast.toLowerCase()) return 1;

    return 0;
  });
};

export const groupClientsByFirstLetter = (
  clients: Client[]
): GroupedClients => {
  return clients.reduce((acc: GroupedClients, client: Client) => {
    const firstName = client.name.trim().split(' ')[0]; // беремо ім’я
    const firstLetter = firstName[0].toUpperCase();

    if (!acc[firstLetter]) {
      // eslint-disable-next-line no-param-reassign
      acc[firstLetter] = [];
    }

    acc[firstLetter].push(client);

    return acc;
  }, {});
};

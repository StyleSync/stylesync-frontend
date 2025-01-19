let inter;
let geistSans;

if (process.env.STORYBOOK !== 'true') {
  const { Inter } = require('next/font/google');
  const { GeistSans } = require('geist/font/sans');

  inter = Inter({
    subsets: ['latin', 'cyrillic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  });

  geistSans = GeistSans();
} else {
  inter = { className: 'inter' };
  geistSans = { className: 'geist-sans' };
}

const fonts = {
  INTER: inter,
  GEIST: geistSans,
};

export { fonts };

import { type FC, useId } from 'react';

import type { IphoneLayoutProps } from './iphone-layout.interface';

const config = {
  colour: {
    frameLinearGradient: {
      from: '#FA7199',
      to: '#FDA571',
    },
    controlLinearGradient: {
      from: 'black',
      to: 'black',
    },
  },
};

export const IphoneLayout: FC<IphoneLayoutProps> = ({ imageUrl, ...props }) => {
  const componentId = useId();
  // ids
  const frameId = `frame${componentId}`;
  const imageId = `image${componentId}`;
  const filterId = `filter${componentId}`;
  const patterId = `patter${componentId}`;

  return (
    <svg viewBox='0 0 253 468' fill='none' {...props}>
      <g filter={`url(#${filterId})`}>
        <path
          d='M226.19 135.794H231.134C231.397 135.794 231.609 136.006 231.609 136.269V185.487C231.609 185.75 231.397 185.962 231.134 185.962H226.19C225.927 185.962 225.715 185.75 225.715 185.487V136.269C225.715 136.006 225.927 135.794 226.19 135.794Z'
          fill={config.colour.controlLinearGradient.from}
        />
        <path
          d='M21.4753 125.587H26.4188C26.6822 125.587 26.8941 125.799 26.8941 126.062V156.458C26.8941 156.721 26.6821 156.933 26.4188 156.933H21.4753C21.212 156.933 21 156.721 21 156.458V126.062C21 125.799 21.2121 125.587 21.4753 125.587Z'
          fill={config.colour.controlLinearGradient.from}
        />
        <path
          d='M21.4753 166.481H26.4188C26.6822 166.481 26.8941 166.693 26.8941 166.956V197.352C26.8941 197.615 26.6821 197.827 26.4188 197.827H21.4753C21.212 197.827 21 197.615 21 197.352V166.956C21 166.693 21.2121 166.481 21.4753 166.481Z'
          fill={config.colour.controlLinearGradient.from}
        />
        <path
          d='M26.4188 94.5412H21.4753C21.2128 94.5412 21 94.754 21 95.0165V110.354C21 110.617 21.2128 110.829 21.4753 110.829H26.4188C26.6814 110.829 26.8942 110.617 26.8942 110.354V95.0165C26.8942 94.754 26.6814 94.5412 26.4188 94.5412Z'
          fill={config.colour.controlLinearGradient.from}
        />
        <path
          d='M226.19 136.412H231.134C231.397 136.412 231.609 136.624 231.609 136.887V185.059C231.609 185.323 231.397 185.535 231.134 185.535H226.19C225.927 185.535 225.715 185.323 225.715 185.059V136.887C225.715 136.624 225.927 136.412 226.19 136.412Z'
          fill='url(#paint0_linear_31408_1406)'
        />
        <path
          d='M21.5378 126.205H26.4813C26.7447 126.205 26.9566 126.417 26.9566 126.68V156.03C26.9566 156.293 26.7446 156.505 26.4813 156.505H21.5378C21.2745 156.505 21.0625 156.293 21.0625 156.03V126.68C21.0625 126.417 21.2746 126.205 21.5378 126.205Z'
          fill='url(#paint1_linear_31408_1406)'
        />
        <path
          d='M21.4753 167.099H26.4188C26.6822 167.099 26.8941 167.311 26.8941 167.574V196.924C26.8941 197.187 26.6821 197.399 26.4188 197.399H21.4753C21.212 197.399 21 197.187 21 196.924V167.574C21 167.311 21.2121 167.099 21.4753 167.099Z'
          fill='url(#paint2_linear_31408_1406)'
        />
        <path
          d='M26.4188 95.1591H21.4753C21.2128 95.1591 21 95.3719 21 95.6345V109.926C21 110.189 21.2128 110.402 21.4753 110.402H26.4188C26.6814 110.402 26.8942 110.189 26.8942 109.926V95.6345C26.8942 95.3719 26.6814 95.1591 26.4188 95.1591Z'
          fill='url(#paint3_linear_31408_1406)'
        />
        <path
          d='M197.655 9.29132H54.9905C37.0476 9.29132 22.502 23.837 22.502 41.7799V402.066C22.502 420.009 37.0476 434.555 54.9905 434.555H197.655C215.598 434.555 230.144 420.009 230.144 402.066V41.7799C230.144 23.837 215.598 9.29132 197.655 9.29132Z'
          fill={`url(#${frameId})`}
        />
        <path
          d='M185.44 9V15.9839H188.342V9H185.44ZM22.2129 51.4268V54.3286H230.439V51.4268H22.2129ZM22.2129 390.258V393.16H230.439V390.258H22.2129ZM64.3101 428.833V434.847H67.2119V428.833H64.3101Z'
          fill={config.colour.frameLinearGradient.from}
        />
        <path
          d='M145.361 11.8248H108.43V14.7666H145.361V11.8248Z'
          fill='black'
        />
        <path
          d='M55.5547 11.5231C38.5872 11.5231 24.9277 25.1826 24.9277 42.1501V400.801C24.9277 417.769 38.5872 431.428 55.5547 431.428H197.126C214.093 431.428 227.752 417.769 227.752 400.801V42.1501C227.752 25.1826 214.093 11.5231 197.126 11.5231H145.349C145.026 11.5233 144.715 11.6387 144.471 11.8485C144.226 12.0583 144.065 12.3486 144.016 12.667V12.7263H144.009H109.787C109.751 12.3958 109.595 12.0902 109.347 11.8682C109.1 11.6461 108.779 11.5232 108.447 11.5231H55.5547Z'
          fill='black'
          stroke='#434343'
          strokeWidth='0.500001'
        />
        <mask
          id='mask0_31408_1406'
          // style='mask-type:alpha'
          maskUnits='userSpaceOnUse'
          x='32'
          y='18'
          width='189'
          height='408'
        >
          <path
            d='M54.7278 18.7094C42.4445 18.709 32.4866 28.6664 32.4863 40.9498V402.897C32.4859 415.181 42.444 425.138 54.7278 425.137H126.33H197.932C210.216 425.138 220.174 415.181 220.173 402.897V40.9498C220.173 28.6664 210.215 18.709 197.932 18.7094H169.41C166.811 18.7094 165.467 18.9782 165.467 23.1011C165.467 27.2241 162.912 34.1712 153.769 34.1712H98.8903C89.748 34.1712 87.1931 27.2241 87.1931 23.1011C87.1931 18.9782 85.8488 18.7094 83.2496 18.7094H54.7278Z'
            fill='white'
          />
        </mask>
        {/* iphone header pad */}
        <g mask='url(#mask0_31408_1406)'>
          <rect
            x='32.5488'
            y='18'
            width='188'
            height='408'
            fill={`url(#${patterId})`}
          />
          {/* <rect */}
          {/*   x='28.5176' */}
          {/*   y='12.8303' */}
          {/*   width='194.226' */}
          {/*   height='27.2991' */}
          {/*   fill='white' */}
          {/* /> */}
        </g>
        <path
          d='M142.66 11.9708H111.12C110.375 11.9708 109.771 12.5743 109.771 13.3188V14.7632C109.771 15.5077 110.375 16.1112 111.12 16.1112H142.66C143.404 16.1112 144.008 15.5077 144.008 14.7632V13.3188C144.008 12.5743 143.404 11.9708 142.66 11.9708Z'
          fill='black'
          stroke='#1A1A1A'
          strokeWidth='0.500001'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M111.924 12.8182C111.246 12.8182 110.701 13.3633 110.701 14.0408C110.701 14.7182 111.246 15.2633 111.924 15.2633H141.859C142.536 15.2633 143.082 14.7182 143.082 14.0408C143.082 13.3633 142.536 12.8182 141.859 12.8182H111.924Z'
          stroke='#292929'
          strokeWidth='0.153809'
          strokeLinecap='round'
        />
        <mask
          id='mask1_31408_1406'
          // style='mask-type:luminance'
          maskUnits='userSpaceOnUse'
          x='110'
          y='12'
          width='34'
          height='4'
        >
          <path
            d='M111.937 12.7717C111.236 12.7717 110.67 13.3373 110.67 14.0389C110.67 14.7404 111.236 15.3104 111.937 15.3104H141.872C142.573 15.3104 143.139 14.7404 143.139 14.0389C143.139 13.3373 142.573 12.7717 141.872 12.7717H111.937ZM111.937 12.8622H141.872C142.525 12.8622 143.048 13.3855 143.048 14.0389C143.048 14.6922 142.525 15.2199 141.872 15.2199H111.937C111.284 15.2199 110.76 14.6922 110.76 14.0389C110.76 13.3855 111.284 12.8622 111.937 12.8622Z'
            fill='white'
          />
        </mask>
        <g mask='url(#mask1_31408_1406)'>
          <g filter='url(#filter1_f_31408_1406)'>
            <path
              d='M143.095 14.041C143.095 14.2563 142.971 14.4308 142.817 14.4308C142.664 14.4308 142.539 14.2563 142.539 14.041C142.539 13.8257 142.664 13.6512 142.817 13.6512C142.971 13.6512 143.095 13.8257 143.095 14.041Z'
              fill='white'
            />
            <path
              d='M110.721 14.041C110.721 14.2563 110.845 14.4308 110.999 14.4308C111.153 14.4308 111.277 14.2563 111.277 14.041C111.277 13.8257 111.153 13.6512 110.999 13.6512C110.845 13.6512 110.721 13.8257 110.721 14.041Z'
              fill='white'
            />
          </g>
        </g>
        <path
          d='M99.495 27.6727C101.339 27.6727 102.834 26.1779 102.834 24.334C102.834 22.49 101.339 20.9952 99.495 20.9952C97.6511 20.9952 96.1562 22.49 96.1562 24.334C96.1562 26.1779 97.6511 27.6727 99.495 27.6727Z'
          fill='#161616'
        />
        <path
          d='M99.5008 26.3933C100.638 26.3933 101.56 25.4713 101.56 24.3339C101.56 23.1966 100.638 22.2745 99.5008 22.2745C98.3634 22.2745 97.4414 23.1966 97.4414 24.3339C97.4414 25.4713 98.3634 26.3933 99.5008 26.3933Z'
          fill='#0A0D13'
        />
        <path
          d='M99.4968 25.9029C100.363 25.9029 101.066 25.2004 101.066 24.3339C101.066 23.4673 100.363 22.7648 99.4968 22.7648C98.6302 22.7648 97.9277 23.4673 97.9277 24.3339C97.9277 25.2004 98.6302 25.9029 99.4968 25.9029Z'
          fill='#091427'
        />
        <g filter='url(#filter2_f_31408_1406)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M98.4145 23.2841C98.2285 23.3037 97.9641 23.5877 97.9445 24.1459C97.9249 24.7041 98.1697 25.0077 98.3068 25.0077C98.4439 25.0077 99.0119 24.1949 98.4145 23.2841Z'
            fill='#235A91'
            fillOpacity='0.556075'
          />
        </g>
        <g filter='url(#filter3_f_31408_1406)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M99.7579 23.0887C99.4644 23.179 99.408 23.6531 99.4193 23.9241C99.4306 24.195 99.8144 24.9062 100.277 24.7481C100.74 24.5901 100.819 24.0031 100.627 23.608C100.435 23.2129 100.085 22.9307 99.7579 23.0887Z'
            fill='#235A91'
            fillOpacity='0.556075'
          />
        </g>
      </g>
      <defs>
        <filter
          id={filterId}
          x='0'
          y='0'
          width='252.609'
          height='467.847'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='1'
            operator='dilate'
            in='SourceAlpha'
            result='effect1_dropShadow_31408_1406'
          />
          <feOffset dy='12' />
          <feGaussianBlur stdDeviation='10' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.988235 0 0 0 0 0.521569 0 0 0 0 0.54902 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_31408_1406'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_31408_1406'
            result='shape'
          />
        </filter>
        <pattern
          id={patterId}
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref={`#${imageId}`}
            transform='matrix(0.00127877 0 0 0.000614513 0 -0.00697289)'
          />
        </pattern>
        <filter
          id='filter1_f_31408_1406'
          x='107.21'
          y='10.1406'
          width='39.3962'
          height='7.80081'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur
            stdDeviation='1.7553'
            result='effect1_foregroundBlur_31408_1406'
          />
        </filter>
        <filter
          id='filter2_f_31408_1406'
          x='97.7405'
          y='23.0813'
          width='1.14398'
          height='2.12927'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur
            stdDeviation='0.101426'
            result='effect1_foregroundBlur_31408_1406'
          />
        </filter>
        <filter
          id='filter3_f_31408_1406'
          x='99.2151'
          y='22.8412'
          width='1.71234'
          height='2.13239'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur
            stdDeviation='0.101426'
            result='effect1_foregroundBlur_31408_1406'
          />
        </filter>
        <linearGradient
          id='paint0_linear_31408_1406'
          x1='231.609'
          y1='136.412'
          x2='231.609'
          y2='185.557'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={config.colour.controlLinearGradient.from} />
          <stop offset='1' stopColor={config.colour.controlLinearGradient.to} />
        </linearGradient>
        <linearGradient
          id='paint1_linear_31408_1406'
          x1='26.9567'
          y1='126.205'
          x2='26.9567'
          y2='156.505'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={config.colour.controlLinearGradient.from} />
          <stop offset='1' stopColor={config.colour.controlLinearGradient.to} />
        </linearGradient>
        <linearGradient
          id='paint2_linear_31408_1406'
          x1='26.8942'
          y1='167.099'
          x2='26.8942'
          y2='197.399'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={config.colour.controlLinearGradient.from} />
          <stop offset='1' stopColor={config.colour.controlLinearGradient.to} />
        </linearGradient>
        <linearGradient
          id='paint3_linear_31408_1406'
          x1='26.8942'
          y1='95.1591'
          x2='26.8942'
          y2='110.402'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={config.colour.controlLinearGradient.from} />
          <stop offset='1' stopColor={config.colour.controlLinearGradient.to} />
        </linearGradient>
        <linearGradient
          id={frameId}
          x1='126.323'
          y1='9.29132'
          x2='126.323'
          y2='434.555'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={config.colour.frameLinearGradient.to} />
          <stop offset='1' stopColor={config.colour.frameLinearGradient.from} />
        </linearGradient>
        <image id={imageId} width='782' height='1650' xlinkHref={imageUrl} />
      </defs>
    </svg>
  );
};

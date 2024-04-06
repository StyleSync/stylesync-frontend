'use client';
import { type FC, useMemo, useState } from 'react';

import { TextField } from '@/modules/core/components/text-field';
import { Button } from '@/modules/core/components/button';

import type { ProSearchFieldProps } from './pro-search-field.interface';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { useBoolean } from 'usehooks-ts';
import { trpc } from '@/modules/core/utils/trpc.utils';
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';
import { getFullName } from '@/modules/user/utils/user.utils';
import { useRouter } from 'next/navigation';
import type { Prisma } from '@prisma/client';
import { Avatar } from '@/modules/core/components/avatar';
import { DateSelect } from '@/modules/core/components/date-select';
import clsx from 'clsx';

type ProDropdownItem = DropdownItem<
  Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>
>;

const AutocompleteItemRender: FC<ProDropdownItem> = ({ data }) => {
  if (!data) return null;

  return (
    <div className='flex items-center gap-x-2'>
      <Avatar url={data.user.avatar} />
      <span>{getFullName(data.user)}</span>
    </div>
  );
};

export const ProSearchField: FC<ProSearchFieldProps> = () => {
  const router = useRouter();
  // state
  const isAutocompleteOpen = useBoolean();
  const isOpenNowActive = useBoolean();
  const [date, setDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  // queries
  const { data: professionalList, isFetching } =
    trpc.professional.list.useQuery(
      {
        limit: 6,
      },
      {
        enabled: !!searchQuery,
      }
    );
  // memo
  // @ts-ignore
  const autocompleteItems: ProDropdownItem[] = useMemo(
    () =>
      professionalList?.map((professional) => ({
        id: professional.userId,
        text: getFullName(professional.user),
        data: professional,
      })) || [],
    [professionalList]
  );

  return (
    <div className='flex-1 flex flex-col gap-y-4'>
      <DropdownMenu
        items={autocompleteItems}
        render={AutocompleteItemRender}
        trigger={
          <TextField
            variant='input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            endAdornment={
              <Button
                variant='secondary'
                icon='search'
                className='!bg-transparent !text-gray'
                isLoading={isFetching}
              />
            }
            onFocus={isAutocompleteOpen.setTrue}
            placeholder='Search for specialist'
            className='!px-6 !h-[60px] !rounded-xl focus:!shadow-lg transition !bg-white shadow !border-transparent'
            classes={{
              container: '!rounded-xl',
              endAdornment: '!right-3',
              fieldset: '!border-transparent',
            }}
          />
        }
        isOpen={isAutocompleteOpen.value && !!searchQuery}
        onClose={isAutocompleteOpen.setFalse}
        onSelect={({ id }) => {
          router.push(`/app/profile/${id}`);
          isAutocompleteOpen.setFalse();
        }}
        isLoading={isFetching && autocompleteItems.length === 0}
        popoverProps={{
          disableAutofocus: true,
          forceTriggerWidth: true,
        }}
        classes={{
          option: '!px-2',
        }}
      />
      <div className='flex gap-x-4'>
        <DropdownMenu
          items={[]}
          trigger={
            <Button
              text='Kiev'
              variant='unstyled'
              className='!bg-white shadow text-dark'
              icon='location'
            />
          }
          isOpen={false}
          onClose={() => {}}
        />
        <Button
          text='Type of services'
          variant='unstyled'
          className='!bg-white shadow text-gray'
          iconEnd='chevron-bottom'
        />
        <DateSelect value={date} onChange={setDate} placeholder='Date' />
        <Button
          text='Open now'
          rippleColor='transparent'
          variant={isOpenNowActive.value ? 'primary' : 'light'}
          className={clsx({
            '!text-gray hover:!text-primary': !isOpenNowActive.value,
          })}
          // className={clsx('!bg-white transition shadow text-gray', {
          //   'text-white !border-white !bg-primary': isOpenNowActive.value,
          // })}
          onClick={isOpenNowActive.toggle}
          // icon={isOpenNowActive.value ? 'check-mark' : null}
        />
      </div>
    </div>
  );
};

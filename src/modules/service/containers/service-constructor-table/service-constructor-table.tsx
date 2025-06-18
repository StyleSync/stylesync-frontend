import { type FC, useCallback, useEffect, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';
import { v4 } from 'uuid';

import { Button } from '@/modules/core/components/button';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';
import type { IconName } from '@/modules/core/components/icon';
import { Tag } from '@/modules/core/components/tag';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ServiceOnProfessionalEditForm } from '@/modules/service/components/service-on-professional-edit-form';
import { ServiceConstructorRow } from '@/modules/service/containers/service-constructor-row';
import { useServiceOnProfessionalGroupDelete } from '@/modules/service/hooks/use-service-on-professional-group-delete';
import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

import type { ServiceConstructorTableProps } from './service-constructor-table.interface';

import styles from './service-constructor-table.module.scss';

export const ServiceConstructorTable: FC<ServiceConstructorTableProps> = ({
  service,
  serviceOnProfessionalList,
  onRemove,
}) => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  // state
  const isActionsOpen = useBoolean();
  const isCreateOpen = useBoolean();
  const [items, setItems] = useState<ServiceOnProfessional[]>([]);
  // queries
  const serviceOnProfessionalGroupDelete =
    useServiceOnProfessionalGroupDelete();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setItems(serviceOnProfessionalList.sort((a, b) => a.position - b.position));
  }, [serviceOnProfessionalList]);

  const handleTableRemoveClick = useCallback(() => {
    serviceOnProfessionalGroupDelete.mutate(
      serviceOnProfessionalList.map((item) => item.id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.serviceOnProfessional.list),
          });
          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.professional.getProfileCompletionStatus),
          });
          onRemove(service);
        },
        onError: () => {
          showToast({
            variant: 'error',
            title: intl.formatMessage({
              id: 'service.constructor.table.toast.error',
            }),
          });
        },
      }
    );
  }, [
    queryClient,
    service,
    serviceOnProfessionalGroupDelete,
    serviceOnProfessionalList,
    onRemove,
    intl,
  ]);

  const handleSelect = ({ id }: DropdownItem) => {
    if (id === 'delete') {
      isActionsOpen.setFalse();
      handleTableRemoveClick();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Tag
          icon={service.icon as IconName}
          text={intl.formatMessage({ id: service.name })}
        />
        <div className={styles.actions}>
          <Button
            aria-label='Delete service group'
            className={styles.remove}
            icon='trash'
            variant='danger'
            type='button'
            isLoading={serviceOnProfessionalGroupDelete.isPending}
            onClick={handleTableRemoveClick}
          />
        </div>
        <DropdownMenu
          isOpen={isActionsOpen.value}
          onClose={isActionsOpen.setFalse}
          trigger={
            <Button
              onClick={isActionsOpen.setTrue}
              className={clsx(styles.more, {
                [styles.active]: isActionsOpen.value,
              })}
              variant='secondary'
              icon='points'
            />
          }
          onSelect={handleSelect}
          items={[
            {
              id: 'delete',
              variant: 'danger',
              icon: 'trash',
              text: intl.formatMessage({
                id: 'service.constructor.delete.group',
              }),
            },
          ]}
          popoverProps={{
            align: 'end',
          }}
        />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((serviceOnProfessional, index) => (
            <ServiceConstructorRow
              key={serviceOnProfessional.id}
              data={serviceOnProfessional}
              index={index}
            />
          ))}
        </SortableContext>
      </DndContext>
      <ServiceOnProfessionalEditForm
        data={{
          service,
          id: `new__${v4()}`,
          title: '',
          duration: 0,
          price: 0,
          currency: 'UAH',
          description: '',
          position: items.length,
        }}
        isActive={isCreateOpen.value}
        onOpenChange={isCreateOpen.setFalse}
      />
    </div>
  );
};

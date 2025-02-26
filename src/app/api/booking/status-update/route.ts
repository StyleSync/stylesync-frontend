import { prisma } from '@/server/prisma';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { BookingStatus } from '@prisma/client';
import { subDays } from 'date-fns';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // eslint-disable-next-line no-console
  console.log('Cron job booking-status-update started');
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const result = await prisma.booking.updateMany({
    where: {
      status: BookingStatus.PENDING,
      endTime: {
        lte: subDays(new Date(), 1),
      },
    },
    data: {
      status: BookingStatus.FINISHED,
    },
  });

  // eslint-disable-next-line no-console
  console.log('Cron job booking-status-update finished');
  // eslint-disable-next-line no-console
  console.log(result);

  // @ts-ignore
  return Response.json({ success: true });
}

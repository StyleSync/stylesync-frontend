import type { Context } from '@/server/context';
import { prisma } from '@/server/prisma';
import { defaultProfessionalSelect } from '@/server/selectors';
import { TRPCError } from '@trpc/server';

export const getProfessionalFromContext = async (ctx: Context) => {
  const { id } = ctx.user;
  const professional = await prisma.professional.findUnique({
    where: { userId: id },
    select: defaultProfessionalSelect,
  });

  if (!professional) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No professional for user with id '${id}'`,
    });
  }

  return professional;
};

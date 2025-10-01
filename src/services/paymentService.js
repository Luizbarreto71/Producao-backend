import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const savePayment = async (paymentData) => {
  return await prisma.payment.create({
    data: {
      payment_id: paymentData.id,
      status: paymentData.status,
      amount: paymentData.transaction_amount,
      payer_email: paymentData.payer?.email || null,
    },
  });
};

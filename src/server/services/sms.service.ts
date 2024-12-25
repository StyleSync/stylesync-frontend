type SendSmsResponse = {
  success_request: {
    info: { [key: string]: string };
    add_info: { [key: string]: string };
  };
};

type SendSmsPayload = {
  phone: string;
  message: string;
};

export const SmsService = {
  sendSms: async ({
    phone,
    message,
  }: SendSmsPayload): Promise<SendSmsResponse> => {
    const response = await fetch('https://im.smsclub.mobi/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      body: JSON.stringify({ src_addr: 'StyleSync', phone: [phone], message }),
    });

    return response.json();
  },
};

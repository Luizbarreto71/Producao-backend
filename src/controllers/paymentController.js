import mercadopago from 'mercadopago';
import { savePayment } from '../services/paymentService.js';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

export const createPayment = async (req, res) => {
  try {
    const { description, price, quantity } = req.body;
    const preference = {
      items: [
        {
          title: description,
          unit_price: Number(price),
          quantity: Number(quantity)
        }
      ],
      back_urls: {
        success: process.env.FRONTEND_URL + "/success",
        failure: process.env.FRONTEND_URL + "/failure",
        pending: process.env.FRONTEND_URL + "/pending"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};

export const webhook = async (req, res) => {
  try {
    const payment = req.body;
    await savePayment(payment);
    res.sendStatus(200);
  } catch (error) {
    console.error("Erro no webhook:", error);
    res.sendStatus(500);
  }
};
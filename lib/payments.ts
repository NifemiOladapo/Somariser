import { getDbConnection } from "./db";

export async function handleChargeSuccess({ data }: { data: any }) {
  console.log("Charge success", data);

  const { customer, plan } = data;

  if (customer?.email && plan?.plan_code) {
    const email = customer.email;
    const fullName =
      `${customer.first_name ?? ""} ${customer.last_name ?? ""}`.trim();
    const customerId = customer.customer_code;
    const sql = await getDbConnection();
    await createOrUpdateUser({
      email,
      fullName,
      customerId,
      priceId: plan.plan_code,
      status: "active",
      sql,
    });
    await createPayment({
      data,
      planCode: plan?.plan_code,
      userEmail: email,
      sql,
    });
  }
}

const createOrUpdateUser = async ({
  customerId,
  email,
  fullName,
  priceId,
  status,
  sql,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
  sql: any;
}) => {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    if (user.length === 0) {
      await sql`INSERT INTO users (email,full_name, customer_id, price_id, status) VALUES (${email},${fullName}, ${customerId}, ${priceId}, ${status})`;
    }
  } catch (error) {
    console.log("Error creating or updating user", error);
  }
};

async function createPayment({
  data,
  planCode,
  userEmail,
  sql,
}: {
  data: any; // Paystack charge.success data
  planCode: string;
  userEmail: string;
  sql: any;
}) {
  try {
    const { amount, reference, status } = data;
    const amountInNaira = amount / 100; // ← Paystack stores amounts in kobo (same idea, different unit)

    await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${amount}, ${status}, ${reference}, ${planCode}, ${userEmail})`;
  } catch (error) {
    console.error("Error creating payment", error);
  }
}

export async function handleSubscriptionDisabled({
  subscriptionCode,
  customerCode,
}: {
  subscriptionCode: string;
  customerCode: string;
}) {
  console.log("Subscription disabled", subscriptionCode);

  try {
    // ← no retrieve call needed! event.data already had everything we need
    const sql = await getDbConnection();

    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${customerCode}`;
  } catch (error) {
    console.error("Error handling subscription disabled", error);
    throw error;
  }
}

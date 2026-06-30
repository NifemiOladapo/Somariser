import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"; 
import {
  handleChargeSuccess,
  handleSubscriptionDisabled,
} from "@/lib/payments";


export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const paystackSig = req.headers.get("x-paystack-signature"); 

  let event;

  try {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(payload)
      .digest("hex");

    if (hash !== paystackSig) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    event = JSON.parse(payload); // ← manually parse after verification

    // PAYSTACK (yours)
    switch (event.event) {
      case "charge.success":
        console.log("Charge success");
        // ← no retrieve call needed! event.data already has everything
        await handleChargeSuccess({ data: event.data });
        break;
      case "subscription.disable":
        console.log("Subscription disabled");
        const subscription = event.data;
        const subscriptionCode = event.data.subscription_code; // ← Paystack's id naming

        await handleSubscriptionDisabled({
          subscriptionCode,
          customerCode: event.data.customer.customer_code,
        });

        console.log(subscription);
        break;
      default:
        console.log(`Unhandled event type ${event.event}`);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to trigger webhook", err },
      { status: 400 },
    );
  }

  return NextResponse.json({ status: "success" }); // ← this line stays exactly the same
};

"use server"

import Razorpay from "razorpay"
import Payment from "@/app/models/Payment"
import connectDb from "@/app/db/connectDb"
import User from "@/app/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    //fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: to_username})
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

   

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment in the database
    await Payment.create({oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message})

    return x
}

export const fetchuser = async (username) => {
   await connectDb()
   let u = await User.findOne({username: username})
   let user = u.toObject({flattenObjectIds: true})
   return user

}


export const fetchpayments = async (username) => {
   await connectDb()
   //find all payments sorted by decreasing order of amount and flatten objectIds
   let p = await Payment.find({to_user: username, done:true}).sort({amount: -1}).limit(10).lean()
   return p

}
export const updateProfile = async (data, oldusername) => {
  await connectDb();

  let ndata = Object.fromEntries(data);

  // ✅ Sanitize the new username: trim, replace spaces, lowercase
  if (ndata.username) {
    ndata.username = ndata.username.trim().replace(/\s+/g, "_").toLowerCase();
  }

  // ✅ Validate: only allow a-z, 0-9, _ 
  if (!/^[a-z0-9_]+$/.test(ndata.username)) {
    return { error: "Invalid username: only letters, numbers, and _ allowed." };
  }

  // ✅ If the username is being updated, check if the new one exists
  if (oldusername !== ndata.username) {
    const u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }

    const result = await User.updateOne({ username: oldusername }, ndata);

    // ✅ Update all payments too
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );

    if (result.modifiedCount === 0) {
      return { error: "Update failed — no user updated." };
    }

    return { success: true };
  } else {
    // ✅ If only other fields updated, just update the same record
    const result = await User.updateOne({ username: oldusername }, ndata);

    if (result.modifiedCount === 0) {
      return { error: "Update failed — no user updated." };
    }

    return { success: true };
  }
};

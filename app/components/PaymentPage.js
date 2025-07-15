"use client";
import React, { use, useEffect, useState } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { userAgentFromString } from "next/server";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  // const { data: session } = useSession()
  const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""});
  const [currentUser, setcurrentUser] = useState({});
  const [Payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter()

  useEffect(() => {
    getData();
  }, [username, searchParams]);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("Thanks for your donation!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      //pull fresh payment data
      getData();

      //wait 1 second before removing the query parameter to let DB update
      const timeout = setTimeout(() => {
        router.push(`/${username}`);
      }, 1000);

      return () => clearTimeout(timeout);
    }
    
  }, [searchParams, router, username]);

  const handlechange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);

    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
    console.log(u, dbpayments);
  };

  const pay = async (amount) => {
    //Get the order Id
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me a Chai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    if (typeof window !== "undefined" && window.Razorpay) {
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      alert("Razorpay SDK failed to load. Are you online?");
    }
  };

  const handlePayment = async (amount) => {
    try {
      await pay(amount);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error in checking out: " + (err.message || err));
    }
  };

  return (
    <div>
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

        <div className="cover w-full bg-red-50 relative">
          <img
            className="object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm"
            src={currentUser.coverpic}
            alt=""
          />
          <div className="absolute -bottom-20 right-[33%] md:right-[46%]  border-white overflow-hidden border-2 rounded-full size-36 2xl:ml-[21px]  ">
            <img
              className="rounded-full object-cover size-36"
              width={128}
              height={128}
              src={currentUser.profilepic}
              alt=""
            />
          </div>
        </div>
        <div className="info flex flex-col justify-center items-center my-24">
          <div className="font-bold text-lg relative md:left-[-16px] 2xl:ml-[21px]">@{username}</div>
          <div className="text-slate-400">
            Lets help {username} get a chai!
          </div>
          <div className="text-slate-400">
            {Payments.length} Payments .  ₹{Payments. reduce((a, b) => a + b.amount, 0)} raised
          </div>

          <div className="payment flex gap-3 w-[80%] flex-col md:flex-row">
            <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
              {/* Show list of all the supporters as a leaderboard */}
              <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
              <ul className="mx-1 text-md">
                {Payments.length == 0 && <li>No payments yet.</li>}
                {Payments.map((p, i) => {
                  return (
                    <li key={i} className="my-2 flex gap-2 items-center">
                      <img width={33} src="/avatar.gif" alt="user avatar" />
                      <span>
                        {p.name} donated{" "}
                        <span className="font-bold">₹{p.amount}</span> with a
                        message: "{p.message}"
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
              <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
              <div className="flex gap-2 flex-col my-2">
                <input
                  onChange={handlechange}
                  value={paymentform.name}
                  name="name"
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter Name"
                />

                <input
                  onChange={handlechange}
                  value={paymentform.message}
                  name="message"
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter Message"
                />

                <input
                  onChange={handlechange}
                  value={paymentform.amount}
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  name="amount"
                  placeholder="Enter Amount"
                />
                <button
                  onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center gap-1 disabled:bg-slate-600 disabled:from-purple-300"
                  disabled={
                    paymentform.name?.length < 3 ||
                    paymentform.message?.length < 4 ||
                    !paymentform.amount || isNaN(Number(paymentform.amount)) || Number(paymentform.amount) <= 0
                  }
                >
                  Pay
                </button>
              </div>
              {/* Or choose from these amounts */}
              <div className="flex flex-col md:flex-row gap-3  my-4">
                <button
                  className="bg-slate-800 p-3 rounded-lg cursor-pointer"
                  onClick={() => handlePayment(1000)}
                >
                  Pay ₹10
                </button>
                <button
                  className="bg-slate-800 p-3 rounded-lg cursor-pointer"
                  onClick={() => handlePayment(2000)}
                >
                  Pay ₹20
                </button>
                <button
                  className="bg-slate-800 p-3 rounded-lg cursor-pointer"
                  onClick={() => handlePayment(3000)}
                >
                  Pay ₹30
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default PaymentPage;

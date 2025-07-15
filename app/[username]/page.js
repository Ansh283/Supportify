import React from "react";
import PaymentPage from "../components/PaymentPage";

const Username =  ({ params }) => {
  return <PaymentPage username={params.username} />;
};

export default Username;

//or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `Payment Page -  Support ${params.username}`,
    description: `Make a payment to ${params.username} on Get Me A Chai.`,
  };
}
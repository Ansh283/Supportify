import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white  h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold md:text-3xl text-xl flex gap-1 text-center">
          <div className="text-center text-4xl mt-6">
          Supportify
          </div>
          <span>
            <img className="invertImg w-21" src="/balu-egg.webp"></img>
          </span>
        </div>
        <p className="py-4 pt-0 text-center md:text-2xl md:text-left">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start now!
        </p>

        <div>
          <Link href="login">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start now
          </button>
          </Link>
          <Link href="/about">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-32 px-10">
        <h1 className="font-bold text-center mb-14 text-2xl">
          Your fans can buy you a Chai
        </h1>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/man.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/coin.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/group.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
        </div>
      </div>
      <div className="text-white container mx-auto py-32 px-10">
        <h1 className="font-bold text-center mb-14 text-2xl">
          Your fans can buy you a Chai
        </h1>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/man.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/coin.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/group.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
        </div>
      </div>
      <div className="text-white container py-32 mx-auto px-10">
        <h1 className="font-bold text-center mb-14 text-2xl">
          Your fans can buy you a Chai
        </h1>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/man.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/coin.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              width={88}
              className=" bg-slate-400 rounded-full p-2 text-black"
              src="/group.gif "
            ></img>
            <p className="font-bold text-2xl text-center">Fund Yourself</p>
            <p>Your fans are available for you to help you.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
     </div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center ">
        <h1 className="font-bold text-center mb-14 text-2xl">
          Learn more about us.
        </h1>

        <div className="w-full max-w-2xl aspect-video">
          <iframe
            src="https://www.youtube.com/embed/es5ThfPNokI?si=FLZ3yEh3lGuMRkt9"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full rounded-lg p-5 md:p=0"
          ></iframe>
        </div>
      </div>
    </>
  );
}

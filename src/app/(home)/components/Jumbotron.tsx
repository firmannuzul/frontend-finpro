const Jumbotron = () => {
  return (
    // <div className="bg-[#F5FCFF]">
    <div className="bg-[#D4CDFF]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-1 py-8 md:grid-cols-2 md:py-24">
          {/* left */}
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-5xl font-bold text-[#0E0359] md:text-6xl">
              Jobs that match your skills.{" "}
              <span className="text-[#5E3BEE]">Careers</span> that fit your
              goals.
            </h1>

            <p className="py-5 text-lg text-[#3D589B] md:text-xl">
              Explore a wide range of opportunities tailored to your skills and
              interests. Whether you’re an experienced professional or just
              starting out, there’s a role waiting for you.
            </p>

            {/* <button className="w-fit rounded-lg border bg-[#5E3BEE] px-8 py-4 text-white">
              Get In Touch
            </button> */}
          </div>

          {/* right */}
          <div>
            <img
              src="/positive.png"
              alt="thumbnail"
              className="ml-10 h-auto w-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;

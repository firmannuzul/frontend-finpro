import { BsSuitcaseLg } from "react-icons/bs";
import { BsBuilding } from "react-icons/bs";
import { GoPeople } from "react-icons/go";


const Explore = () => {
  return (
    <div className="container mx-auto grid grid-cols-4 gap-8 py-15">
      <div className="flex h-[230px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-4">
        <div className="grid h-[100px] w-[100px] place-items-center">
          <BsSuitcaseLg className="text-8xl text-[#7B66FF]" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0B2B82]">1000</h1>
          <p className="text-lg text-[#3D589B]">Live Job</p>
        </div>
      </div>
      <div className="flex h-[230px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-4">
        <div className="grid h-[100px] w-[100px] place-items-center">
          <BsBuilding className="text-8xl text-[#7B66FF]" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0B2B82]">200+</h1>
          <p className="text-lg text-[#3D589B]">Companies</p>
        </div>
      </div>
      <div className="flex h-[230px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-4">
        <div className="grid h-[100px] w-[100px] place-items-center">
          <GoPeople className="text-8xl text-[#7B66FF]" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0B2B82]">5000+</h1>
          <p className="text-lg text-[#3D589B]">Candidates</p>
        </div>
      </div>
      <div className="flex h-[230px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-4">
        <div className="grid h-[100px] w-[100px] place-items-center">
          <BsSuitcaseLg className="text-8xl text-[#7B66FF]" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0B2B82]">1000</h1>
          <p className="text-lg text-[#3D589B]">Live Job</p>
        </div>
      </div>
    </div>
  );
};

export default Explore;

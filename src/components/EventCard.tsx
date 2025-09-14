interface EventCardProps {
  id: string;
  title: string;
  location: string;
  catagory: string;
  image: string;
}

export default function EventCard({ title, location, image }: EventCardProps) {
  function handleEventClick() {
    console.log("heillp");
  }

  return (
    <div
      onClick={handleEventClick}
      className=" p-2.5  rounded-lg  transition duration-300 cursor-pointer "
    >
      <img className="w-[200px]" src={image} alt="" />
      <p className="w-32 font-semibold text-[15px]">{title}</p>
      <p className="font-light w-37 text-[12px]">{location}</p>
    </div>
  );
}

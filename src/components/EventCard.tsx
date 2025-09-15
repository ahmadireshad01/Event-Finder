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
      className="rounded-lg p-5  transition duration-300 cursor-pointer "
    >
      <img className="w-[200px]" src={image} alt="" />
      <p className="w-32 font-bold text-[14px]">{title}</p>
      <p className="font-semibold w-37 text-[13px]">{location}</p>
    </div>
  );
}

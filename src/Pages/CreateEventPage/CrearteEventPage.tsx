import React, { useState } from "react";
import ProductsNav from "../../components/ProductsNav"
import { eventData } from "../../data/event-data";

export default function CreateEventPage() {

    interface FormData {
        eventTitle: string;
        description: string;
        category: string;
        date: string;
        time: string;
        location: string;
        organizerName: string;
        contactInfo: string;
        file: File | null;
    }
    const [isLineUpOpen, setIsLineUpOpen] = useState(false)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [catagory, setCatagory] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [details, setdetails] = useState("")
    const [lineUpTitle, setLineUpTitle] = useState("")
    const [lineUpTime, setLineUpTime] = useState("")
    const [lineUpFile, setLineUpFile] = useState<File | null>(null);
    const [lineUpPreview, setLineUpPreview] = useState<string | null>(null);

    const handleFileChange = (e:any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); // creates a preview link
        }
    };

    const handleLineUpFileChange = (e:any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setLineUpFile(selectedFile);
            setLineUpPreview(URL.createObjectURL(selectedFile)); // creates a preview link
        }
    };
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        interface newEvent {
            id: string;
            catagory: string;
            title: string;
            description: string;
            date: Date;
            location: string;
            organizationName: string;
            details: string;
            Image: string;
            locationImage: string;
            lineUp: {
                id: `${string}-${string}-${string}-${string}-${string}`;
                title: string;
                time: string;
                img: string;
            };
        }

        const newEvent = {
            id:(eventData.length+1).toString(),
            catagory: catagory,
            title: title,
            description: description,
            date: new Date(date),
            time: time,
            location: location,
            organizationName: organizationName,
            details: details,
            image: file,
            locationImage: "/images/singleProductImg/locationImage.svg",
            lineUp:
                [{
                    id: crypto.randomUUID(),
                    title: lineUpTitle,
                    time: lineUpTime,
                    img: lineUpFile
                }]
            
        }

        eventData.push(newEvent);
        console.log(newEvent)

            setTitle("");
            setDescription("");
            setCatagory("");
            setDate("");
            setTime("");
            setLocation("");
            setOrganizationName("");
            setContactInfo("")
    }
    
    return(
    <>
        <ProductsNav />
        <div className=" text-white min-h-screen flex justify-center pt-34 py-10  max-md:pl-10 max-sm:pl-0 ">
            <div className="w-full max-w-2xl space-y-6 px-10 ">

                <h1 className="text-3xl font-semibold mb-6">Create Event</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                {/* Event Title */}
                <div>
                    <label className="block mb-1 font-medium">Event Title</label>
                    <input
                    type="text"
                    placeholder="Enter event title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-24 bg-gray-700 border border-gray-700  rounded-md p-2 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Details</label>
                    <textarea
                    placeholder="Enter details"
                    onChange={(e) => setdetails(e.target.value)}
                    className="w-full h-24 bg-gray-700 border border-gray-700  rounded-md p-2 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <input
                    type="text"
                    placeholder="Select category"
                    onChange={(e) => setCatagory(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-700  rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block mb-1 font-medium">Date</label>
                    <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-700  rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Time */}
                <div>
                    <label className="block mb-1 font-medium">Time</label>
                    <input
                    type="text"
                    placeholder="HH:MM AM/PM"
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-700  rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block mb-1 font-medium">Location</label>
                    <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter location or address"
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-700  rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="bg-gray-700 border border-gray-700 hover:  text-white px-4 py-2 rounded-md text-sm"
                    >
                        Use Map
                    </button>
                    </div>
                </div>

                {/* Organizer Name */}
                <div>
                    <label className="block mb-1 font-medium">Organizer Name</label>
                    <input
                    type="text"
                    placeholder="Enter organizer name"
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Contact Information */}
                <div>
                    <label className="block mb-1 font-medium">Contact Information</label>
                    <input
                    type="text"
                    placeholder="Email or phone number"
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="h-fit">
                    <label className="block mb-1 font-medium">Line Up Info</label>
                    
                    <div className="flex-col gap-2 flex pt-2">
                        <input onChange={(e) => setLineUpTitle(e.target.value)} type="text" placeholder="Line Up Titel" className="w-full bg-gray-700 border border-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input onChange={(e) => setLineUpTime(e.target.value)} type="text" placeholder="Time" className="w-full bg-gray-700 border border-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <label className="block mb-1 font-medium">Choose Line Up Image</label>
                        <input onChange={handleLineUpFileChange} type="file" placeholder="Line Up Titel" className="w-full bg-gray-700 border border-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>

                {/* File Upload */}
                <div className="border border-dashed border-gray-600 bg-[#1e1f24] rounded-md p-6 text-center hover:border-blue-500 cursor-pointer">
                    <p className="text-sm font-semibold text-white mb-1">Upload Event Image or Flyer</p>
                    <p className="text-xs text-gray-400 mb-3">Drag and drop or browse to upload</p>
                    <input 
                    type="file"
                    onChange={handleFileChange}
                     className="pl-27"  />{preview && (
                <img src={preview} alt="Preview" style={{ width: 200, height: 'auto' }} />
            )}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition duration-200"
                    >
                    Submit
                    </button>
                </div>
                </form>

            </div>
    </div>
        
    </>
)
}
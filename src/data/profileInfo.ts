
export let profileInfo  = {
    name: "Sophia Carter",
    description: "Event enthusiast and explorer",
    image: "./public/images/navimg/profilePic.svg"
}

export function setProfileInfo(newInfo:any) {
  profileInfo = newInfo;
}
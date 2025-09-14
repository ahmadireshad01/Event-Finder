export default function () {
  return (
    <div>
      <div className="flex flex-row justify-around mt-20 w-full mb-5 text-gray-400 max-md:flex-col max-md:items-center">
        <p>About</p>
        <div className="flex flex-col items-center">
          <p>Privecy Policy</p>
          <div className="flex gap-4 mt-4 mb-5">
            <img src="/images/footerImg/facebookIcon.svg" />
            <img src="/images/footerImg/instagramIcon.svg" />
            <img src="/images/footerImg/twitterIcon.svg" />
          </div>
          <p>© 2024 LocalEventFinder. All rights reserved.</p>
        </div>
        <p>Terms of Use</p>
      </div>
      ;
    </div>
  );
}

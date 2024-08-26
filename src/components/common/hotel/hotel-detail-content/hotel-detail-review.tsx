import { avatar1,avatar2,avatar3,avatar4,avatar5 } from "@/assets/images";
import { IconFlag } from "@/common/icons";
import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";

const reviews = [
  { name: 'Omar Siphron', rating: '5.0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', avatar: avatar1 },
  { name: 'Cristofer Ekstrom Bothman', rating: '5.0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', avatar: avatar2 },
  { name: 'Kaiya Lubin', rating: '5.0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', avatar: avatar3 },
  { name: 'Erin Septimus', rating: '5.0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', avatar: avatar4 },
  { name: 'Terry George', rating: '5.0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', avatar:avatar5 },
  { name: 'Kaiya Lubin', rating: '5.0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', avatar: avatar2 },
  { name: 'Erin Septimus', rating: '5.0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', avatar: avatar1 },
  { name: 'Terry George', rating: '5.0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', avatar: avatar2 },
];

const reviewsPerPage = 5; 

export default function HotelDetailReview() {
  
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const handleClick = (pageNumber: SetStateAction<number>) => {
      setCurrentPage(pageNumber);
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * reviewsPerPage;
        return reviews.slice(startIndex, startIndex + reviewsPerPage);
    };
    
  return (
    <div className="flex w-full mt-5">
      <div className="w-full ">
        <div>
          <hr className="my-8 border-2 border-gray " />
        </div>
        <div className="flex items-center justify-between ">
          <h1 className="mb-2 text-2xl font-semibold">Review</h1>
          <Button className="px-4 py-2 text-black rounded-md w-[10rem] h-[3rem]">Give your review</Button>
        </div>
        <div className="relative flex text-black w-[14rem] ">
          <p className="absolute left-0 text-5xl font-semibold">4.2</p>
          <div className="absolute right-0">
            <p>Very good</p>
            <p>371 verified reviews</p>
          </div>
        </div>
        <div className="w-full py-2">
        <ul className="py-6 mx-auto mt-10 space-y-4 ">
          {getPaginatedData().map((review, index) => (
            <li key={index} className="p-4 bg-white rounded shadow ">
              <div className="relative flex items-center space-x-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 mr-2 rounded-full" />
                <div>
                  <p className="font-bold">{review.rating} Amazing | {review.name}</p>
                  <p className="text-gray-700 w-[85%]">{review.text}</p>
                </div>
                <div className="absolute top-2 right-2">
                  <IconFlag/>
                </div>
              </div>
            </li>
            ))}
            </ul>
            <div className="flex items-center justify-center mt-6 gap-x-[4rem]">
                <Button
                    className="px-3 py-1 bg-gray-300 rounded"
                    disabled={currentPage === 1}
                    onClick={() => handleClick(currentPage - 1)}
                >
                    &lt;
                </Button>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <Button
                    className="px-3 py-1 bg-gray-300 rounded"
                    disabled={currentPage === totalPages}
                    onClick={() => handleClick(currentPage + 1)}
                >
                    &gt;
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

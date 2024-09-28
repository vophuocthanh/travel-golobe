import { IconFlight } from "@/common/icons";


export default function Vehicle() {
    return (
        <div className='mt-16 '>
            <h2 className='mb-8 text-3xl font-semibold text-center'>LỊCH KHỞI HÀNH </h2>
            <div className='px-5 py-10 rounded-md shadow-2xl'>
                <div className=''> 
                    <h2 className='text-2xl font-medium text-center text-sky-500'>PHƯƠNG TIỆN DI CHUYỂN</h2>
                    <div className='flex justify-between gap-20 py-4'>
                        <div className="w-full">
                            <div className="flex-col items-center justify-center gap-[1rem] w-full">
                                <div className="flex justify-between py-2">
                                    <div className="flex ">
                                        <h4 className="text-lg font-medium">Ngày đi -</h4>
                                        <p className="flex items-center text-center"> 02/10/2024</p>
                                    </div>
                                    <div className="flex">
                                        <IconFlight />
                                        <h3 className="text-lg font-medium text-sky-500">VN601</h3>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full py-2">
                                    <p className="text-lg font-medium">08:45</p>
                                    <p className="text-lg font-medium">10:20</p>
                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <div className=" row--transport"></div>
                                </div>
                                <div className="relative flex flex-row justify-between w-full py-2">
                                    <p className="text-lg font-medium">SGN</p>
                                    <div>
                                        <img alt="Vietnam Airlines" loading="lazy" decoding="async" data-nimg="1" src="https://media.travel.com.vn/ImageAirlines/logo_VietNamAir.jpg" />                                      
                                    </div>
                                    <p className="text-lg font-medium">SGN</p>
                                </div>

                            </div>
                            
                        </div>
                        <div className="w-full">
                            <div className="flex-col items-center justify-center gap-[1rem] w-full">
                                <div className="flex justify-between py-2">
                                    <div className="flex ">
                                        <h4 className="text-lg font-medium">Ngày đi -</h4>
                                        <p className="flex items-center text-center"> 02/10/2024</p>
                                    </div>
                                    <div className="flex">
                                        <IconFlight />
                                        <h3 className="text-lg font-medium text-sky-500">VN601</h3>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full py-2">
                                    <p className="text-lg font-medium">08:45</p>
                                    <p className="text-lg font-medium">10:20</p>
                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <div className=" row--transport"></div>
                                </div>
                                <div className="relative flex flex-row justify-between w-full py-2">
                                    <p className="text-lg font-medium">SGN</p>
                                    <div>
                                        <img alt="Vietnam Airlines" loading="lazy" decoding="async" data-nimg="1" src="https://media.travel.com.vn/ImageAirlines/logo_VietNamAir.jpg" />                                      
                                    </div>
                                    <p className="text-lg font-medium">SGN</p>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='py-8 text-2xl font-medium text-center border-t-2 text-sky-500 '>GIÁ TOUR</h2>
                    <div className='flex justify-between gap-20 py-4'>
                        <div className="w-full">
                            <div className="flex-col items-center justify-center gap-[1rem] w-full">
                                <div className="flex justify-between py-2">
                                    <div className="">
                                        <h4 className="text-lg font-medium">Người lớn</h4>
                                        <p className="flex items-center text-center"> (Từ 12 tuổi trở lên)</p>
                                    </div>
                                    <div className="flex">
                                        <h3 className="text-lg font-medium text-red-600">8,490,000 đ</h3>
                                    </div>
                                </div>
                                <div className="flex justify-between py-2">
                                    <div className="">
                                        <h4 className="text-lg font-medium">Trẻ em</h4>
                                        <p className="flex items-center text-center"> (Từ 12 tuổi trở lên)</p>
                                    </div>
                                    <div className="flex">
                                        <h3 className="text-lg font-medium text-red-600">8,490,000 đ</h3>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                        <div className="w-full">
                        <div className="flex-col items-center justify-center gap-[1rem] w-full">
                                <div className="flex justify-between py-2">
                                    <div className="">
                                        <h4 className="text-lg font-medium">Em bé</h4>
                                        <p className="flex items-center text-center"> (Từ 12 tuổi trở lên)</p>
                                    </div>
                                    <div className="flex">
                                        <h3 className="text-lg font-medium text-red-600">8,490,000 đ</h3>
                                    </div>
                                </div>
                                <div className="flex justify-between py-2">
                                    <div className="">
                                        <h4 className="text-lg font-medium">Phụ thu phòng đơn</h4>
                                        <p className="flex items-center text-center"> (Từ 12 tuổi trở lên)</p>
                                    </div>
                                    <div className="flex">
                                        <h3 className="text-lg font-medium text-red-600">8,490,000 đ</h3>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>                                    
            </div>

        </div>
    )
}

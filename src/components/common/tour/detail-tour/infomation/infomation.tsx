import { IconCuisine, IconEndow, IconIdealTime, IconSightseeing, IconSuitable, IconVehicle } from "@/common/icons"


export default function Information() {
    const data = [
        {
            id: 1,
            icon: <IconSightseeing />,
            title: "Điểm tham quan",
            text: "Bangkok, Pattaya"
        },
        {
            id: 2,
            icon: <IconCuisine />,
            title: "Ẩm thực",
            text: "Buffet sáng, Theo thực đơn, Đặc sản địa phương"
        },
        {
            id: 3,
            icon: <IconSuitable />,
            title: "Đối tượng thích hợp",
            text: "Cặp đôi, Gia đình nhiều thế hệ, Thanh niên"
        },
        {
            id: 4,
            icon:<IconIdealTime />,
            title: "Thời gian lý tưởng",
            text: "Quanh năm"
        },
        {
            id: 5,
            icon: <IconVehicle />,
            title: "Phương tiện",
            text: "Máy bay"
        },
        {
            id: 6,
            icon:<IconEndow />,
            title: "Ưu đãi",
            text: "Đã bao gồm ưu đãi trong giá tour"
        }
    ]
    return (
        <div className='mt-16 '>
            <h2 className='mb-8 text-3xl font-semibold text-center'>THÔNG TIN THÊM VỀ CHUYẾN ĐI </h2>
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
                {
                    data.map((item) => (
                        <div key={item.id} >
                            <div className="iconTour">{item.icon}</div>
                            <h3 className="py-3 text-xl font-medium">{item.title}</h3>
                            <p className="text-xs">{item.text}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

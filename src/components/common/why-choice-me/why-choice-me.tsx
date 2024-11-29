import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function WhyChoiceMe() {
  return (
    <SectionInViewUp>
      <div className="flex flex-col mx-auto mb-64 space-y-4 max-w-7xl">
        <h1 className="text-4xl font-medium">
          Khám phá thế giới dễ dàng hơn với <span className="text-primary">Travel Golobe</span>
        </h1>
        <p className="text-xl">
          Website du lịch của chúng tôi cung cấp giải pháp toàn diện cho hành trình của bạn: đặt vé máy bay, đặt xe
          khách, và đặt phòng khách sạn chỉ trong vài thao tác đơn giản. Với giao diện thân thiện, giá cả cạnh tranh, và
          hỗ trợ 24/7, chúng tôi đảm bảo mang đến trải nghiệm đặt dịch vụ nhanh chóng, an toàn, và tiện lợi.
        </p>
        <h2 className="text-4xl font-semibold text-center">
          Tại sao chọn <span className="font-medium text-primary">Travel Golobe</span>
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">Tiện lợi?</AccordionTrigger>
            <AccordionContent className="text-lg">Tích hợp mọi dịch vụ du lịch trên một nền tảng.</AccordionContent>
            <AccordionContent className="text-lg">
              Đặt vé máy bay với hàng trăm hãng hàng không, so sánh giá nhanh chóng.
            </AccordionContent>
            <AccordionContent className="text-lg">
              Đặt xe khách từ các nhà xe chất lượng cao, giờ chạy linh hoạt.
            </AccordionContent>
            <AccordionContent className="text-lg">
              Tìm kiếm và đặt phòng khách sạn đa dạng từ bình dân đến cao cấp.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">An toàn và đáng tin cậy?</AccordionTrigger>
            <AccordionContent className="text-lg">Bảo mật thông tin khách hàng tuyệt đối.</AccordionContent>
            <AccordionContent className="text-lg">
              Hợp tác với các đối tác uy tín trong ngành du lịch và vận tải.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl">Hỗ trợ tận tâm?</AccordionTrigger>
            <AccordionContent className="text-lg">
              Đội ngũ luôn sẵn sàng giúp bạn giải đáp mọi thắc mắc.
            </AccordionContent>
            <AccordionContent className="text-lg">
              Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ bất kỳ lúc nào.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl">Giá cả minh bạch, ưu đãi hấp dẫn</AccordionTrigger>
            <AccordionContent className="text-lg">Cam kết giá tốt nhất, không phí ẩn.</AccordionContent>
            <AccordionContent className="text-lg">
              Cập nhật các chương trình khuyến mãi và voucher thường xuyên.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <h1 className="text-4xl font-medium">Hành trình dễ dàng hơn bao giờ hết</h1>
        <p>
          Hãy để <span className="text-primary">Travel Golobe</span> đồng hành cùng bạn, từ lúc lên kế hoạch cho chuyến
          đi cho đến khi tận hưởng từng khoảnh khắc đáng nhớ!.{' '}
          <span className="font-medium">Bắt đầu hành trình của bạn ngay hôm nay!</span>
        </p>
      </div>
    </SectionInViewUp>
  )
}

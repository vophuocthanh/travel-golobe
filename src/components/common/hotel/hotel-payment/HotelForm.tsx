import { IconAp, IconFb, IconGg, IconMail } from "@/common/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HotelForm() {
  return (
        <div className="mt-2">
            <h3 className="mb-4 text-2xl font-semibold">Login or Sign up to book</h3>
            <div className="space-y-4">
              <div >
                <Input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border rounded-lg focus:outline-none"
                />
                <p className="py-4 text-sm text-gray-500">We’ll call or text you to confirm your number. Standard message and data rates apply. Privacy Policy</p>
                <Button className="w-full">Continue</Button>
              </div>
              <div className="flex items-center text-center text-gray-500 ">
                <hr className="w-full border-1 border-gray" />
                <p className='w-[5rem]'>Or</p>
                <hr className="w-full border-1 border-gray" />
              </div>
              <div className="justify-center">
                <div className="grid grid-cols-3 gap-6">
                  <div className="w-full col-span-1 p-4 mt-6 border rounded-lg shadow-md h-[4rem] border-primary cursor-pointer flex items-center justify-center">
                    <IconFb/>
                  </div>
                  <div className="w-full col-span-1 p-4 mt-6 border rounded-lg shadow-md  h-[4rem] border-primary cursor-pointer flex items-center justify-center">
                    <IconGg/>
                  </div>
                  <div className="w-full col-span-1 p-4 mt-6 border rounded-lg shadow-md h-[4rem] border-primary cursor-pointer flex items-center justify-center">
                    <IconAp/>
                  </div>
                </div>
                <div className="w-full col-span-1 p-6 mt-6 border rounded-lg shadow-md h-[4rem] border-primary cursor-pointer flex items-center justify-center">
                  <IconMail/>
                  <p className="ml-4">Continue with email</p>
                </div>
              </div>
            </div>
          </div> 
  )
}

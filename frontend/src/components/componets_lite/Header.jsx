import React from 'react'
import { Button } from '../ui/button'
import { SearchIcon } from 'lucide-react'
import { HiOutlineOfficeBuilding } from "react-icons/hi";

function Header() {
    return (
        <div>
            <div className="text-center">
                <div className="flex flex-col gap-5 my-10">
                    <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-red-500 font-medium"><span className="text-[#614232]"><HiOutlineOfficeBuilding /></span>No.1 Job Hunt Platform</span>
                    <h2 className="text-3xl font-bold ">
                        Search Apply & <br />
                        Get Your <span className="text-[#6B3AC2]"> Dream Job</span>
                    </h2>
                    <p>
                        Start your hunt for the best, life-changing career opportunities from here your <br />
                        selected area conveniently and get hired quickly.
                    </p>
                    <div className="flex w-[40%] items-center  gap-4 shadow-lg border border-gray-300 rounded-full pl-3 mx-auto">
                        < input type="text" placeholder="Find you dream jobs" className="outline-none border-none w-full" />
                        <Button className="rounded-r-full">
                            <SearchIcon className="w-5 h-5" />

                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header

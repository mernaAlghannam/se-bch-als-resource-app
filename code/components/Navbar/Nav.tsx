import React from 'react'

const Nav = () => {
    return (
      <div className="flex min-h-screen flex-col">
            <div className="mb-2 md:border-b py-2">
                <div className="container mx-auto">
                    <div className="flex justify-between gap-2">
                      <img
                        className="w-32 ml-4"
                        src="../Boston_Children's_Hospital_logo..png"
                        alt="Logo"
                      />
                      <div className="flex items-center gap-1 rounded-sm px-2 py-1 mt-2">
                          <div className="space-y-2">
                            <div className="w-8 h-1 bg-[#254885]"></div>
                            <div className="w-8 h-1 bg-[#254885]"></div>
                            <div className="w-8 h-1 bg-[#254885]"></div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
            <div className="bg-white"></div>
        </div>
  )
  
}

export default Nav
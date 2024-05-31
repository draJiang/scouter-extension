import React, { useEffect, useState, ReactNode } from "react";
import "../index.css"

type StepType = {
    title: string,
    children: ReactNode;
}

export const Layout: React.FC<StepType> = ({ title, children }) => {
    return (
        <>
            <div className="relative">
                {/* Illustration behind hero content */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
                    <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                                <stop stopColor="#FFF" offset="0%" />
                                <stop stopColor="#EAEAEA" offset="77.402%" />
                                <stop stopColor="#DFDFDF" offset="100%" />
                            </linearGradient>
                        </defs>
                        <g fill="url(#illustration-01)" fillRule="evenodd">
                            <circle cx="1232" cy="128" r="128" />
                            <circle cx="155" cy="443" r="64" />
                        </g>
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    {/* Hero content */}
                    <div className="flex flex-col items-center pt-14 pb-8 md:pt-22 md:pb-10">

                        {/* Section header */}
                        <div className="text-center pb-10 md:pb-12">
                            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out"><span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-500">{title}</span></h1>
                            {/* <div className="max-w-3xl mx-auto">
                                <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">{title}</p>
                            </div> */}
                        </div>
                        <div className="w-10/12">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
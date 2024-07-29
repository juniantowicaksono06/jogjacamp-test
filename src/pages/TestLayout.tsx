import { useEffect, useState } from "react"
import { useRef } from "react";
export default function TestLayout() {
    const [currentIndex, setcurrentIndex] = useState(0);
    const [images] = useState([
        '/images/1.webp', '/images/2.webp', '/images/3.webp',
    ]);
    const containerRef = useRef<HTMLDivElement>(null);
    function resizeContainer() {
        const interval = setInterval(() => {
            if (containerRef.current) {
                const imgHeight = containerRef.current?.querySelector('img')?.clientHeight;
                containerRef.current.style.height = `${imgHeight}px`;
                if(imgHeight != 0 || imgHeight != undefined) {
                    clearInterval(interval);
                }
            }
        }, 200);
    }
    useEffect(() => {
        resizeContainer();
        window.addEventListener('resize', () => {
            resizeContainer();
        })
    }, [])
    return <>
        <section>
            <div className="w-full relative" ref={containerRef}>
                <div className="flex">
                    {images.map((image, index) => <img key={index} src={image} className={`absolute inset-0 object-contain w-full transition-opacity duration-500 rounded-xl ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`} />)}
                </div>
                <div className="absolute rounded-full top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 xl:text-8xl sm:text-6xl text-3xl">
                    <h1 className="text-white mb-0 text-opacity-70">Frontend</h1>
                    <h1 className="text-white mt-0 relative">
                    <div className="styled-hr-container">
                        <hr className="styled-hr" />
                    </div>Mockup</h1>
                </div>
                <button className="absolute left-5 rounded-full top-1/2 -mt-4 bg-black bg-opacity-50 p-2.5" onClick={() => {
                    setcurrentIndex((currentIndex - 1 + images.length) % images.length)
                }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 24L12 16L20 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg> 
                </button>
                <button className="absolute right-5 rounded-full top-1/2 -mt-4 bg-black bg-opacity-50 p-2.5" onClick={() => {
                    setcurrentIndex((currentIndex + 1) % images.length)
                }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 24L20 16L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 mt-3">
                <div className="bg-gray-100 px-3 py-2 rounded-xl">
                    <h1 className="font-bold text-2xl">Frontend</h1>
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="mt-3">Last updated 5 mins ago</p>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-xl">
                    <h1 className="font-bold text-2xl">Mockup</h1>
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="mt-3">Last updated 5 mins ago</p>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-xl">
                    <h1 className="font-bold text-2xl">Design</h1>
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="mt-3">Last updated 5 mins ago</p>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-xl">
                    <h1 className="font-bold text-2xl">Test</h1>
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="mt-3">Last updated 5 mins ago</p>
                </div>
            </div>
        </section>
    </>
}
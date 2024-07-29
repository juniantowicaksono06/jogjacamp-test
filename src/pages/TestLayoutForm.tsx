import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaSolid from '@fortawesome/free-solid-svg-icons';

export default function TestLayoutForm() {
    return <>
        <section>
            <div className="flex md:justify-between items-center space-x-4 p-4">
                {/* Tambah Button */}
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm md:text-lg">
                    <span className="mr-2 md:mr-3">
                        <FontAwesomeIcon icon={FaSolid.faPlus} />
                    </span>
                    Tambah</button>
                <div className="flex justify-evenly md:justify-normal space-x-4 flex-grow md:flex-none">                        
                    {/* Import Button */}
                    <button className="bg-gray-200 text-black px-4 py-2 rounded-lg text-sm md:text-lg">
                        <span className="mr-2 md:mr-3">
                            <FontAwesomeIcon icon={FaSolid.faDownload} />
                        </span>
                        Import</button>

                    {/* Export Button */}
                    <button className="bg-gray-200 text-black px-4 py-2 rounded-lg text-sm md:text-lg">
                        <span className="mr-2 md:mr-3">
                            <FontAwesomeIcon icon={FaSolid.faUpload} />
                        </span>
                        Export</button>
                </div>
                <div className="flex-grow space-x-4 hidden lg:flex">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 px-4 py-2 rounded-lg flex-grow"
                    />

                    {/* Year Dropdown */}
                    <select className="border border-gray-300 px-4 py-2 rounded-lg flex-grow" defaultValue={2020}>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
            </div>
            <div className="lg:hidden flex flex-col md:space-x-4 md:flex-row px-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 px-4 py-2 rounded-lg flex-grow md:mb-0 mb-2"
                    />

                    {/* Year Dropdown */}
                    <select className="border border-gray-300 px-4 py-2 rounded-lg flex-grow" defaultValue={2020}>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
            </div>
        </section>
    </>
}
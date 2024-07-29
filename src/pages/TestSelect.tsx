import { useState, useEffect } from "react";
import Loading from "../components/Loading";

interface IProvinceType {
    id: number;
    name: string;
}

interface IKotaType {
    id: number;
    name: string;
}

interface IKecamatanType {
    id: number;
    name: string;
}

interface IDesaType {
    id: number;
    name: string;
}

export default function TestSelect() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataProvince, setDataProvince] = useState<IProvinceType[]>([]);
    const [dataKota, setDataKota] = useState<IKotaType[]>([]);
    const [dataKecamatan, setDataKecamatan] = useState<IKecamatanType[]>([]);
    const [dataDesa, setDataDesa] = useState<IDesaType[]>([]);
    const [idProvince, setIdProvince] = useState(0);
    const [idKota, setIdKota] = useState(0);
    const [idKecamatan, setIdKecamatan] = useState(0);
    const [idDesa, setIdDesa] = useState(0);
    async function getProvinsi(allowSetId = false) {
        setIsLoading(true)
        const response = await fetch("http://apikab.jcamp.pt/public/api/v1/reference/provinces");
        if(response.ok) {
            const data = await response.json() as IProvinceType[];
            setDataProvince([
                ...data
            ]);
            if(data.length > 0) {
                if(allowSetId) {
                    setIdProvince(data[0].id);
                    getKota(data[0].id, allowSetId);
                }
                else {
                    setIdProvince(parseInt(localStorage.getItem('idProvince') as string) || data[0].id);
                    getKota(parseInt(localStorage.getItem('idProvince') as string) || data[0].id);
                }
            }
            setIsLoading(false);
            
        }
    }
    async function getKota(id: number = 0, allowSetId = false) {
        id = id || idProvince;
        setIsLoading(true);
        const response = await fetch(`http://apikab.jcamp.pt/public/api/v1/reference/regencies_of/${id}`);
        if(response.ok) {
            const data = await response.json() as IKotaType[];
            setDataKota([
                ...data
            ]);
            if(data.length > 0) {
                if(allowSetId) {
                    setIdKota(data[0].id);
                    localStorage.setItem('idKota', data[0].id.toString());
                    getKecamatan(data[0].id, allowSetId);
                }
                else {
                    setIdKota(parseInt(localStorage.getItem('idKota') as string) || data[0].id);
                    getKecamatan(parseInt(localStorage.getItem('idKota') as string) || data[0].id);
                }
            }
            setIsLoading(false);
        }
    }
    async function getKecamatan(id: number = 0, allowSetId = false) {
        id = id || idKota;
        setIsLoading(true);
        const response = await fetch(`http://apikab.jcamp.pt/public/api/v1/reference/districts_of/${id}`);
        if(response.ok) {
            const data = await response.json() as IKecamatanType[];
            setDataKecamatan([
                ...data
            ]);
            if(data.length > 0) {
                if(allowSetId) {
                    setIdKecamatan(data[0].id);
                    localStorage.setItem('idKecamatan', data[0].id.toString());
                    getDesa(data[0].id, allowSetId);
                }
                else {
                    setIdKecamatan(parseInt(localStorage.getItem('idKecamatan') as string) || data[0].id);
                    getDesa(parseInt(localStorage.getItem('idKecamatan') as string) || data[0].id);
                }
            }
            setIsLoading(false);
        }
    }
    async function getDesa(id: number = 0, allowSetId = false) {
        id = id || idDesa;
        setIsLoading(true);
        const response = await fetch(`http://apikab.jcamp.pt/public/api/v1/reference/villages_of/${id}`);
        if(response.ok) {
            const data = await response.json() as IDesaType[];
            setDataDesa([
                ...data
            ]);
            if(data.length > 0) {
                // setIdDesa(data[0].id);
                if(allowSetId) {
                    setIdDesa(data[0].id);
                    localStorage.setItem('idDesa', data[0].id.toString());
                }
                else {
                    const idDesa = parseInt(localStorage.getItem('idDesa') as string);
                    let exists = false;
                    data.some((data) => {
                        if(data.id === idDesa) {
                            exists = true;
                            return true;
                        }
                    });
                    if(!exists) {
                        setIdDesa(data[0].id);
                    }
                    else {
                        setIdDesa(parseInt(localStorage.getItem('idDesa') as string) || data[0].id);
                    }
                }
            }
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getProvinsi(false);
    }, []);

    return <>
        <Loading isLoading={isLoading} />
        <div className="grid grid-cols-3 gap-3">
            <div className="px-3 py-2 col-span-3 md:col-span-1 bg-gray-200 rounded-lg h-96">
                <h3 className="mb-3 text-2xl">Filter</h3>
                <div className="mb-3">                    
                    <label htmlFor="provinsi">Provinsi</label>
                    <select className="border w-full border-gray-300 px-4 py-2 rounded-lg flex-grow" value={idProvince} onChange={(e) => {
                        setIdProvince(parseInt(e.target.value));
                        localStorage.setItem("idProvince", e.target.value);
                        getKota(parseInt(e.target.value), true);
                    }}>
                        {
                            dataProvince.map((province, index) => <option key={index} value={province.id}>{province.name}</option>)
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="kota">Kota</label>
                    <select className="border w-full border-gray-300 px-4 py-2 rounded-lg flex-grow" value={idKota} onChange={(e) => {
                        setIdKota(parseInt(e.target.value));
                        localStorage.setItem("idKota", e.target.value);
                        getKecamatan(parseInt(e.target.value), true);
                    }}>
                        {
                            dataKota.map((kota, index) => <option key={index} value={kota.id}>{kota.name}</option>)
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="kecamatan">Kecamatan</label>
                    <select className="border w-full border-gray-300 px-4 py-2 rounded-lg flex-grow" value={idKecamatan} onChange={(e) => {
                        setIdKecamatan(parseInt(e.target.value));
                        localStorage.setItem("idKecamatan", e.target.value);
                        getDesa(parseInt(e.target.value));
                    }}>
                        {
                            dataKecamatan.map((kecamatan, index) => <option key={index} value={kecamatan.id}>{kecamatan.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="desa">Desa</label>
                    <select className="border w-full border-gray-300 px-4 py-2 rounded-lg flex-grow" value={idDesa} onChange={(e) => {
                        setIdDesa(parseInt(e.target.value));
                        localStorage.setItem("idDesa", e.target.value);
                    }}>
                        {
                            dataDesa.map((desa, index) => <option key={index} value={desa.id}>{desa.name}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="px-3 py-2 col-span-3 md:col-span-2">
                <div className="border border-gray-300 rounded-lg py-2 px-3 mb-2">
                    <h3 className="text-2xl font-bold">{
                        dataProvince.find((province) => province.id === idProvince)?.name    
                    }</h3>
                    <p className="mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="mt-3">Last updated 5 mins ago</p>
                </div>
                <div className="border border-gray-300 rounded-lg py-2 px-3 mb-2">
                    <h3 className="text-2xl font-bold">{
                        dataKota.find((kota) => kota.id === idKota)?.name    
                    }</h3>
                    <p className="mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="mt-3">Last updated 5 mins ago</p>
                </div>
                <div className="border border-gray-300 rounded-lg py-2 px-3 mb-2">
                    <h3 className="text-2xl font-bold">{
                        dataKecamatan.find((kecamatan) => kecamatan.id === idKecamatan)?.name    
                    }</h3>
                    <p className="mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="mt-3">Last updated 5 mins ago</p>
                </div>
                <div className="border border-gray-300 rounded-lg py-2 px-3 mb-2">
                    <h3 className="text-2xl font-bold">{
                        dataDesa.find((desa) => desa.id === idDesa)?.name    
                    }</h3>
                    <p className="mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="mt-3">Last updated 5 mins ago</p>
                </div>
            </div>
        </div>
    </>
}
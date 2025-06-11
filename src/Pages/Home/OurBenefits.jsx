import axios from "axios";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const OurBenefits = () => {
    let [benefits, setBenefits] = useState([]);
    useEffect(() => {
        axios.get('OurBenefits.json')
            .then(res => {
                setBenefits(res.data)
            })
    }, [])
    return (
        <div className="px-2 lg:px-0">
            <h1 className="lg:text-6xl text-4xl text-center my-4 lg:my-20  font-semibold border-b-4 p-10 border-green-600">Our Benefits</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {
                    benefits.map(benefit => <div className=" border-2 rounded-lg shadow-lg border-orange-600 ">
                        <div className="card-body">
                            <span className="badge badge-xs badge-warning">{benefit.tag}</span>
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold">{benefit.title}</h2>
                            </div>
                            <ul className="mt-6 flex flex-col gap-2 text-xs">
                               
                                    {
                                        benefit.benefits.map(ourBenefit => <li className="flex text-xl items-center gap-2"> <IoCheckmarkCircleSharp className="text-green-600" />
                                            {ourBenefit.text}</li>)
                                    }
                             
                            </ul>
                            <div className="mt-6">
                                <button className="btn btn-primary btn-block">Subscribe</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default OurBenefits;
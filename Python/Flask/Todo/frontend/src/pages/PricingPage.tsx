import {BsCheck} from "react-icons/bs";

const pricingOptions = [
    {
        title: "Starter",
        price: "Free",
        tags: [
            "2 Users", "10 GB Storage", "100GB of Bandwidth", "200 monthly emails"
        ]
    },
    {
        title: "Pro",
        price: "$30/month",
        tags: [
            "5 Users", "50 GB Storage", "1000GB of Bandwidth", "2000 monthly emails"
        ]
    },
    {
        title: "Legend",
        price: "$70/month",
        tags: [
            "Infinite Users", "200 GB Storage", "Infinite Bandwidth", "Infinite monthly emails"
        ]
    },
]

export default function PricingPage() {
    return <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 flex flex-col">

        <h2 className="relative group text-6xl pt-10 pb-6 mb-12 text-center font-bold self-center">Explore our prices
            <span
                className="absolute bg-amber-500 h-1 bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full duration-400"/>
        </h2>

        <div className="flex flex-row gap-4 items-center">
            {pricingOptions.map((option, index) =>
                (<div
                    className="flex-1 border border-amber-400 py-8 px-6 flex flex-col items-center bg-amber-50 rounded-2xl"
                    key={index}>
                    <h3 className="text-4xl font-semibold mb-2">{option.title}</h3>
                    <span
                        className="px-5 py-1 text-amber-900 self-end text-base mr-12 border border-amber-500 rounded-full">{option.price}</span>

                    <div className="w-full h-[1px] bg-amber-500 my-8"/>

                    <div className="flex flex-col items-start justify-center w-full gap-2">
                        {option.tags.map((tag, index) =>
                            <div className="flex items-center" key={index}>
                                <BsCheck size={30} className="text-amber-800"/>
                                <span className="text-md">{tag}</span>
                            </div>)}
                    </div>


                </div>))}
        </div>
    </div>
}
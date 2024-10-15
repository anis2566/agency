import { Metadata } from "next";

import { ServiceList } from "./_components/service-list";
import { CategoryList } from "./_components/category-list";
import { SearchFilter } from "./_components/search-filter";

export const metadata: Metadata = {
    title: "Agency | Services",
    description: "Agency",
};

const Services = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto mt-6 space-y-6">
            <CategoryList />
            <SearchFilter />
            <ServiceList />
        </div>
    )
}

export default Services

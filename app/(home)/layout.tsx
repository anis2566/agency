import { Metadata } from "next";
import { Navbar } from "./_components/navbar";

interface Props {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Agency",
    description: "Agency",
};

const HomeLayout = ({ children }: Props) => {
    return (
        <div className="w-full p-4">
            <Navbar />
            {children}
        </div>
    );
};

export default HomeLayout;
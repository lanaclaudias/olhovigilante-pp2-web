import MockUp from "/comunidade.png";
import Header from "./components/Header/Header";

export default function Comunidade() {
    return (
        <>
            <Header />
            <div className="flex flex-col justify-center">
                <img src={MockUp} alt="" />
            </div>
        </>
    )
}
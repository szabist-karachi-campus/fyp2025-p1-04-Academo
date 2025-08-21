import { useNavigate } from 'react-router-dom';

const Bars = ({
    element: Element,
    isOpen,
    text,
    setIsOpen,
    navigates
}: {
    element: React.ElementType;
    isOpen: boolean;
    text: string;
    setIsOpen: (value: boolean) => void;
    navigates: string;
}) => {

    const navigate = useNavigate();


    const attendanceClick = () => {
        navigate(navigates)
    };

    return (

        <div className="flex items-center pt-1 ml-2 pb-1 mr-2 mb-2 mt-2 rounded-lg cursor-pointer hover:bg-accent" onClick={attendanceClick}>
            <span className={`cursor-pointer pr-2 overflow-hidden whitespace-nowrap transition-all`} onClick={() => isOpen === false && setIsOpen(true)}>
                <Element className={`bg-transparent text-black font-extrabold text-3xl pl-2`} />
            </span>
            <span className={`cursor-pointer overflow-hidden transition-all text-black ${isOpen ? 'mr-11' : 'w-0'}`}>
                {text}
            </span>
        </div>
    );
};

export default Bars;

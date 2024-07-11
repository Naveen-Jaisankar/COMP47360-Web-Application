import { renderMapAlert } from "./mapalerts";

const MapAlertCard = ({aqi}) => {
    let {alertHeading, aqiNumber, alertContent} = renderMapAlert(aqi)

    return (
        <div className='flex items-center justify-center bg-[#0D1B2A] text-white p-2 ml-3 rounded-lg'>
        {/* <img src={warningImg} alt="Warning Icon" /> */}
        <div className='break-words whitespace-normal'>
          <h2 className="font-bold text-lg">{alertHeading}</h2>
          <p className="text-sm mt-1">{aqiNumber}</p>
          <p className="text-sm mt-1">{alertContent}</p>
        </div>
      </div>
    )
}

export default MapAlertCard;

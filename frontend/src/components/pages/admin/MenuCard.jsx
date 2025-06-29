import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatNumber";

export const MenuCard = ({ menu }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl rounded-lg min-w-72 md:min-w-90 hover:scale-105 transition duration-300 ease-in-out border-gray-300">
      <div className="flex flex-col">
        <img
          src={menu.images[0]}
          alt={menu.name}
          className="w-full h-64 object-cover rounded-t-lg cursor-pointer"
          // onClick={() => navigate(`/detail-menu/${menu?._id}`)}
        />
        <div className="flex flex-col p-4">
          <h2
            className="text-lg font-bold truncate cursor-pointer"
            //   onClick={() => navigate(`/detail-menu/${menu?._id}`)}
          >
            {menu.name}
          </h2>
          <p
            className="text-nowrap cursor-pointer font-semibold mb-2"
            // onClick={() => navigate(`/detail-menu/${menu._id}`)}
          >
            {formatCurrency(menu.price)}
          </p>
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="flex items-center gap-1">
              <svg
                fill="#FFD700"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                id="star"
                data-name="Flat Color"
                xmlns="http://www.w3.org/2000/svg"
                className="icon flat-color"
              >
                <path
                  id="primary"
                  d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"
                />
              </svg>{" "}
              {menu.averageRating}
            </p>
            <p>|</p>
            <p>{menu.totalSold} terjual</p>
          </div>
        </div>
      </div>
    </div>
  );
};
